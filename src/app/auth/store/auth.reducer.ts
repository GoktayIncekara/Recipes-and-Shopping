import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null as any,
};

export function authReducer(
  state: State = initialState,
  action: any //AuthActions.Authactions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user, //user: user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null as any,
      };
    default:
      return state;
  }
}
