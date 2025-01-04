export interface CompanySubscription {
  id: string;
  profile_id: string;
  package_name: string;
  status: 'pending' | 'active' | 'cancelled';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}