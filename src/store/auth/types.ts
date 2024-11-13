import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, CLEAR_STORAGE  } from "./actionTypes";


export interface LoginSuccessData {
  token: string;
  message: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: FormData;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessData;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}

export interface ClearStorageAction {
  type: typeof CLEAR_STORAGE;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | ClearStorageAction; // Add ClearStorageAction here

