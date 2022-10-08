export interface ILoginReq {
  email_address: string;
  password: string;
}

export interface ILoginSuccessRes {
  role: 'user' | 'admin',
  token: string;
}

export interface ILoginFailureRes {
  error_type: string;
  error_message: string;
}
