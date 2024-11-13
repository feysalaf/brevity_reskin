import {all, fork} from 'redux-saga/effects';
import authSaga from './auth/saga';
import uploadSaga from './analysis/saga';



export function* rootSaga() {
    yield all([fork(authSaga), fork(uploadSaga)]);
  }