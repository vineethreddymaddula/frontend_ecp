export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}
