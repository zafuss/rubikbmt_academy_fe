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
const fetchCubeSubjectsSuccess = (cubeSubjects) => ({
  type: FETCH_CUBE_SUBJECTS_SUCCESS,
  payload: cubeSubjects,
});
const fetchCubeSubjectsFailure = (error) => ({
  type: FETCH_CUBE_SUBJECTS_FAILURE,
  payload: error,
});

export const fetchCubeSubjectList = () => async (dispatch) => {
  dispatch(fetchCubeSubjectsRequest());
  const apiUrl = BASE_URL + "cubeSubject/get-list";
  try {
    const result = await customAxios.get(apiUrl);
    console.log("API Response:", result.data); // Kiểm tra phản hồi từ API
    dispatch(fetchCubeSubjectsSuccess(result.data.data.cubeSubjects)); // Truy cập đúng trường `cubeSubjects`
  } catch (e) {
    console.error("API Error:", e); // Log lỗi từ API
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

export const addCubeSubject = (cubeSubject) => async (dispatch) => {
  dispatch(addCubeSubjectRequest());
  const apiUrl = BASE_URL + "cubeSubject/add";

  const payload = {
    ...cubeSubject,
    cubeSkills: cubeSubject.cubeSkills || [], // Mặc định là mảng rỗng nếu không có
  };

  console.log("Payload being sent to API:", payload); // Log dữ liệu gửi đi

  try {
    const res = await customAxios.post(apiUrl, payload, { withCredentials: true });
    console.log("API Response:", res.data); // Log phản hồi từ API
    if (res.status === 201 || res.status === 200) {
      dispatch(addCubeSubjectSuccess());
      dispatch(fetchCubeSubjectList()); // Lấy lại danh sách sau khi thêm thành công
    } else {
      dispatch(addCubeSubjectFailure(res.data.message));
    }
  } catch (e) {
    console.error("API Error:", e); // Log lỗi từ API
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

export const updateCubeSubject = (cubeSubject) => async (dispatch) => {
  dispatch(updateCubeSubjectRequest());
  const apiUrl = `${BASE_URL}cubeSubjects/update/${cubeSubject.key}`;
  try {
    const res = await customAxios.put(apiUrl, cubeSubject, { withCredentials: true });
    if (res.status === 200) {
      dispatch(updateCubeSubjectSuccess());
      dispatch(fetchCubeSubjectList());
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

export const deleteCubeSubject = (cubeSubjectId) => async (dispatch) => {
  dispatch(deleteCubeSubjectRequest());
  const apiUrl = `${BASE_URL}cubeSubjects/delete/${cubeSubjectId}`;
  try {
    const res = await customAxios.delete(apiUrl, { withCredentials: true });
    if (res.status === 200) {
      dispatch(deleteCubeSubjectSuccess());
      dispatch(fetchCubeSubjectList());
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

export const updateCubeSubjectStatus = (cubeSubjectId, status) => async (dispatch) => {
  dispatch(updateCubeSubjectStatusRequest());
  const apiUrl = `${BASE_URL}cubeSubjects/update-status/${cubeSubjectId}`;
  try {
    const res = await customAxios.patch(
      apiUrl,
      { status },
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch(updateCubeSubjectStatusSuccess());
      dispatch(fetchCubeSubjectList());
    }
  } catch (e) {
    handleApiError(dispatch, updateCubeSubjectStatusFailure, e);
  }
};