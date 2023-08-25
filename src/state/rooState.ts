import {AuthState} from "./user";
import {adminAuthState} from "./admin";

export interface RootState {
    admin: adminAuthState;
    user: AuthState;
  }