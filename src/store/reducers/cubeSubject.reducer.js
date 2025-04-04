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
} from "../actions/cubeSubject/cubeSubjectTypes";

const initState = {
  loading: false,
  cubeSubjectList: [],
  error: "",
  addingCubeSubject: false,
  addCubeSubjectSuccess: false,
  addCubeSubjectFailureMsg: "",
  updatingCubeSubject: false,
  updateCubeSubjectSuccess: false,
  updateCubeSubjectFailureMsg: "",
  deletingCubeSubject: false,
  deleteCubeSubjectSuccess: false,
  deleteCubeSubjectFailureMsg: "",
  updatingCubeSubjectStatus: false,
  updateCubeSubjectStatusSuccess: false,
  updateCubeSubjectStatusFailureMsg: "",
};

const cubeSubjectReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CUBE_SUBJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        cubeSubjectList: [],
        error: "",
      };
   case FETCH_CUBE_SUBJECTS_SUCCESS:
  console.log("Reducer Payload:", action.payload); // Kiểm tra payload
  return {
    ...state,
    loading: false,
    getCubeSubjectListSuccess: true, // Đảm bảo giá trị này được cập nhật
    cubeSubjectList: action.payload, // Cập nhật danh sách chủ đề
    error: "",
  };
    case FETCH_CUBE_SUBJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CUBE_SUBJECT_REQUEST:
      return {
        ...state,
        addingCubeSubject: true,
        addCubeSubjectSuccess: false,
        addCubeSubjectFailureMsg: "",
      };
    case ADD_CUBE_SUBJECT_SUCCESS:
      return {
        ...state,
        addingCubeSubject: false,
        addCubeSubjectSuccess: true,
      };
    case ADD_CUBE_SUBJECT_FAILURE:
      return {
        ...state,
        addingCubeSubject: false,
        addCubeSubjectSuccess: false,
        addCubeSubjectFailureMsg: action.payload,
      };
    case UPDATE_CUBE_SUBJECT_REQUEST:
      return {
        ...state,
        updatingCubeSubject: true,
        updateCubeSubjectSuccess: false,
        updateCubeSubjectFailureMsg: "",
      };
    case UPDATE_CUBE_SUBJECT_SUCCESS:
      return {
        ...state,
        updatingCubeSubject: false,
        updateCubeSubjectSuccess: true,
      };
    case UPDATE_CUBE_SUBJECT_FAILURE:
      return {
        ...state,
        updatingCubeSubject: false,
        updateCubeSubjectSuccess: false,
        updateCubeSubjectFailureMsg: action.payload,
      };
    case DELETE_CUBE_SUBJECT_REQUEST:
      return {
        ...state,
        deletingCubeSubject: true,
        deleteCubeSubjectSuccess: false,
        deleteCubeSubjectFailureMsg: "",
      };
    case DELETE_CUBE_SUBJECT_SUCCESS:
      return {
        ...state,
        deletingCubeSubject: false,
        deleteCubeSubjectSuccess: true,
      };
    case DELETE_CUBE_SUBJECT_FAILURE:
      return {
        ...state,
        deletingCubeSubject: false,
        deleteCubeSubjectSuccess: false,
        deleteCubeSubjectFailureMsg: action.payload,
      };
    case UPDATE_CUBE_SUBJECT_STATUS_REQUEST:
      return {
        ...state,
        updatingCubeSubjectStatus: true,
        updateCubeSubjectStatusSuccess: false,
        updateCubeSubjectStatusFailureMsg: "",
      };
    case UPDATE_CUBE_SUBJECT_STATUS_SUCCESS:
      return {
        ...state,
        updatingCubeSubjectStatus: false,
        updateCubeSubjectStatusSuccess: true,
      };
    case UPDATE_CUBE_SUBJECT_STATUS_FAILURE:
      return {
        ...state,
        updatingCubeSubjectStatus: false,
        updateCubeSubjectStatusSuccess: false,
        updateCubeSubjectStatusFailureMsg: action.payload,
      };
    default:
      return state;
  }
};

export default cubeSubjectReducer;