import axios from "axios";
import customAxios from "../../../utils/customAxios";
import {
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  ADD_SESSION_REQUEST,
  ADD_SESSION_SUCCESS,
  ADD_SESSION_FAILURE,
  UPDATE_SESSION_REQUEST,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_FAILURE,
  DELETE_SESSION_REQUEST,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_FAILURE,
  UPDATE_SESSION_STATUS_REQUEST,
  UPDATE_SESSION_STATUS_SUCCESS,
  UPDATE_SESSION_STATUS_FAILURE,
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE,
} from "./sessionTypes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleApiError = (dispatch, action, error) => {
  if (error.response) {
    dispatch(action(error.response.data.message || "Có lỗi xảy ra"));
  } else {
    dispatch(action(error.message));
  }
};

const fetchSessionRequest = () => ({ type: FETCH_SESSION_REQUEST });
const fetchSessionSuccess = (session) => ({
  type: FETCH_SESSION_SUCCESS,
  payload: session,
});
const fetchSessionFailure = (error) => ({
  type: FETCH_SESSION_FAILURE,
  payload: error,
});
export const fetchSession = (sessionId) => async (dispatch) => {
  dispatch(fetchSessionRequest());
  const apiUrl = `${BASE_URL}session/get?id=${sessionId}`;
  try {
    const res = await customAxios.get(apiUrl, { withCredentials: true });
    if (res.status === 200) {
      dispatch(fetchSessionSuccess(res.data.data.session));
    }
  } catch (e) {
    handleApiError(dispatch, fetchSessionFailure, e);
  }
};

// Fetch Sessions
const fetchSessionsRequest = () => ({ type: FETCH_SESSIONS_REQUEST });
const fetchSessionsSuccess = (sessions) => ({
  type: FETCH_SESSIONS_SUCCESS,
  payload: sessions,
});
const fetchSessionsFailure = (error) => ({
  type: FETCH_SESSIONS_FAILURE,
  payload: error,
});

export const fetchSessionList = (id) => async (dispatch) => {
  dispatch(fetchSessionsRequest());
  const apiUrl = BASE_URL + "session/get-by-course-detail-id?id=" + id;
  try {
    const result = await customAxios.get(apiUrl, { withCredentials: true });
    console.log("API Response:", result.data.data.sessions); // Kiểm tra dữ liệu trả về
    dispatch(fetchSessionsSuccess(result.data.data.sessions)); // Truy cập đúng trường `sessions`
  } catch (e) {
    handleApiError(dispatch, fetchSessionsFailure, e);
  }
};
// Add Session
const addSessionRequest = () => ({ type: ADD_SESSION_REQUEST });
const addSessionSuccess = () => ({ type: ADD_SESSION_SUCCESS });
const addSessionFailure = (error) => ({
  type: ADD_SESSION_FAILURE,
  payload: error,
});

export const addSession = (session) => async (dispatch) => {
  dispatch(addSessionRequest());
  const apiUrl = BASE_URL + "session/add";
  try {
    const res = await customAxios.post(apiUrl, session, {
      withCredentials: true,
    });
    if (res.status === 201 || res.status === 200) {
      dispatch(addSessionSuccess());
      dispatch(fetchSessionList());
    } else {
      dispatch(addSessionFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, addSessionFailure, e);
  }
};

// Update Session
const updateSessionRequest = () => ({ type: UPDATE_SESSION_REQUEST });
const updateSessionSuccess = () => ({ type: UPDATE_SESSION_SUCCESS });
const updateSessionFailure = (error) => ({
  type: UPDATE_SESSION_FAILURE,
  payload: error,
});

export const updateSession = (session) => async (dispatch) => {
  dispatch(updateSessionRequest());
  const apiUrl = `${BASE_URL}session/update`;
  try {
    const res = await customAxios.patch(apiUrl, session, {
      withCredentials: true,
    });
    if (res.status === 200) {
      dispatch(updateSessionSuccess());
      dispatch(fetchSessionList());
    }
  } catch (e) {
    handleApiError(dispatch, updateSessionFailure, e);
  }
};

// Delete Session
const deleteSessionRequest = () => ({ type: DELETE_SESSION_REQUEST });
const deleteSessionSuccess = () => ({ type: DELETE_SESSION_SUCCESS });
const deleteSessionFailure = (error) => ({
  type: DELETE_SESSION_FAILURE,
  payload: error,
});

export const deleteSession = (sessionId) => async (dispatch) => {
  dispatch(deleteSessionRequest());
  const apiUrl = `${BASE_URL}session/delete/${sessionId}`;
  try {
    const res = await customAxios.delete(apiUrl, { withCredentials: true });
    if (res.status === 200) {
      dispatch(deleteSessionSuccess());
      dispatch(fetchSessionList());
    }
  } catch (e) {
    handleApiError(dispatch, deleteSessionFailure, e);
  }
};

// Update Session Status
const updateSessionStatusRequest = () => ({
  type: UPDATE_SESSION_STATUS_REQUEST,
});
const updateSessionStatusSuccess = () => ({
  type: UPDATE_SESSION_STATUS_SUCCESS,
});
const updateSessionStatusFailure = (error) => ({
  type: UPDATE_SESSION_STATUS_FAILURE,
  payload: error,
});

export const updateSessionStatus = (sessionId, status) => async (dispatch) => {
  dispatch(updateSessionStatusRequest());
  const apiUrl = `${BASE_URL}session/update-status/${sessionId}`;
  try {
    const res = await customAxios.patch(
      apiUrl,
      { status },
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch(updateSessionStatusSuccess());
      dispatch(fetchSessionList());
    }
  } catch (e) {
    handleApiError(dispatch, updateSessionStatusFailure, e);
  }
};
