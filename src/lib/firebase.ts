/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, collection, setDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Lead } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Check if firebase config has been filled with real data
export const isFirebaseConfigured = 
  firebaseConfig && 
  firebaseConfig.apiKey && 
  !firebaseConfig.apiKey.includes('placeholder') && 
  firebaseConfig.projectId !== 'placeholder-project-id';

let app;
let db: any = null;
let auth: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    
    // Validate Connection to Firestore asynchronously on startup
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.warn("[Firebase] Client is offline or Firestore service is unavailable.");
        }
      }
    };
    testConnection();
  } catch (err) {
    console.error("[Firebase] Error initializing real Firebase client:", err);
  }
} else {
  console.log("[Firebase] Running in Local Fallback mode because credentials are placeholders.");
}

export { db, auth };

/**
 * Handles Firestore errors by packaging the state details into a strict JSON-string formatted error
 * compliant with the Firebase Integration Skill mandate.
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentAuth = auth;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentAuth?.currentUser?.uid || null,
      email: currentAuth?.currentUser?.email || null,
      emailVerified: currentAuth?.currentUser?.emailVerified || null,
      isAnonymous: currentAuth?.currentUser?.isAnonymous || null,
      tenantId: currentAuth?.currentUser?.tenantId || null,
      providerInfo: currentAuth?.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('[Firebase Error Handled]: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Persists a lead. Attempts real Firestore first. Fallback saves to localStorage.
 */
export async function submitLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<{ success: boolean; isFallback?: boolean }> {
  const leadId = 'lead_' + Math.random().toString(36).substring(2, 11);
  const now = new Date();
  
  const leadObject = {
    id: leadId,
    ...leadData,
    createdAt: now.toISOString()
  };

  // 1. Try real Firestore if configured
  if (isFirebaseConfigured && db) {
    const docPath = `leads/${leadId}`;
    try {
      await setDoc(doc(db, 'leads', leadId), {
        id: leadId,
        fullName: leadData.fullName,
        phone: leadData.phone,
        email: leadData.email,
        plotSize: leadData.plotSize,
        message: leadData.message || '',
        leadType: leadData.leadType || 'allocation',
        inspectionDate: leadData.inspectionDate || '',
        pickupPoint: leadData.pickupPoint || '',
        createdAt: serverTimestamp() // Firestore native server timestamp
      });
      console.log(`[Firebase] Successfully saved lead ${leadId} to Firestore.`);
      return { success: true, isFallback: false };
    } catch (error) {
      console.warn(`[Firebase] Failed writing to Firestore. Falling back to local storage. Error details logged below.`);
      // Run error serialization for diagnostic purposes as demanded by Skill
      try {
        handleFirestoreError(error, OperationType.WRITE, docPath);
      } catch (serialErr) {
        // Continue to fallback local storage
      }
    }
  }

  // 2. Local Storage Fallback
  try {
    const existingLeadsStr = localStorage.getItem('landiquire_leads') || '[]';
    const existingLeads = JSON.parse(existingLeadsStr);
    existingLeads.push(leadObject);
    localStorage.setItem('landiquire_leads', JSON.stringify(existingLeads));
    console.log(`[Local Fallback] Saved lead locally:`, leadObject);
    return { success: true, isFallback: true };
  } catch (localErr) {
    console.error("Critical: Could not save lead even to LocalStorage", localErr);
    return { success: false };
  }
}

/**
 * Returns saved leads for administrative inquiry review.
 */
export function getSavedLeads(): Lead[] {
  try {
    const existingLeadsStr = localStorage.getItem('landiquire_leads') || '[]';
    return JSON.parse(existingLeadsStr);
  } catch (err) {
    return [];
  }
}
