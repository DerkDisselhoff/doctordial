export interface Profile {
  id: string;
  username: string | null;
  role: 'admin' | 'client' | null;
  avatar_url: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
}