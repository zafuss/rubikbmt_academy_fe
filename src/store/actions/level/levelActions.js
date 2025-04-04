import axios from "axios";
import customAxios from "../../../utils/customAxios";
import {
  FETCH_LEVELS_REQUEST,
  FETCH_LEVELS_SUCCESS,
  FETCH_LEVELS_FAILURE,
  ADD_LEVEL_REQUEST,
  ADD_LEVEL_SUCCESS,
  ADD_LEVEL_FAILURE,
  UPDATE_LEVEL_REQUEST,
  UPDATE_LEVEL_SUCCESS,
  UPDATE_LEVEL_FAILURE,
  DELETE_LEVEL_REQUEST,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_FAILURE,
  UPDATE_LEVEL_STATUS_REQUEST,
  UPDATE_LEVEL_STATUS_SUCCESS,
  UPDATE_LEVEL_STATUS_FAILURE,
} from "./levelTypes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleApiError = (dispatch, action, error) => {
  if (error.response) {
    dispatch(action(error.response.data.message || "Có lỗi xảy ra"));
  } else {
    dispatch(action(error.message));
  }
};

// Fetch Levels
const fetchLevelsRequest = () => ({ type: FETCH_LEVELS_REQUEST });
const fetchLevelsSuccess = (levels) => ({
  type: FETCH_LEVELS_SUCCESS,
  payload: levels,
});
const fetchLevelsFailure = (error) => ({
  type: FETCH_LEVELS_FAILURE,
  payload: error,
});

export const fetchLevelList = () => async (dispatch) => {
  dispatch(fetchLevelsRequest());
  const apiUrl = BASE_URL + "level/get-list";
  try {
    const result = await customAxios.get(apiUrl, { withCredentials: true });
    console.log("API Response:", result.data.data.levels); // Kiểm tra dữ liệu trả về
    dispatch(fetchLevelsSuccess(result.data.data.levels)); // Truy cập đúng trường `levels`
    
  } catch (e) {
    handleApiError(dispatch, fetchLevelsFailure, e);
  }
};
// Add Level
const addLevelRequest = () => ({ type: ADD_LEVEL_REQUEST });
const addLevelSuccess = () => ({ type: ADD_LEVEL_SUCCESS });
const addLevelFailure = (error) => ({
  type: ADD_LEVEL_FAILURE,
  payload: error,
});

export const addLevel = (level) => async (dispatch) => {
  dispatch(addLevelRequest());
  const apiUrl = BASE_URL + "level/add";
  try {
    const res = await customAxios.post(apiUrl, level, { withCredentials: true });
    if (res.status === 201 || res.status === 200) {
      dispatch(addLevelSuccess());
      dispatch(fetchLevelList());
    } else {
      dispatch(addLevelFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, addLevelFailure, e);
  }
};

// Update Level
const updateLevelRequest = () => ({ type: UPDATE_LEVEL_REQUEST });
const updateLevelSuccess = () => ({ type: UPDATE_LEVEL_SUCCESS });
const updateLevelFailure = (error) => ({
  type: UPDATE_LEVEL_FAILURE,
  payload: error,
});

export const updateLevel = (level) => async (dispatch) => {
  dispatch(updateLevelRequest());
  const apiUrl = `${BASE_URL}level/update/${level.key}`;
  try {
    const res = await customAxios.put(apiUrl, level, { withCredentials: true });
    if (res.status === 200) {
      dispatch(updateLevelSuccess());
      dispatch(fetchLevelList());
    }
  } catch (e) {
    handleApiError(dispatch, updateLevelFailure, e);
  }
};

// Delete Level
const deleteLevelRequest = () => ({ type: DELETE_LEVEL_REQUEST });
const deleteLevelSuccess = () => ({ type: DELETE_LEVEL_SUCCESS });
const deleteLevelFailure = (error) => ({
  type: DELETE_LEVEL_FAILURE,
  payload: error,
});

export const deleteLevel = (levelId) => async (dispatch) => {
  dispatch(deleteLevelRequest());
  const apiUrl = `${BASE_URL}level/delete/${levelId}`;
  try {
    const res = await customAxios.delete(apiUrl, { withCredentials: true });
    if (res.status === 200) {
      dispatch(deleteLevelSuccess());
      dispatch(fetchLevelList());
    }
  } catch (e) {
    handleApiError(dispatch, deleteLevelFailure, e);
  }
};

// Update Level Status
const updateLevelStatusRequest = () => ({
  type: UPDATE_LEVEL_STATUS_REQUEST,
});
const updateLevelStatusSuccess = () => ({
  type: UPDATE_LEVEL_STATUS_SUCCESS,
});
const updateLevelStatusFailure = (error) => ({
  type: UPDATE_LEVEL_STATUS_FAILURE,
  payload: error,
});

export const updateLevelStatus = (levelId, status) => async (dispatch) => {
  dispatch(updateLevelStatusRequest());
  const apiUrl = `${BASE_URL}level/update-status/${levelId}`;
  try {
    const res = await customAxios.patch(
      apiUrl,
      { status },
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch(updateLevelStatusSuccess());
      dispatch(fetchLevelList());
    }
  } catch (e) {
    handleApiError(dispatch, updateLevelStatusFailure, e);
  }
};