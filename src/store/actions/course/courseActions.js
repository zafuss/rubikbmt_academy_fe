import customAxios from "../../../utils/customAxios";
import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  UPDATE_COURSE_STATUS_REQUEST,
  UPDATE_COURSE_STATUS_SUCCESS,
  UPDATE_COURSE_STATUS_FAILURE,
} from "./courseTypes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleApiError = (dispatch, action, error) => {
  if (error.response) {
    dispatch(action(error.response.data.message || "Có lỗi xảy ra"));
  } else {
    dispatch(action(error.message));
  }
};

// Fetch Courses
const fetchCoursesRequest = () => ({ type: FETCH_COURSES_REQUEST });
const fetchCoursesSuccess = (courses) => ({
  type: FETCH_COURSES_SUCCESS,
  payload: courses,
});
const fetchCoursesFailure = (error) => ({
  type: FETCH_COURSES_FAILURE,
  payload: error,
});

export const fetchCourseList = () => async (dispatch) => {
  dispatch(fetchCoursesRequest());
  const apiUrl = `${BASE_URL}course/getCourses`; // Endpoint đầy đủ: http://localhost:3001/api/v1/course/getCourses
  try {
    const res = await customAxios.get(apiUrl);
    dispatch(fetchCoursesSuccess(res.data.courses)); // Truyền danh sách courses từ response
  } catch (e) {
    handleApiError(dispatch, fetchCoursesFailure, e);
  }
};

// Add Course
const addCourseRequest = () => ({ type: ADD_COURSE_REQUEST });
const addCourseSuccess = () => ({ type: ADD_COURSE_SUCCESS });
const addCourseFailure = (error) => ({
  type: ADD_COURSE_FAILURE,
  payload: error,
});

export const addCourse = (course) => async (dispatch) => {
  dispatch(addCourseRequest());
  const apiUrl = `${BASE_URL}course/addCourse`; // Endpoint đầy đủ: http://localhost:3001/api/v1/course/addCourse
  try {
    const res = await customAxios.post(apiUrl, course);
    if (res.status === 201 || res.status === 200) {
      dispatch(addCourseSuccess());
      dispatch(fetchCourseList()); // Lấy lại danh sách khóa học sau khi thêm thành công
    } else {
      dispatch(addCourseFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, addCourseFailure, e);
  }
};

// Update Course
const updateCourseRequest = () => ({ type: UPDATE_COURSE_REQUEST });
const updateCourseSuccess = () => ({ type: UPDATE_COURSE_SUCCESS });
const updateCourseFailure = (error) => ({
  type: UPDATE_COURSE_FAILURE,
  payload: error,
});

export const updateCourse = (course) => async (dispatch) => {
  dispatch(updateCourseRequest());
  const apiUrl = `${BASE_URL}course/updateCourse`; // Endpoint đầy đủ: http://localhost:3001/api/v1/course/updateCourse
  try {
    const res = await customAxios.put(apiUrl, course);
    if (res.status === 200) {
      dispatch(updateCourseSuccess());
      dispatch(fetchCourseList());
    } else {
      dispatch(updateCourseFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, updateCourseFailure, e);
  }
};

// Delete Course
const deleteCourseRequest = () => ({ type: DELETE_COURSE_REQUEST });
const deleteCourseSuccess = () => ({ type: DELETE_COURSE_SUCCESS });
const deleteCourseFailure = (error) => ({
  type: DELETE_COURSE_FAILURE,
  payload: error,
});

export const deleteCourse = (id) => async (dispatch) => {
  dispatch(deleteCourseRequest());
  const apiUrl = `${BASE_URL}course/deleteCourse/${id}`; // Endpoint đầy đủ: http://localhost:3001/api/v1/course/deleteCourse/:id
  try {
    const res = await customAxios.delete(apiUrl);
    if (res.status === 200) {
      dispatch(deleteCourseSuccess());
      dispatch(fetchCourseList());
    } else {
      dispatch(deleteCourseFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, deleteCourseFailure, e);
  }
};

// Update Course Status
const updateCourseStatusRequest = () => ({
  type: UPDATE_COURSE_STATUS_REQUEST,
});
const updateCourseStatusSuccess = () => ({
  type: UPDATE_COURSE_STATUS_SUCCESS,
});
const updateCourseStatusFailure = (error) => ({
  type: UPDATE_COURSE_STATUS_FAILURE,
  payload: error,
});

export const updateCourseStatus = (id, status) => async (dispatch) => {
  dispatch(updateCourseStatusRequest());
  const apiUrl = `${BASE_URL}course/updateCourseStatus`; // Endpoint đầy đủ: http://localhost:3001/api/v1/course/updateCourseStatus
  try {
    const res = await customAxios.patch(apiUrl, { id, status });
    if (res.status === 200) {
      dispatch(updateCourseStatusSuccess());
      dispatch(fetchCourseList());
    } else {
      dispatch(updateCourseStatusFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, updateCourseStatusFailure, e);
  }
};