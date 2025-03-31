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
} from "../actions/cubeSkill/cubeSkillTypes";

const initState = {
  loading: false,
  cubeSkillList: [],
  error: "",
  addingCubeSkill: false,
  addCubeSkillSuccess: false,
  addCubeSkillFailureMsg: "",
  updatingCubeSkill: false,
  updateCubeSkillSuccess: false,
  updateCubeSkillFailureMsg: "",
  deletingCubeSkill: false,
  deleteCubeSkillSuccess: false,
  deleteCubeSkillFailureMsg: "",
  updatingCubeSkillStatus: false,
  updateCubeSkillStatusSuccess: false,
  updateCubeSkillStatusFailureMsg: "",
};

function cubeSkillReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_CUBE_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CUBE_SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        cubeSkillList: action.payload,
        error: "",
      };
    case FETCH_CUBE_SKILLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CUBE_SKILL_REQUEST:
      return {
        ...state,
        addingCubeSkill: true,
        addCubeSkillSuccess: false,
        addCubeSkillFailureMsg: "",
      };
    case ADD_CUBE_SKILL_SUCCESS:
      return {
        ...state,
        addingCubeSkill: false,
        addCubeSkillSuccess: true,
      };
    case ADD_CUBE_SKILL_FAILURE:
      return {
        ...state,
        addingCubeSkill: false,
        addCubeSkillFailureMsg: action.payload,
      };
    case UPDATE_CUBE_SKILL_REQUEST:
      return {
        ...state,
        updatingCubeSkill: true,
        updateCubeSkillSuccess: false,
        updateCubeSkillFailureMsg: "",
      };
    case UPDATE_CUBE_SKILL_SUCCESS:
      return {
        ...state,
        updatingCubeSkill: false,
        updateCubeSkillSuccess: true,
      };
    case UPDATE_CUBE_SKILL_FAILURE:
      return {
        ...state,
        updatingCubeSkill: false,
        updateCubeSkillFailureMsg: action.payload,
      };
    case DELETE_CUBE_SKILL_REQUEST:
      return {
        ...state,
        deletingCubeSkill: true,
        deleteCubeSkillSuccess: false,
        deleteCubeSkillFailureMsg: "",
      };
    case DELETE_CUBE_SKILL_SUCCESS:
      return {
        ...state,
        deletingCubeSkill: false,
        deleteCubeSkillSuccess: true,
      };
    case DELETE_CUBE_SKILL_FAILURE:
      return {
        ...state,
        deletingCubeSkill: false,
        deleteCubeSkillFailureMsg: action.payload,
      };
    case UPDATE_CUBE_SKILL_STATUS_REQUEST:
      return {
        ...state,
        updatingCubeSkillStatus: true,
        updateCubeSkillStatusSuccess: false,
        updateCubeSkillStatusFailureMsg: "",
      };
    case UPDATE_CUBE_SKILL_STATUS_SUCCESS:
      return {
        ...state,
        updatingCubeSkillStatus: false,
        updateCubeSkillStatusSuccess: true,
      };
    case UPDATE_CUBE_SKILL_STATUS_FAILURE:
      return {
        ...state,
        updatingCubeSkillStatus: false,
        updateCubeSkillStatusFailureMsg: action.payload,
      };
    default:
      return state;
  }
}

export default cubeSkillReducer;