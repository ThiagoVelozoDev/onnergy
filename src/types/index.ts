export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export type UserRole = "admin" | "editor";

export interface SiteSettings {
  id: string;
  company_name: string;
  website: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  business_hours: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface HeroContent {
  id: string;
  badge: string | null;
  title: string;
  description: string | null;
  primary_cta_text: string | null;
  secondary_cta_text: string | null;
  hero_image_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  cta_text: string | null;
  sort_order: number;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category: string | null;
  workload: string | null;
  modality: string | null;
  location: string | null;
  price: number | null;
  image_url: string | null;
  cta_text: string | null;
  featured: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Training {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  target_audience: string | null;
  workload: string | null;
  modality: string | null;
  content: string | null;
  image_url: string | null;
  cta_text: string | null;
  featured: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Statistic {
  id: string;
  value: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FooterSettings {
  id: string;
  description: string | null;
  copyright: string | null;
  privacy_url: string | null;
  terms_url: string | null;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SeoSettings {
  id: string;
  page: string;
  title: string | null;
  description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email: string | null;
  service_id: string | null;
  message: string | null;
  source: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface NewLead {
  name: string;
  whatsapp: string;
  email: string | null;
  service_id: string | null;
  message: string | null;
  source?: string;
}

export interface Media {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  mime_type: string | null;
  file_size: number | null;
  alt_text: string | null;
  created_by: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  old_data: unknown;
  new_data: unknown;
  created_at: string;
}
