import customAxios from "../../../utils/customAxios";
import {
  FETCH_COURSE_DETAILS_REQUEST,
  FETCH_COURSE_DETAILS_SUCCESS,
  FETCH_COURSE_DETAILS_FAILURE,
  ADD_COURSE_DETAIL_REQUEST,
  ADD_COURSE_DETAIL_SUCCESS,
  ADD_COURSE_DETAIL_FAILURE,
  UPDATE_COURSE_DETAIL_REQUEST,
  UPDATE_COURSE_DETAIL_SUCCESS,
  UPDATE_COURSE_DETAIL_FAILURE,
  DELETE_COURSE_DETAIL_REQUEST,
  DELETE_COURSE_DETAIL_SUCCESS,
  DELETE_COURSE_DETAIL_FAILURE,
  UPDATE_COURSE_DETAIL_STATUS_REQUEST,
  UPDATE_COURSE_DETAIL_STATUS_SUCCESS,
  UPDATE_COURSE_DETAIL_STATUS_FAILURE,
  SET_CURRENT_COURSE_DETAIL,
  CLEAR_CURRENT_COURSE_DETAIL,
} from "./courseDetailTypes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleApiError = (dispatch, action, error) => {
  if (error.response) {
    dispatch(action(error.response.data.message || "Có lỗi xảy ra"));
  } else {
    dispatch(action(error.message));
  }
};

// Fetch CourseDetails
const fetchCourseDetailsRequest = () => ({
  type: FETCH_COURSE_DETAILS_REQUEST,
});
const fetchCourseDetailsSuccess = (courseDetails) => ({
  type: FETCH_COURSE_DETAILS_SUCCESS,
  payload: courseDetails,
});
const fetchCourseDetailsFailure = (error) => ({
  type: FETCH_COURSE_DETAILS_FAILURE,
  payload: error,
});

export const fetchCourseDetailList = () => async (dispatch) => {
  dispatch(fetchCourseDetailsRequest());
  const apiUrl = BASE_URL + "courseDetail/get-list";
  try {
    const result = await customAxios.get(apiUrl, { withCredentials: true });
    console.log("API Response:", result.data.data.courseDetails); // Kiểm tra dữ liệu trả về
    dispatch(fetchCourseDetailsSuccess(result.data.data.courseDetails)); // Truy cập đúng trường `courseDetails`
  } catch (e) {
    handleApiError(dispatch, fetchCourseDetailsFailure, e);
  }
};

// Add CourseDetail
const addCourseDetailRequest = () => ({ type: ADD_COURSE_DETAIL_REQUEST });
const addCourseDetailSuccess = () => ({ type: ADD_COURSE_DETAIL_SUCCESS });
const addCourseDetailFailure = (error) => ({
  type: ADD_COURSE_DETAIL_FAILURE,
  payload: error,
});

export const addCourseDetail = (courseDetail) => async (dispatch) => {
  dispatch(addCourseDetailRequest());
  const apiUrl = BASE_URL + "courseDetail/add";
  try {
    const res = await customAxios.post(apiUrl, courseDetail, {
      withCredentials: true,
    });
    if (res.status === 201 || res.status === 200) {
      dispatch(addCourseDetailSuccess());
      dispatch(fetchCourseDetailList());
    } else {
      dispatch(addCourseDetailFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, addCourseDetailFailure, e);
  }
};

// Update CourseDetail
const updateCourseDetailRequest = () => ({
  type: UPDATE_COURSE_DETAIL_REQUEST,
});
const updateCourseDetailSuccess = () => ({
  type: UPDATE_COURSE_DETAIL_SUCCESS,
});
const updateCourseDetailFailure = (error) => ({
  type: UPDATE_COURSE_DETAIL_FAILURE,
  payload: error,
});

export const updateCourseDetail = (courseDetail) => async (dispatch) => {
  dispatch(updateCourseDetailRequest());
  const apiUrl = `${BASE_URL}courseDetail/update?_id=${courseDetail._id}`;
  try {
    const res = await customAxios.put(apiUrl, courseDetail, {
      withCredentials: true,
    });
    if (res.status === 200) {
      dispatch(updateCourseDetailSuccess());
      dispatch(fetchCourseDetailList());
    }
  } catch (e) {
    handleApiError(dispatch, updateCourseDetailFailure, e);
  }
};

// Delete CourseDetail
const deleteCourseDetailRequest = () => ({
  type: DELETE_COURSE_DETAIL_REQUEST,
});
const deleteCourseDetailSuccess = () => ({
  type: DELETE_COURSE_DETAIL_SUCCESS,
});
const deleteCourseDetailFailure = (error) => ({
  type: DELETE_COURSE_DETAIL_FAILURE,
  payload: error,
});

export const deleteCourseDetail = (courseDetailId) => async (dispatch) => {
  dispatch(deleteCourseDetailRequest());
  const apiUrl = `${BASE_URL}courseDetail/delete/${courseDetailId}`;
  try {
    const res = await customAxios.delete(apiUrl, { withCredentials: true });
    if (res.status === 200) {
      dispatch(deleteCourseDetailSuccess());
      dispatch(fetchCourseDetailList());
    }
  } catch (e) {
    handleApiError(dispatch, deleteCourseDetailFailure, e);
  }
};

// Update CourseDetail Status
const updateCourseDetailStatusRequest = () => ({
  type: UPDATE_COURSE_DETAIL_STATUS_REQUEST,
});
const updateCourseDetailStatusSuccess = () => ({
  type: UPDATE_COURSE_DETAIL_STATUS_SUCCESS,
});
const updateCourseDetailStatusFailure = (error) => ({
  type: UPDATE_COURSE_DETAIL_STATUS_FAILURE,
  payload: error,
});

export const updateCourseDetailStatus =
  (courseDetailId, status) => async (dispatch) => {
    dispatch(updateCourseDetailStatusRequest());
    const apiUrl = `${BASE_URL}courseDetail/update-status/${courseDetailId}`;
    try {
      const res = await customAxios.patch(
        apiUrl,
        { status },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(updateCourseDetailStatusSuccess());
        dispatch(fetchCourseDetailList());
      }
    } catch (e) {
      handleApiError(dispatch, updateCourseDetailStatusFailure, e);
    }
  };

// Search CourseDetails
export const searchCourseDetails =
  (search, page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch(fetchCourseDetailsRequest());
    const apiUrl = `${BASE_URL}courseDetail/search?search=${search}&page=${page}&limit=${limit}`;
    try {
      const res = await customAxios.get(apiUrl, { withCredentials: true });
      dispatch(fetchCourseDetailsSuccess(res.data.data.levels)); // Truy cập đúng trường `levels`
    } catch (e) {
      handleApiError(dispatch, fetchCourseDetailsFailure, e);
    }
  };

// Set Current CourseDetail
export const setCurrentCourseDetail = (courseDetail) => ({
  type: SET_CURRENT_COURSE_DETAIL,
  payload: courseDetail,
});
// Clear Current CourseDetail
export const clearCurrentCourseDetail = () => ({
  type: CLEAR_CURRENT_COURSE_DETAIL,
});
