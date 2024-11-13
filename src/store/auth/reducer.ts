import { AuthActionTypes } from './types';
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, CLEAR_STORAGE  } from './actionTypes';
// import { useNavigate } from 'react-router-dom';




interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token')? localStorage.getItem('token'):null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      // window.history.replaceState
       // Import useNavigate from 'react-router-dom'
      // const navigate = useNavigate();
      // navigate('/agree-terms');

      console.log(action)
      console.log(action.payload.token)
      return {
        ...state,
        loading: false,
        token: action.payload.token, 
      };
    case LOGIN_FAILURE:
      console.log({'reducer.ts':action})
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CLEAR_STORAGE:
      return {
        ...state,
        token: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
