export interface IUserAccount {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
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
  payout_amount: string; // TODO: to be confirmed
  stripe_payout_setup: boolean; // TODO: to be confirmed
}
