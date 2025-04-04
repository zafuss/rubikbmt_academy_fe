import customAxios from "../../../utils/customAxios";
import {
  FETCH_CUBE_SKILLS_REQUEST,
  FETCH_CUBE_SKILLS_SUCCESS,
  FETCH_CUBE_SKILLS_FAILURE,
  ADD_CUBE_SKILL_REQUEST,
  ADD_CUBE_SKILL_SUCCESS,
  ADD_CUBE_SKILL_FAILURE,
  UPDATE_CUBE_SKILL_REQUEST,
  UPDATE_CUBE_SKILL_SUCCESS,
  UPDATE_CUBE_SKILL_FAILURE,
  DELETE_CUBE_SKILL_REQUEST,
  DELETE_CUBE_SKILL_SUCCESS,
  DELETE_CUBE_SKILL_FAILURE,
  UPDATE_CUBE_SKILL_STATUS_REQUEST,
  UPDATE_CUBE_SKILL_STATUS_SUCCESS,
  UPDATE_CUBE_SKILL_STATUS_FAILURE,
} from "./cubeSkillTypes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleApiError = (dispatch, action, error) => {
  if (error.response) {
    dispatch(action(error.response.data.message || "Có lỗi xảy ra"));
  } else {
    dispatch(action(error.message));
  }
};

// Fetch Cube Skills
const fetchCubeSkillsRequest = () => ({ type: FETCH_CUBE_SKILLS_REQUEST });
const fetchCubeSkillsSuccess = (cubeSkills) => ({
  type: FETCH_CUBE_SKILLS_SUCCESS,
  payload: cubeSkills,
});
const fetchCubeSkillsFailure = (error) => ({
  type: FETCH_CUBE_SKILLS_FAILURE,
  payload: error,
});

export const fetchCubeSkillList = () => async (dispatch) => {
  dispatch(fetchCubeSkillsRequest());
  const apiUrl = BASE_URL + "cubeSkill/get-list";
  try {
    const result = await customAxios.get(apiUrl, { withCredentials: true });
    console.log("API Response:", result.data.data.cubeSkills); // Kiểm tra dữ liệu trả về
    dispatch(fetchCubeSkillsSuccess(result.data.data.cubeSkills)); // Truy cập đúng trường `cubeSkills`
  } catch (e) {
    handleApiError(dispatch, fetchCubeSkillsFailure, e);
  }
};

// Add Cube Skill
const addCubeSkillRequest = () => ({ type: ADD_CUBE_SKILL_REQUEST });
const addCubeSkillSuccess = () => ({ type: ADD_CUBE_SKILL_SUCCESS });
const addCubeSkillFailure = (error) => ({
  type: ADD_CUBE_SKILL_FAILURE,
  payload: error,
});

export const addCubeSkill = (cubeSkill) => async (dispatch) => {
  dispatch(addCubeSkillRequest());
  const apiUrl = BASE_URL + "cubeSkills/add";
  try {
    const res = await customAxios.post(apiUrl, cubeSkill, { withCredentials: true });
    if (res.status === 201 || res.status === 200) {
      dispatch(addCubeSkillSuccess());
      dispatch(fetchCubeSkillList());
    } else {
      dispatch(addCubeSkillFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, addCubeSkillFailure, e);
  }
};

// Update Cube Skill
const updateCubeSkillRequest = () => ({ type: UPDATE_CUBE_SKILL_REQUEST });
const updateCubeSkillSuccess = () => ({ type: UPDATE_CUBE_SKILL_SUCCESS });
const updateCubeSkillFailure = (error) => ({
  type: UPDATE_CUBE_SKILL_FAILURE,
  payload: error,
});

export const updateCubeSkill = (cubeSkill) => async (dispatch) => {
  dispatch(updateCubeSkillRequest());
  const apiUrl = `${BASE_URL}cubeSkills/update/${cubeSkill.key}`;
  try {
    const res = await customAxios.put(apiUrl, cubeSkill, { withCredentials: true });
    if (res.status === 200) {
      dispatch(updateCubeSkillSuccess());
      dispatch(fetchCubeSkillList());
    }
  } catch (e) {
    handleApiError(dispatch, updateCubeSkillFailure, e);
  }
};

// Delete Cube Skill
const deleteCubeSkillRequest = () => ({ type: DELETE_CUBE_SKILL_REQUEST });
const deleteCubeSkillSuccess = () => ({ type: DELETE_CUBE_SKILL_SUCCESS });
const deleteCubeSkillFailure = (error) => ({
  type: DELETE_CUBE_SKILL_FAILURE,
  payload: error,
});

export const deleteCubeSkill = (cubeSkillId) => async (dispatch) => {
  dispatch(deleteCubeSkillRequest());
  const apiUrl = `${BASE_URL}cubeSkills/delete/${cubeSkillId}`;
  try {
    const res = await customAxios.delete(apiUrl, { withCredentials: true });
    if (res.status === 200) {
      dispatch(deleteCubeSkillSuccess());
      dispatch(fetchCubeSkillList());
    }
  } catch (e) {
    handleApiError(dispatch, deleteCubeSkillFailure, e);
  }
};

// Update Cube Skill Status
const updateCubeSkillStatusRequest = () => ({
  type: UPDATE_CUBE_SKILL_STATUS_REQUEST,
});
const updateCubeSkillStatusSuccess = () => ({
  type: UPDATE_CUBE_SKILL_STATUS_SUCCESS,
});
const updateCubeSkillStatusFailure = (error) => ({
  type: UPDATE_CUBE_SKILL_STATUS_FAILURE,
  payload: error,
});

export const updateCubeSkillStatus = (cubeSkillId, status) => async (dispatch) => {
  dispatch(updateCubeSkillStatusRequest());
  const apiUrl = `${BASE_URL}cubeSkills/update-status/${cubeSkillId}`;
  try {
    const res = await customAxios.patch(
      apiUrl,
      { status },
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch(updateCubeSkillStatusSuccess());
      dispatch(fetchCubeSkillList());
    }
  } catch (e) {
    handleApiError(dispatch, updateCubeSkillStatusFailure, e);
  }
};