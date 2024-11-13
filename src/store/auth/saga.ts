import { put, call, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from './actions'; // Import action creators
import { LOGIN_REQUEST } from './actionTypes';
import { login } from '../../api/auth'; // Ensure this path is correct

function* loginSaga(action: { type: typeof LOGIN_REQUEST, payload: FormData  }): Generator<any, any, any> {
  console.log({'saga.ts':action.payload})
  try {
    const response = yield call(login, action.payload);
    yield put(loginSuccess(response)); // Dispatch login success action with token only
  } catch (error:any) {
    // yield put(loginFailure(error.message)); // Dispatch login failure action with error message
    const errorMessage = error.message || 'An unknown error occurred.';
    console.log("error: ", error.message);
    yield put(loginFailure(errorMessage));   }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export default authSaga;
