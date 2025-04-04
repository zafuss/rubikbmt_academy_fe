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
} from "../actions/level/levelTypes";

const initState = {
  loading: false,
  levelList: [],
  error: "",
  addingLevel: false,
  addLevelSuccess: false,
  addLevelFailureMsg: "",
  updatingLevel: false,
  updateLevelSuccess: false,
  updateLevelFailureMsg: "",
  deletingLevel: false,
  deleteLevelSuccess: false,
  deleteLevelFailureMsg: "",
  updatingLevelStatus: false,
  updateLevelStatusSuccess: false,
  updateLevelStatusFailureMsg: "",
};

const levelReducer =(state = initState, action) =>{
  switch (action.type) {
    case FETCH_LEVELS_REQUEST:
      return {
        ...state,
        gettingLevelList: true,
        getLevelListSuccess: false,
      };
    case FETCH_LEVELS_SUCCESS:
      console.log("Reducer Payload:", action.payload); // Kiểm tra payload
      return {
        ...state,
        gettingLevelList: false,
        getLevelListSuccess: true,
        levelList: action.payload, // Đảm bảo cập nhật `levelList`
        error: "",
      };
    case FETCH_LEVELS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_LEVEL_REQUEST:
      return {
        ...state,
        addingLevel: true,
        addLevelSuccess: false,
        addLevelFailureMsg: "",
      };
    case ADD_LEVEL_SUCCESS:
      return {
        ...state,
        addingLevel: false,
        addLevelSuccess: true,
      };
    case ADD_LEVEL_FAILURE:
      return {
        ...state,
        addingLevel: false,
        addLevelSuccess: false,
        addLevelFailureMsg: action.payload,
      };
    case UPDATE_LEVEL_REQUEST:
      return {
        ...state,
        updatingLevel: true,
        updateLevelSuccess: false,
        updateLevelFailureMsg: "",
      };
    case UPDATE_LEVEL_SUCCESS:
      return {
        ...state,
        updatingLevel: false,
        updateLevelSuccess: true,
      };
    case UPDATE_LEVEL_FAILURE:
      return {
        ...state,
        updatingLevel: false,
        updateLevelSuccess: false,
        updateLevelFailureMsg: action.payload,
      };
    case DELETE_LEVEL_REQUEST:
      return {
        ...state,
        deletingLevel: true,
        deleteLevelSuccess: false,
        deleteLevelFailureMsg: "",
      };
    case DELETE_LEVEL_SUCCESS:
      return {
        ...state,
        deletingLevel: false,
        deleteLevelSuccess: true,
      };
    case DELETE_LEVEL_FAILURE:
      return {
        ...state,
        deletingLevel: false,
        deleteLevelSuccess: false,
        deleteLevelFailureMsg: action.payload,
      };
    case UPDATE_LEVEL_STATUS_REQUEST:
      return {
        ...state,
        updatingLevelStatus: true,
        updateLevelStatusSuccess: false,
        updateLevelStatusFailureMsg: "",
      };
    case UPDATE_LEVEL_STATUS_SUCCESS:
      return {
        ...state,
        updatingLevelStatus: false,
        updateLevelStatusSuccess: true,
      };
    case UPDATE_LEVEL_STATUS_FAILURE:
      return {
        ...state,
        updatingLevelStatus: false,
        updateLevelStatusSuccess: false,
        updateLevelStatusFailureMsg: action.payload,
      };
    default:
      return state;
  }
}

export default levelReducer;