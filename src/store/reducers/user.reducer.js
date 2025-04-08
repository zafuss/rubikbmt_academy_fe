import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  RESET_REGISTER_STATE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  RESET_CHANGE_PASSWORD_STATUS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  RESET_LOGOUT_STATE,
  FETCH_USER_LIST_FAILURE,
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  UPDATE_USER_STATUS_FAILURE,
  UPDATE_USER_STATUS_REQUEST,
  UPDATE_USER_STATUS_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "../actions/user/userTypes";

const initState = {
  loading: false,
  users: [],
  error: "",
  registerUserSuccess: false,
  updateUserSuccess: false,
  registerUserFailureMsg: "",
  user: null,
  updateUserFailureMsg: "",
  loginUserFailureMsg: "",
  loginUserSuccess: false,
  roles: [],
  changingPassword: false,
  changePasswordSuccess: false,
  changePasswordFailureMsg: "",
  logoutUserFailureMsg: "",
  logoutUserSuccess: false,
  gettingUserList: false,
  userList: [],
  getUserListSuccess: false,
  getUserListFailureMsg: "",
  updatingUserStatus: false,
  updateUserStatusSuccess: false,
  updateUserStatusFailureMsg: "",
  addingUser: false,
  addUserSuccess: false,
  addUserFailureMsg: "",
  students: [],
  mentors: [],
};

function userReducer(state = initState, action) {
  console.log(state);
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      if (action.userType === "student") {
        return {
          ...state,
          loading: false,
          students: action.payload,
        };
      }
      if (action.userType === "mentor") {
        return {
          ...state,
          loading: false,
          mentors: action.payload,
        };
      }
      return {
        users: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        users: [],
        loading: false,
        error: action.payload,
      };
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        registerUserSuccess: false,
        loading: true,
        registerUserFailureMsg: "",
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerUserSuccess: true,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        registerUserFailureMsg: action.registerUserFailureMsg,
      };
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        user: action.payload.user,
        roles: action.payload.roles,
        loading: false,
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        loginUserSuccess: true,
        userData: action.payload,
        logoutUserSuccess: false,
      };
    case LOGIN_USER_FAILURE:
      return {
        loading: false,
        loginUserSuccess: false,
        loginUserFailureMsg: action.payload,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        updateUserSuccess: true,
      };
    case UPDATE_USER_FAILURE:
      return {
        loading: false,
        updateUserFailureMsg: action.payload,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER_FAILURE:
      return {
        loading: false,
      };
    case RESET_REGISTER_STATE:
      return {
        ...state,
        registerUserSuccess: false,
        registerUserFailureMsg: "",
      };
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changingPassword: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        changePasswordSuccess: true,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changingPassword: false,
        changePasswordFailureMsg: action.payload,
      };
    case RESET_CHANGE_PASSWORD_STATUS:
      return {
        ...state,
        changingPassword: false,
        changePasswordSuccess: false,
        changePasswordFailureMsg: null,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_USER_SUCCESS:
      console.log("Logout user success");
      return {
        ...state,
        loading: false,
        logoutUserSuccess: true,
        user: null,
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        logoutUserFailureMsg: action.payload,
      };
    case RESET_LOGOUT_STATE:
      return {
        ...state,
        logoutUserSuccess: false,
        logoutUserFailureMsg: null,
      };
    case FETCH_USER_LIST_REQUEST:
      return {
        ...state,
        gettingUserList: true,
        getUserListSuccess: false,
      };
    case FETCH_USER_LIST_SUCCESS:
      if (action.userType === "student") {
        return {
          ...state,
          loading: false,
          gettingUserList: false,
          getUserListSuccess: true,
          students: action.payload.data,
        };
      }
      if (action.userType === "mentor") {
        return {
          ...state,
          loading: false,
          gettingUserList: false,
          getUserListSuccess: true,
          mentors: action.payload.data,
        };
      }
      return {
        ...state,
        gettingUserList: false,
        getUserListSuccess: true,
        userList: action.payload,
      };
    case FETCH_USER_LIST_FAILURE:
      return {
        ...state,
        gettingUserList: false,
        getUserListFailureMsg: action.payload,
      };
    case UPDATE_USER_STATUS_REQUEST:
      return {
        ...state,
        updatingUserStatus: true,
        updateUserStatusSuccess: false,
        updateUserStatusFailureMsg: "",
      };
    case UPDATE_USER_STATUS_SUCCESS:
      return {
        ...state,
        updatingUserStatus: false,
        updateUserStatusSuccess: true,
      };
    case UPDATE_USER_STATUS_FAILURE:
      return {
        ...state,
        updatingUserStatus: false,
        updateUserStatusSuccess: false,
        updateUserStatusFailureMsg: action.payload,
      };
    case ADD_USER_REQUEST:
      return {
        ...state,
        addingUser: true,
        addUserSuccess: false,
        addUserFailureMsg: "",
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        addingUser: false,
        addUserSuccess: true,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        addingUser: false,
        addUserSuccess: false,
        addUserFailureMsg: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
