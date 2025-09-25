export interface Business {
  id?: number;
  title: string;
  description?: string;
  category?: string;
  place_id?: string;
  address?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  province?: string;
  zip?: string;
  country_code?: string;
  map_url?: string;
  phone?: string;
  website?: string;
  featured_image?: string;
  feature_id?: string;
  logo?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  rating?: number;
  rating_count?: number;
  attributes?: any;
  place_topics?: any;
  people_also_search?: any;
}

export type GroupedBusinesses = Record<string, Business[]>;
