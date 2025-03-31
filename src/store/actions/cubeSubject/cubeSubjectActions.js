import customAxios from "../../../utils/customAxios";
import {
  FETCH_CUBE_SUBJECTS_REQUEST,
  FETCH_CUBE_SUBJECTS_SUCCESS,
  FETCH_CUBE_SUBJECTS_FAILURE,
  ADD_CUBE_SUBJECT_REQUEST,
  ADD_CUBE_SUBJECT_SUCCESS,
  ADD_CUBE_SUBJECT_FAILURE,
  UPDATE_CUBE_SUBJECT_REQUEST,
  UPDATE_CUBE_SUBJECT_SUCCESS,
  UPDATE_CUBE_SUBJECT_FAILURE,
  DELETE_CUBE_SUBJECT_REQUEST,
  DELETE_CUBE_SUBJECT_SUCCESS,
  DELETE_CUBE_SUBJECT_FAILURE,
  UPDATE_CUBE_SUBJECT_STATUS_REQUEST,
  UPDATE_CUBE_SUBJECT_STATUS_SUCCESS,
  UPDATE_CUBE_SUBJECT_STATUS_FAILURE,
} from "./cubeSubjectTypes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleApiError = (dispatch, action, error) => {
  if (error.response) {
    dispatch(action(error.response.data.message || "Có lỗi xảy ra"));
  } else {
    dispatch(action(error.message));
  }
};

// Fetch Cube Subjects
const fetchCubeSubjectsRequest = () => ({ type: FETCH_CUBE_SUBJECTS_REQUEST });
const fetchCubeSubjectsSuccess = (subjects) => ({
  type: FETCH_CUBE_SUBJECTS_SUCCESS,
  payload: subjects,
});
const fetchCubeSubjectsFailure = (error) => ({
  type: FETCH_CUBE_SUBJECTS_FAILURE,
  payload: error,
});

export const fetchCubeSubjectList = () => async (dispatch) => {
  dispatch(fetchCubeSubjectsRequest());
  const apiUrl = `${BASE_URL}cubeSubject/getCubeSubjects`; // Endpoint đầy đủ: http://localhost:3001/api/v1/cubeSubject/getCubeSubjects
  try {
    const res = await customAxios.get(apiUrl);
    dispatch(fetchCubeSubjectsSuccess(res.data)); // Truyền danh sách cubeSubject từ response
  } catch (e) {
    handleApiError(dispatch, fetchCubeSubjectsFailure, e);
  }
};

// Add Cube Subject
const addCubeSubjectRequest = () => ({ type: ADD_CUBE_SUBJECT_REQUEST });
const addCubeSubjectSuccess = () => ({ type: ADD_CUBE_SUBJECT_SUCCESS });
const addCubeSubjectFailure = (error) => ({
  type: ADD_CUBE_SUBJECT_FAILURE,
  payload: error,
});

export const addCubeSubject = (subject) => async (dispatch) => {
  dispatch(addCubeSubjectRequest());
  const apiUrl = BASE_URL + "cube-subjects";
  try {
    const res = await customAxios.post(apiUrl, subject);
    if (res.status === 201 || res.status === 200) {
      dispatch(addCubeSubjectSuccess());
      dispatch(fetchCubeSubjectList());
    } else {
      dispatch(addCubeSubjectFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, addCubeSubjectFailure, e);
  }
};

// Update Cube Subject
const updateCubeSubjectRequest = () => ({ type: UPDATE_CUBE_SUBJECT_REQUEST });
const updateCubeSubjectSuccess = () => ({ type: UPDATE_CUBE_SUBJECT_SUCCESS });
const updateCubeSubjectFailure = (error) => ({
  type: UPDATE_CUBE_SUBJECT_FAILURE,
  payload: error,
});

export const updateCubeSubject = (subject) => async (dispatch) => {
  dispatch(updateCubeSubjectRequest());
  const apiUrl = BASE_URL + `cube-subjects/${subject.id}`;
  try {
    const res = await customAxios.put(apiUrl, subject);
    if (res.status === 200) {
      dispatch(updateCubeSubjectSuccess());
      dispatch(fetchCubeSubjectList());
    } else {
      dispatch(updateCubeSubjectFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, updateCubeSubjectFailure, e);
  }
};

// Delete Cube Subject
const deleteCubeSubjectRequest = () => ({ type: DELETE_CUBE_SUBJECT_REQUEST });
const deleteCubeSubjectSuccess = () => ({ type: DELETE_CUBE_SUBJECT_SUCCESS });
const deleteCubeSubjectFailure = (error) => ({
  type: DELETE_CUBE_SUBJECT_FAILURE,
  payload: error,
});

export const deleteCubeSubject = (id) => async (dispatch) => {
  dispatch(deleteCubeSubjectRequest());
  const apiUrl = BASE_URL + `cube-subjects/${id}`;
  try {
    const res = await customAxios.delete(apiUrl);
    if (res.status === 200) {
      dispatch(deleteCubeSubjectSuccess());
      dispatch(fetchCubeSubjectList());
    } else {
      dispatch(deleteCubeSubjectFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, deleteCubeSubjectFailure, e);
  }
};

// Update Cube Subject Status
const updateCubeSubjectStatusRequest = () => ({
  type: UPDATE_CUBE_SUBJECT_STATUS_REQUEST,
});
const updateCubeSubjectStatusSuccess = () => ({
  type: UPDATE_CUBE_SUBJECT_STATUS_SUCCESS,
});
const updateCubeSubjectStatusFailure = (error) => ({
  type: UPDATE_CUBE_SUBJECT_STATUS_FAILURE,
  payload: error,
});

export const updateCubeSubjectStatus = (id, status) => async (dispatch) => {
  dispatch(updateCubeSubjectStatusRequest());
  const apiUrl = BASE_URL + `cube-subjects/${id}/status`;
  try {
    const res = await customAxios.patch(apiUrl, { status });
    if (res.status === 200) {
      dispatch(updateCubeSubjectStatusSuccess());
      dispatch(fetchCubeSubjectList());
    } else {
      dispatch(updateCubeSubjectStatusFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, updateCubeSubjectStatusFailure, e);
  }
};