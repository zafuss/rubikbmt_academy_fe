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
  const apiUrl = BASE_URL + "course/get-list";
  try {
    const result = await customAxios.get(apiUrl, { withCredentials: true });
    console.log("API Response:", result.data.data.courses); // Kiểm tra dữ liệu trả về
    dispatch(fetchCoursesSuccess(result.data.data.courses)); // Truy cập đúng trường `courses`
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
  const apiUrl = BASE_URL + "courses/add";
  try {
    const res = await customAxios.post(apiUrl, course, { withCredentials: true });
    if (res.status === 201 || res.status === 200) {
      dispatch(addCourseSuccess());
      dispatch(fetchCourseList());
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
  const apiUrl = `${BASE_URL}courses/update/${course.key}`;
  try {
    const res = await customAxios.put(apiUrl, course, { withCredentials: true });
    if (res.status === 200) {
      dispatch(updateCourseSuccess());
      dispatch(fetchCourseList());
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

export const deleteCourse = (courseId) => async (dispatch) => {
  dispatch(deleteCourseRequest());
  const apiUrl = `${BASE_URL}courses/delete/${courseId}`;
  try {
    const res = await customAxios.delete(apiUrl, { withCredentials: true });
    if (res.status === 200) {
      dispatch(deleteCourseSuccess());
      dispatch(fetchCourseList());
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

export const updateCourseStatus = (courseId, status) => async (dispatch) => {
  dispatch(updateCourseStatusRequest());
  const apiUrl = `${BASE_URL}courses/update-status/${courseId}`;
  try {
    const res = await customAxios.patch(
      apiUrl,
      { status },
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch(updateCourseStatusSuccess());
      dispatch(fetchCourseList());
    }
  } catch (e) {
    handleApiError(dispatch, updateCourseStatusFailure, e);
  }
};