import { call, put, takeLatest } from 'redux-saga/effects';
import { UPLOAD_AUDIO_REQUEST, UPLOAD_TEXT_REQUEST, UPLOAD_VIDEO_REQUEST } from './actionTypes';
import { uploadTextSuccess, uploadTextFailure, uploadAudioSuccess, uploadAudioFailure, uploadVideoSuccess, uploadVideoFailure } from './actions';
import { uploadAudioFile, uploadTextFile, uploadVideoFile } from '../../api/analysis'; // Assuming you have a login function for making requests

function* uploadTextSaga(action: { type: typeof UPLOAD_TEXT_REQUEST, payload: FormData[] }): Generator<any, any, any> {
 
  try {
    // Combine all FormData objects into one
    const combinedFormData = new FormData();
    action.payload.forEach((formData, index) => {
      formData.forEach((value, key) => {
        combinedFormData.append(`${key}${index}`, value);
      });
    });

    // Send the combined FormData in a single request
    const pdfs: ArrayBuffer[] = yield call(uploadTextFile, combinedFormData);
    
    // Convert the single array of ArrayBuffer to match the existing array of arrays structure
    const pdfsArray: ArrayBuffer[][] = [pdfs];
    
    // Flatten the array of arrays to get a single array of ArrayBuffer
    const flattenedPdfs: ArrayBuffer[] = pdfsArray.flat();
    console.log({flattenedPdfs});
    
    // Dispatch success action with array of PDFs
    yield put(uploadTextSuccess(flattenedPdfs));
  } catch (error: any) {
    yield put(uploadTextFailure(error.message));
  }
}

function* uploadAudioSaga(action: { type: typeof UPLOAD_AUDIO_REQUEST, payload: FormData[] }): Generator<any, any, any> {
 
  try {
    // Combine all FormData objects into one
    const combinedFormData = new FormData();
    action.payload.forEach((formData, index) => {
      formData.forEach((value, key) => {
        combinedFormData.append(`${key}${index}`, value);
      });
    });

    // Send the combined FormData in a single request
    const pdfs: ArrayBuffer[] = yield call(uploadAudioFile, combinedFormData);
    
    // Convert the single array of ArrayBuffer to match the existing array of arrays structure
    const pdfsArray: ArrayBuffer[][] = [pdfs];
    
    // Flatten the array of arrays to get a single array of ArrayBuffer
    const flattenedPdfs: ArrayBuffer[] = pdfsArray.flat();
    console.log({flattenedPdfs});
    
    // Dispatch success action with array of PDFs
    yield put(uploadAudioSuccess(flattenedPdfs));
  } catch (error: any) {
    yield put(uploadAudioFailure(error.message));
  }

}



// function* uploadVideoSaga(action: { type: typeof UPLOAD_VIDEO_REQUEST, payload: FormData[] }): Generator<any, any, any> {
//   try {
//     let combinedFormData: FormData;

//     if (action.payload.length > 1) {
//       combinedFormData = new FormData();
//       action.payload.forEach((formData, index) => {
//         formData.forEach((value, key) => {
//           combinedFormData.append(`${key}[${index}]`, value);
//         });
//       });
//     } else {
//       combinedFormData = action.payload[0];
//     }
//     console.log("Complete");
    
//     // Flatten the array of arrays to get a single array of ArrayBuffer
//     const flattenedPdfs: ArrayBuffer[] = pdfs.flat();
//     console.log({flattenedPdfs})
    
//     console.log("Pdf created and received");
//     // Dispatch success action with array of PDFs
//     yield put(uploadVideoSuccess(flattenedPdfs));
//   } catch (error: any) {
//     yield put(uploadVideoFailure(error.message));
//   }
// }

function* uploadVideoSaga(action: { type: typeof UPLOAD_VIDEO_REQUEST, payload: FormData[] }): Generator<any, any, any> {
  try {
    // Combine all FormData objects into one
    const combinedFormData = new FormData();
    action.payload.forEach((formData, index) => {
      formData.forEach((value, key) => {
        combinedFormData.append(`${key}${index}`, value);
      });
    });

    // Send the combined FormData in a single request
    const pdfs: ArrayBuffer[] = yield call(uploadVideoFile, combinedFormData);
    
    // Convert the single array of ArrayBuffer to match the existing array of arrays structure
    const pdfsArray: ArrayBuffer[][] = [pdfs];
    
    // Flatten the array of arrays to get a single array of ArrayBuffer
    const flattenedPdfs: ArrayBuffer[] = pdfsArray.flat();
    console.log({flattenedPdfs});
    
    // Dispatch success action with array of PDFs
    yield put(uploadVideoSuccess(flattenedPdfs));
  } catch (error: any) {
    yield put(uploadVideoFailure(error.message));
  }
}

// Watcher saga
function* watchUploadTextSaga() {
  yield takeLatest(UPLOAD_TEXT_REQUEST, uploadTextSaga);
  yield takeLatest(UPLOAD_AUDIO_REQUEST, uploadAudioSaga);
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideoSaga);
}

export default watchUploadTextSaga;
