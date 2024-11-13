import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';
import {  LoginFailureAction,LoginSuccessAction, LoginSuccessData } from './types';
import { CLEAR_STORAGE } from './actionTypes';

export const loginRequest = (payload: FormData ) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload:LoginSuccessData):LoginSuccessAction =>  ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  error,
});

export const clearStorage = () => ({
  type: CLEAR_STORAGE,
});