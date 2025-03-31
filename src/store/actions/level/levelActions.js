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
  UPDATE_LEVEL_STATUS_REQUEST,
  UPDATE_LEVEL_STATUS_SUCCESS,
  UPDATE_LEVEL_STATUS_FAILURE,
} from "./levelTypes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  const apiUrl = `${BASE_URL}level/getLevels`; // Endpoint đầy đủ: http://localhost:3001/api/v1/level/getLevels
  try {
    const res = await customAxios.get(apiUrl);
    dispatch(fetchLevelsSuccess(res.data.levels)); // Truyền danh sách levels từ response
  } catch (e) {
    dispatch(fetchLevelsFailure(e.message));
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
  const apiUrl = `${BASE_URL}level/addLevel`; // Endpoint đầy đủ: http://localhost:3001/api/v1/level/addLevel
  try {
    const res = await customAxios.post(apiUrl, level);
    if (res.status === 201 || res.status === 200) {
      dispatch(addLevelSuccess());
      dispatch(fetchLevelList()); // Lấy lại danh sách cấp độ sau khi thêm thành công
    } else {
      dispatch(addLevelFailure(res.data.message));
    }
  } catch (e) {
    dispatch(addLevelFailure(e.message));
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
  const apiUrl = `${BASE_URL}/updateLevel`; // Cần thêm endpoint /updateLevel trong backend nếu chưa có
  try {
    const res = await customAxios.put(apiUrl, level);
    if (res.status === 200) {
      dispatch(updateLevelSuccess());
      dispatch(fetchLevelList());
    } else {
      dispatch(updateLevelFailure(res.data.message));
    }
  } catch (e) {
    dispatch(updateLevelFailure(e.message));
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

export const updateLevelStatus = (id, status) => async (dispatch) => {
  dispatch(updateLevelStatusRequest());
  const apiUrl = `${BASE_URL}/updateLevelStatus`; // Cần thêm endpoint /updateLevelStatus trong backend nếu chưa có
  try {
    const res = await customAxios.patch(apiUrl, { id, status });
    if (res.status === 200) {
      dispatch(updateLevelStatusSuccess());
      dispatch(fetchLevelList());
    } else {
      dispatch(updateLevelStatusFailure(res.data.message));
    }
  } catch (e) {
    dispatch(updateLevelStatusFailure(e.message));
  }
};