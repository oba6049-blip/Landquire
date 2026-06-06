/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import emailjs from '@emailjs/browser';

export const isEmailJSConfigured = (): boolean => {
  const metaEnv = (import.meta as any).env;
  return !!(
    metaEnv &&
    metaEnv.VITE_EMAILJS_SERVICE_ID &&
    metaEnv.VITE_EMAILJS_TEMPLATE_ID &&
    metaEnv.VITE_EMAILJS_PUBLIC_KEY
  );
};

/**
 * Sends a Formspree submission to delivery inbox.
 */
export async function sendLeadToFormspree(leadData: {
  fullName: string;
  phone: string;
  email: string;
  plotSize: string;
  message?: string;
  leadType?: 'inspection' | 'allocation';
  inspectionDate?: string;
  pickupPoint?: string;
}): Promise<boolean> {
  const formspreeUrl = 'https://formspree.io/f/xnjypanp';
  try {
    const payload = {
      name: leadData.fullName,
      email: leadData.email,
      phone: leadData.phone,
      plotSize: leadData.plotSize,
      leadType: leadData.leadType || 'allocation',
      inspectionDate: leadData.inspectionDate || 'N/A',
      pickupPoint: leadData.pickupPoint || 'N/A',
      message: leadData.message || 'No custom message provided.',
      _subject: `New El Mirage Estate Lead: ${leadData.fullName} (${leadData.leadType || 'allocation'})`
    };

    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('[Formspree Success]: Submission dispatched to Formspree email.');
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.warn('[Formspree Warning]: Non-ok response:', errorData);
      return false;
    }
  } catch (error) {
    console.error('[Formspree Error]: Failed sending lead to Formspree:', error);
    return false;
  }
}

/**
 * Sends a notification email to landiquireassociates@gmail.com upon lead form submission.
 */
export async function sendLeadEmail(leadData: {
  fullName: string;
  phone: string;
  email: string;
  plotSize: string;
  message?: string;
  leadType?: 'inspection' | 'allocation';
  inspectionDate?: string;
  pickupPoint?: string;
}): Promise<boolean> {
  // Always trigger Formspree side-by-side to ensure the user gets emails
  const formspreeSuccess = await sendLeadToFormspree(leadData);

  const isConfigured = isEmailJSConfigured();

  if (!isConfigured) {
    console.log(
      `[EmailJS Simulation] Direct Notification destined for landiquireassociates@gmail.com:\n` +
      `- Type: ${leadData.leadType || 'allocation'}\n` +
      `- From: ${leadData.fullName} (${leadData.email})\n` +
      `- Phone: ${leadData.phone}\n` +
      `- Plot Interest: ${leadData.plotSize}\n` +
      `- Inspection Date: ${leadData.inspectionDate || 'N/A'}\n` +
      `- Pickup Point: ${leadData.pickupPoint || 'N/A'}\n` +
      `- Message: ${leadData.message || 'None'}`
    );
    return formspreeSuccess;
  }

  try {
    const templateParams = {
      to_email: 'landiquireassociates@gmail.com',
      from_name: leadData.fullName,
      from_email: leadData.email,
      phone: leadData.phone,
      plot_size: leadData.plotSize,
      lead_type: leadData.leadType || 'allocation',
      inspection_date: leadData.inspectionDate || 'N/A',
      pickup_point: leadData.pickupPoint || 'N/A',
      message: leadData.message || 'No custom message provided.',
    };

    const metaEnv = (import.meta as any).env;
    const response = await emailjs.send(
      metaEnv.VITE_EMAILJS_SERVICE_ID!,
      metaEnv.VITE_EMAILJS_TEMPLATE_ID!,
      templateParams,
      metaEnv.VITE_EMAILJS_PUBLIC_KEY!
    );

    console.log('[EmailJS Success]: Notification email sent.', response.status, response.text);
    return true;
  } catch (error) {
    console.error('[EmailJS Error]: Failed sending email notification via EmailJS:', error);
    return false;
  }
}
