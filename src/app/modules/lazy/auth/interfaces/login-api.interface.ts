export interface ILoginReq {
  email_address: string;
  password: string;
}

export interface ILoginSuccessRes {
  user_id: string;
  role: 'user' | 'admin',
  token: string;
}
