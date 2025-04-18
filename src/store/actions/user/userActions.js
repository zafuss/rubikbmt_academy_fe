import axios from "axios";
import customAxios from "../../../utils/customAxios";
const {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  RESET_REGISTER_STATE,
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
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_MENTORS_REQUEST,
  FETCH_MENTORS_SUCCESS,
  FETCH_MENTORS_FAILURE,
} = require("./userTypes");

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleApiError = (dispatch, action, error) => {
  if (error.response) {
    dispatch(action(error.response.data.message || "Có lỗi xảy ra"));
  } else {
    dispatch(action(error.message));
  }
};

const registerUserRequest = () => ({ type: REGISTER_USER_REQUEST });
const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS,
  registerUserSuccess: true,
});
const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  registerUserFailureMsg: error,
  registerUserSuccess: false,
});

export const registerUser = (user) => async (dispatch) => {
  dispatch(registerUserRequest());
  const apiUrl = BASE_URL + "auth/register";
  try {
    const res = await axios.post(apiUrl, user);
    if (res.status === 201 || res.status === 200) {
      dispatch(registerUserSuccess());
    } else {
      dispatch(registerUserFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, registerUserFailure, e);
  }
};

const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginUserSuccess = (userData) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userData,
});
const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const loginUser = (user) => async (dispatch) => {
  dispatch(loginUserRequest());
  const apiUrl = BASE_URL + "auth/login";
  try {
    const res = await axios.post(apiUrl, user, { withCredentials: true });
    if (res.status === 200) {
      dispatch(loginUserSuccess(res.data));
    } else {
      dispatch(loginUserFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, loginUserFailure, e);
  }
};

const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = (status) => async (dispatch) => {
  dispatch(fetchUsersRequest());
  const apiUrl = "http://localhost:4000/users";
  const fullUrl = status === undefined ? apiUrl : `${apiUrl}?status=${status}`;
  try {
    const res = await axios.get(fullUrl);
    dispatch(fetchUsersSuccess(res.data));
  } catch (e) {
    handleApiError(dispatch, fetchUsersFailure, e);
  }
};

const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});
const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const updateUser = (user) => async (dispatch) => {
  dispatch(updateUserRequest());
  const apiUrl = `${BASE_URL}auth/update-profile`;
  try {
    const res = await customAxios.post(apiUrl, user, {
      withCredentials: true,
    });
    if (res.status === 200) {
      dispatch(updateUserSuccess());
      dispatch(fetchUser());
    }
  } catch (e) {
    handleApiError(dispatch, updateUserFailure, e);
  }
};

const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST });
const deleteUserSuccess = () => ({ type: DELETE_USER_SUCCESS });
const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(deleteUserRequest());
  const apiUrl = `http://localhost:4000/users/${userId}`;
  try {
    const res = await axios.delete(apiUrl);
    if (res.status === 200) {
      dispatch(deleteUserSuccess());
      dispatch(fetchUsers());
    }
  } catch (e) {
    handleApiError(dispatch, deleteUserFailure, e);
  }
};

const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});
const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchUser = () => async (dispatch) => {
  dispatch(fetchUserRequest());
  const apiUrl = BASE_URL + `auth/get-user`;
  try {
    const res = await customAxios.get(apiUrl, { withCredentials: true });
    dispatch(fetchUserSuccess(res.data));
  } catch (e) {
    handleApiError(dispatch, fetchUserFailure, e);
  }
};

const resetRegisterState = () => {
  return {
    type: RESET_REGISTER_STATE,
  };
};

export const resetRegisterStateAction = () => {
  return (dispatch) => {
    dispatch(resetRegisterState());
  };
};

const changePasswordRequest = () => ({ type: CHANGE_PASSWORD_REQUEST });
const changePasswordSuccess = () => ({ type: CHANGE_PASSWORD_SUCCESS });
const changePasswordFailure = (error) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: error,
});

export const changePassword = (data) => async (dispatch) => {
  dispatch(changePasswordRequest());
  const apiUrl = BASE_URL + "auth/change-password";
  try {
    const res = await customAxios.post(apiUrl, data, { withCredentials: true });
    if (res.status === 200) {
      dispatch(changePasswordSuccess());
    }
  } catch (e) {
    handleApiError(dispatch, changePasswordFailure, e);
  }
};

export const resetChangePasswordStatus = () => {
  return {
    type: RESET_CHANGE_PASSWORD_STATUS,
  };
};

const logoutUserRequest = () => ({ type: LOGOUT_USER_REQUEST });
const logoutUserSuccess = () => ({ type: LOGOUT_USER_SUCCESS });
const logoutUserFailure = (error) => ({
  type: LOGOUT_USER_FAILURE,
  payload: error,
});

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutUserRequest());
  const apiUrl = BASE_URL + "auth/logout";
  try {
    const res = await customAxios.post(apiUrl, { withCredentials: true });
    if (res.status === 200) {
      dispatch(logoutUserSuccess());
    }
  } catch (e) {
    handleApiError(dispatch, logoutUserFailure, e);
  }
};

const fetchUserListRequest = () => ({ type: FETCH_USER_LIST_REQUEST });
const fetchUserListSuccess = (users, userType) => ({
  type: FETCH_USER_LIST_SUCCESS,
  payload: users,
  userType: userType ?? null,
});
const fetchUserListFailure = (error) => ({
  type: FETCH_USER_LIST_FAILURE,
  payload: error,
});
export const fetchUserList = () => async (dispatch) => {
  dispatch(fetchUserListRequest());
  // eslint-disable-next-line no-useless-concat
  const apiUrl = BASE_URL + `auth/list-user`;
  // const apiUrl = BASE_URL + `user-list?page=${page}&limit=${limit}`;
  try {
    const res = await customAxios.get(apiUrl, { withCredentials: true });
    dispatch(fetchUserListSuccess(res.data));
  } catch (e) {
    handleApiError(dispatch, fetchUserListFailure, e);
  }
};

export const fetchMentorList = () => async (dispatch) => {
  dispatch(fetchUserListRequest());
  // eslint-disable-next-line no-useless-concat
  const apiUrl = BASE_URL + `auth/list-teacher`;
  // const apiUrl = BASE_URL + `user-list?page=${page}&limit=${limit}`;
  try {
    const res = await customAxios.get(apiUrl, { withCredentials: true });
    console.log(res.data);
    dispatch(fetchUserListSuccess(res.data, "mentor"));
  } catch (e) {
    handleApiError(dispatch, fetchUserListFailure, e);
  }
};

export const fetchStudentList = () => async (dispatch) => {
  dispatch(fetchUserListRequest());
  // eslint-disable-next-line no-useless-concat
  const apiUrl = BASE_URL + `auth/list-student`;
  // const apiUrl = BASE_URL + `user-list?page=${page}&limit=${limit}`;
  try {
    const res = await customAxios.get(apiUrl, { withCredentials: true });
    dispatch(fetchUserListSuccess(res.data, "student"));
  } catch (e) {
    handleApiError(dispatch, fetchUserListFailure, e);
  }
};

export const resetLogoutState = () => {
  return {
    type: RESET_LOGOUT_STATE,
  };
};

export const updateUserStatusRequest = () => ({
  type: UPDATE_USER_STATUS_REQUEST,
});
export const updateUserStatusSuccess = () => ({
  type: UPDATE_USER_STATUS_SUCCESS,
});
export const updateUserStatusFailure = (error) => ({
  type: UPDATE_USER_STATUS_FAILURE,
  payload: error,
});

export const updateUserStatus = (email, status) => async (dispatch) => {
  try {
    dispatch(updateUserStatusRequest());
    let apiUrl = "";
    if (status === 1) {
      apiUrl = BASE_URL + `auth/confirm-account`;
    } else {
      apiUrl = BASE_URL + `auth/disable-account`;
    }
    const res = await customAxios.post(
      apiUrl,
      { email },
      { withCredentials: true }
    );
    if (res.status === 200) {
      dispatch(updateUserStatusSuccess());
      dispatch(fetchUserList());
    } else {
      dispatch(updateUserStatusFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, fetchUserListFailure, e);
  }
};
export const addUserRequest = () => ({
  type: ADD_USER_REQUEST,
});
export const addUserSuccess = () => ({
  type: ADD_USER_SUCCESS,
});
export const addUserFailure = (error) => ({
  type: ADD_USER_FAILURE,
  payload: error,
});

export const addUser = (user) => async (dispatch) => {
  try {
    console.log(user);
    const res = await customAxios.post(
      BASE_URL + `auth/add-user`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        parentName: user.parentName,
        email: user.email,
        roles: user.roles,
      },
      { withCredentials: true }
    );
    if (res.status === 200 || res.status === 201) {
      dispatch(addUserSuccess());
      dispatch(fetchUserList());
    } else {
      dispatch(addUserFailure(res.data.message));
    }
  } catch (e) {
    handleApiError(dispatch, addUserFailure, e);
  }
};
