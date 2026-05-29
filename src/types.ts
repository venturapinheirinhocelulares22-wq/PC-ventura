/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  whatsapp: string;
  whatsappUrl: string;
  imageUrl: string;
  phone?: string;
}

export interface Review {
  id: string;
  clientName: string;
  text: string;
  stars: number;
  imageUrl: string;
  tag?: string;
}

export interface LeadFormData {
  fullName: string;
  cpf: string;
  phone: string;
  income: string;
  desiredBrand: string;
  selectedStoreId: string;
  termsAccepted: boolean;
}
