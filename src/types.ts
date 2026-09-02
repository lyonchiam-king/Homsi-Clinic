export interface ServiceItem {
  id: string;
  title: string;
  tags: string[];
  description: string;
  details: string[];
  duration: string;
  image: string;
}

export interface PathwayState {
  concern: 'Acne' | 'Aging' | 'Hair';
  goal: 'Treat' | 'Maintain' | 'Prevent';
  preference: 'Quick' | 'Comprehensive';
}

export interface PathwayRecommendation {
  title: string;
  summary: string;
  suitableFor: string;
  recommendedServices: string[];
  expectedTime: string;
}

export interface EnquiryData {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate?: string;
  message?: string;
  concern?: string;
  goal?: string;
  preference?: string;
}
