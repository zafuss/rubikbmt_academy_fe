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
} from "../actions/session/sessionTypes";

const initState = {
  loading: false,
  sessionList: [],
  error: "",
  gettingSessionList: false,
  getSessionListSuccess: false,
  addingSession: false,
  addSessionSuccess: false,
  addSessionFailureMsg: "",
  updatingSession: false,
  updateSessionSuccess: false,
  updateSessionFailureMsg: "",
  deletingSession: false,
  deleteSessionSuccess: false,
  deleteSessionFailureMsg: "",
  updatingSessionStatus: false,
  updateSessionStatusSuccess: false,
  updateSessionStatusFailureMsg: "",
  currentSession: null,
};

const sessionReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_SESSIONS_REQUEST:
      return {
        ...state,
        gettingSessionList: true,
        getSessionListSuccess: false,
      };
    case FETCH_SESSIONS_SUCCESS:
      console.log("Reducer Payload:", action.payload); // Kiểm tra payload
      return {
        ...state,
        gettingSessionList: false,
        getSessionListSuccess: true,
        sessionList: action.payload, // Đảm bảo cập nhật `sessionList`
        error: "",
      };
    case FETCH_SESSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_SESSION_REQUEST:
      return {
        ...state,
        addingSession: true,
        addSessionSuccess: false,
        addSessionFailureMsg: "",
      };
    case ADD_SESSION_SUCCESS:
      return {
        ...state,
        addingSession: false,
        addSessionSuccess: true,
      };
    case ADD_SESSION_FAILURE:
      return {
        ...state,
        addingSession: false,
        addSessionSuccess: false,
        addSessionFailureMsg: action.payload,
      };
    case UPDATE_SESSION_REQUEST:
      return {
        ...state,
        updatingSession: true,
        updateSessionSuccess: false,
        updateSessionFailureMsg: "",
      };
    case UPDATE_SESSION_SUCCESS:
      return {
        ...state,
        updatingSession: false,
        updateSessionSuccess: true,
      };
    case UPDATE_SESSION_FAILURE:
      return {
        ...state,
        updatingSession: false,
        updateSessionSuccess: false,
        updateSessionFailureMsg: action.payload,
      };
    case DELETE_SESSION_REQUEST:
      return {
        ...state,
        deletingSession: true,
        deleteSessionSuccess: false,
        deleteSessionFailureMsg: "",
      };
    case DELETE_SESSION_SUCCESS:
      return {
        ...state,
        deletingSession: false,
        deleteSessionSuccess: true,
      };
    case DELETE_SESSION_FAILURE:
      return {
        ...state,
        deletingSession: false,
        deleteSessionSuccess: false,
        deleteSessionFailureMsg: action.payload,
      };
    case UPDATE_SESSION_STATUS_REQUEST:
      return {
        ...state,
        updatingSessionStatus: true,
        updateSessionStatusSuccess: false,
        updateSessionStatusFailureMsg: "",
      };
    case UPDATE_SESSION_STATUS_SUCCESS:
      return {
        ...state,
        updatingSessionStatus: false,
        updateSessionStatusSuccess: true,
      };
    case UPDATE_SESSION_STATUS_FAILURE:
      return {
        ...state,
        updatingSessionStatus: false,
        updateSessionStatusSuccess: false,
        updateSessionStatusFailureMsg: action.payload,
      };
    case FETCH_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
        currentSession: null,
      };
    case FETCH_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentSession: action.payload,
      };
    case FETCH_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        currentSession: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
