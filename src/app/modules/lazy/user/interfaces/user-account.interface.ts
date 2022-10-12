export interface IUserAccount {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  address: string;
  phone_number: string;
  training_location: string;
  market_of_interest: string;
  number_of_clients: string;
  favorite_location: string;
  specialization: string;
  bio: string;
  certified_trainer: string;
  image_url: string;
  payout_amount: number;
  stripe_payout_setup: boolean;
}
