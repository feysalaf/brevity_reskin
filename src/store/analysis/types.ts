import { Action } from "redux";
import { DELETE_ALL_PDFS, UPLOAD_AUDIO_FAILURE, UPLOAD_AUDIO_REQUEST, UPLOAD_AUDIO_SUCCESS, 
  UPLOAD_TEXT_FAILURE, UPLOAD_TEXT_REQUEST, UPLOAD_TEXT_SUCCESS, 
  UPLOAD_VIDEO_FAILURE, UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS,CLEAR_UPLOAD_ERROR } from "./actionTypes";


  export interface UploadSuccessData {
    pdfData: ArrayBuffer[]; 
  }

export interface UploadRequestAction {
  type: typeof UPLOAD_TEXT_REQUEST | typeof UPLOAD_AUDIO_REQUEST | typeof UPLOAD_VIDEO_REQUEST;
  payload: FormData;
}

export interface UploadSuccessAction {
  type: typeof UPLOAD_TEXT_SUCCESS  | typeof UPLOAD_AUDIO_SUCCESS | typeof UPLOAD_VIDEO_SUCCESS;
  payload: UploadSuccessData;
}

export interface UploadFailureAction {
  type: typeof UPLOAD_TEXT_FAILURE | typeof UPLOAD_AUDIO_FAILURE | typeof UPLOAD_VIDEO_FAILURE;
  error: string;
}

export interface deletePdfAction extends Action<typeof DELETE_ALL_PDFS> {}

export interface ClearUploadErrorAction extends Action<typeof CLEAR_UPLOAD_ERROR> {}

export type UploadActionTypes =
  | UploadRequestAction
  | UploadSuccessAction
  | UploadFailureAction
  | ClearUploadErrorAction
  | deletePdfAction;
