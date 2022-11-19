// TODO :- ADD DATE OF JOIN
export interface IUser {
  username: string;
  email: string;
  fullName: string;
}
export interface IUserSignUp extends IUser {
  password: string;
  confPassword: string;
}
