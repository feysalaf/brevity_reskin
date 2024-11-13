import { UploadActionTypes } from './types';
import { UPLOAD_TEXT_FAILURE, UPLOAD_TEXT_SUCCESS, UPLOAD_TEXT_REQUEST, 
  UPLOAD_AUDIO_REQUEST, UPLOAD_AUDIO_SUCCESS, UPLOAD_AUDIO_FAILURE, 
  UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS, UPLOAD_VIDEO_FAILURE, 
  DELETE_ALL_PDFS,CLEAR_UPLOAD_ERROR  } from './actionTypes';

interface UploadState {
  loading: boolean;
  reports: ArrayBuffer[] | null; 
  error: string | null;
}

const initialState: UploadState = {
  loading: false,
  reports: null,
  error: null,
};

const uploadReducer = (state = initialState, action: UploadActionTypes): UploadState => {
  switch (action.type) {
    case UPLOAD_TEXT_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true on request
      };


    case UPLOAD_TEXT_SUCCESS:
      console.log(action)
      return {
        ...state,
        loading: false,
        error: null, 
        reports:action.payload.pdfData
      };
    case UPLOAD_TEXT_FAILURE:
      return {
        ...state,
        loading: false, // Set loading to false on failure
        error: action.error, // Update error message
      };
    case UPLOAD_AUDIO_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true on request
      };

    case UPLOAD_AUDIO_SUCCESS:
      console.log(action)
      return {
        ...state,
        loading: false,
        error: null, 
        reports:action.payload.pdfData
      };
    case UPLOAD_AUDIO_FAILURE:
      return {
        ...state,
        loading: false, // Set loading to false on failure
        error: action.error, // Update error message
      };


      case UPLOAD_VIDEO_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true on request
      };

    case UPLOAD_VIDEO_SUCCESS:
      console.log(action)
      return {
        ...state,
        loading: false,
        error: null, 
        reports:action.payload.pdfData
      };
    case UPLOAD_VIDEO_FAILURE:
      return {
        ...state,
        loading: false, // Set loading to false on failure
        error: action.error, // Update error message
      };
    
    case CLEAR_UPLOAD_ERROR:
      return {
        ...state,
        error: null,
      };

    case DELETE_ALL_PDFS:
      return {
        ...state,
        reports:null,
      }

    default:
      return state;
  }
};

export default uploadReducer;
