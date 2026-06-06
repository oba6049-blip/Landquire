/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PlotSize {
  SIZE_300 = "300 SQM",
  SIZE_500 = "500 SQM",
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  plotSize: PlotSize;
  message?: string;
  leadType?: 'inspection' | 'allocation';
  inspectionDate?: string;
  pickupPoint?: string;
  createdAt: any; // Can be Timestamp or Date string
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  aspectRatio: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  isFallback?: boolean;
}
