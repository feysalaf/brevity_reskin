import {  combineReducers } from "redux";
import authReducer from './auth/reducer';
import uploadReducer from "./analysis/reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    upload:uploadReducer
})

export type state = ReturnType<typeof rootReducer>

export default rootReducer