export interface IRemindPasswordReq {
  email_address: string;
}

export interface IRemindPasswordRes {
  pw_token: string;
}
