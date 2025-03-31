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
} from "../actions/course/courseTypes";

const initState = {
  courseList: [],
  gettingCourseList: false,
  getCourseListSuccess: false,
  getCourseListFailureMsg: "",
  addingCourse: false,
  addCourseSuccess: false,
  addCourseFailureMsg: "",
  updatingCourse: false,
  updateCourseSuccess: false,
  updateCourseFailureMsg: "",
  deletingCourse: false,
  deleteCourseSuccess: false,
  deleteCourseFailureMsg: "",
  updatingCourseStatus: false,
  updateCourseStatusSuccess: false,
  updateCourseStatusFailureMsg: "",
};

function courseReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_COURSES_REQUEST:
      return {
        ...state,
        gettingCourseList: true,
        getCourseListSuccess: false,
      };
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        gettingCourseList: false,
        courseList: action.payload,
        getCourseListSuccess: true,
      };
    case FETCH_COURSES_FAILURE:
      return {
        ...state,
        gettingCourseList: false,
        getCourseListFailureMsg: action.payload,
      };

    case ADD_COURSE_REQUEST:
      return {
        ...state,
        addingCourse: true,
        addCourseSuccess: false,
        addCourseFailureMsg: "",
      };
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        addingCourse: false,
        addCourseSuccess: true,
      };
    case ADD_COURSE_FAILURE:
      return {
        ...state,
        addingCourse: false,
        addCourseFailureMsg: action.payload,
      };

    case UPDATE_COURSE_REQUEST:
      return {
        ...state,
        updatingCourse: true,
        updateCourseSuccess: false,
        updateCourseFailureMsg: "",
      };
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        updatingCourse: false,
        updateCourseSuccess: true,
      };
    case UPDATE_COURSE_FAILURE:
      return {
        ...state,
        updatingCourse: false,
        updateCourseFailureMsg: action.payload,
      };

    case DELETE_COURSE_REQUEST:
      return {
        ...state,
        deletingCourse: true,
        deleteCourseSuccess: false,
        deleteCourseFailureMsg: "",
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        deletingCourse: false,
        deleteCourseSuccess: true,
      };
    case DELETE_COURSE_FAILURE:
      return {
        ...state,
        deletingCourse: false,
        deleteCourseFailureMsg: action.payload,
      };

    case UPDATE_COURSE_STATUS_REQUEST:
      return {
        ...state,
        updatingCourseStatus: true,
        updateCourseStatusSuccess: false,
        updateCourseStatusFailureMsg: "",
      };
    case UPDATE_COURSE_STATUS_SUCCESS:
      return {
        ...state,
        updatingCourseStatus: false,
        updateCourseStatusSuccess: true,
      };
    case UPDATE_COURSE_STATUS_FAILURE:
      return {
        ...state,
        updatingCourseStatus: false,
        updateCourseStatusFailureMsg: action.payload,
      };

    default:
      return state;
  }
}

export default courseReducer;