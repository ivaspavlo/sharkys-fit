export interface IResetPasswordReq {
  password: string;
  password_reset_token: string;
}

export interface IResetPasswordFailureRes {
  error_type: string;
  error_message: string;
}
