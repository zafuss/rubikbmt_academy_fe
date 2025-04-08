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
  SET_CURRENT_COURSE_DETAIL,
  CLEAR_CURRENT_COURSE_DETAIL,
} from "../actions/courseDetail/courseDetailTypes";

const initialState = {
  courseDetails: [],
  loading: false,
  error: null,
  fetchSuccess: false,
  addSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const courseDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        fetchSuccess: false,
        error: null,
      };
    case FETCH_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchSuccess: true,
        courseDetails: action.payload,
      };
    case FETCH_COURSE_DETAILS_FAILURE:
      return {
        ...state,
        fetchSuccess: false,
        loading: false,
        error: action.payload,
      };

    case ADD_COURSE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        addSuccess: false,
        error: null,
      };
    case ADD_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        addSuccess: true,
      };
    case ADD_COURSE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        addSuccess: false,
        error: action.payload,
      };

    case UPDATE_COURSE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        updateSuccess: false,
        error: null,
      };
    case UPDATE_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: true,
      };
    case UPDATE_COURSE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        error: action.payload,
      };

    case DELETE_COURSE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        deleteSuccess: false,
        error: null,
      };
    case DELETE_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
      };
    case DELETE_COURSE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
        error: action.payload,
      };
    case SET_CURRENT_COURSE_DETAIL:
      return {
        ...state,
        currentCourseDetail: action.payload,
      };
    case CLEAR_CURRENT_COURSE_DETAIL:
      return {
        ...state,
        currentCourseDetail: null,
      };
    default:
      return state;
  }
};

export default courseDetailReducer;
