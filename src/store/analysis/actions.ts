import { DELETE_ALL_PDFS, UPLOAD_AUDIO_FAILURE, UPLOAD_AUDIO_REQUEST, UPLOAD_AUDIO_SUCCESS, 
  UPLOAD_TEXT_FAILURE, UPLOAD_TEXT_REQUEST, UPLOAD_TEXT_SUCCESS, 
  UPLOAD_VIDEO_FAILURE, UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS,CLEAR_UPLOAD_ERROR  } from './actionTypes';
import { UploadSuccessAction, UploadFailureAction, deletePdfAction } from './types';

export const uploadTextRequest = (payload: Array<FormData> ) => ({
  type: UPLOAD_TEXT_REQUEST,
  payload,
});

export const uploadTextSuccess = (pdfData: ArrayBuffer[]): UploadSuccessAction => ({
  type: UPLOAD_TEXT_SUCCESS,
  payload: { pdfData },
});

export const uploadTextFailure = (error: string): UploadFailureAction => ({
  type: UPLOAD_TEXT_FAILURE,
  error,
});


export const uploadAudioRequest = (payload: Array<FormData> ) => ({
  type: UPLOAD_AUDIO_REQUEST,
  payload,
});


export const uploadAudioSuccess = (pdfData: ArrayBuffer[]): UploadSuccessAction => ({
  type: UPLOAD_AUDIO_SUCCESS,
  payload: { pdfData },
});

export const uploadAudioFailure = (error: string): UploadFailureAction => ({
  type: UPLOAD_AUDIO_FAILURE,
  error,
});

export const uploadVideoRequest = (payload: Array<FormData> ) => ({
  type: UPLOAD_VIDEO_REQUEST,
  payload,
});


export const uploadVideoSuccess = (pdfData: ArrayBuffer[]): UploadSuccessAction => ({
  type: UPLOAD_VIDEO_SUCCESS,
  payload: { pdfData },
});

export const uploadVideoFailure = (error: string): UploadFailureAction => ({
  type: UPLOAD_VIDEO_FAILURE,
  error,
});

export const deletePDFs = (): deletePdfAction => ({
  type: DELETE_ALL_PDFS
});

export const clearUploadError = () => ({
  type: CLEAR_UPLOAD_ERROR,
});