import { User } from '../user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: null as any,
};

export function authReducer(state: State = initialState, action: any) {
  return state;
}
