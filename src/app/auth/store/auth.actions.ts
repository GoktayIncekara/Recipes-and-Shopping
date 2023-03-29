import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  type = LOGIN;

  //you can say that the payload will be the user object and you can create that user object before dispatching an action and send it
  constructor(
    public payload?: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  type = LOGOUT;
}

export type AuthActions = Login | Logout;
