// src/admin/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  fetchUser,
  resetLogoutState,
} from "src/store/actions/user/userActions";
import { Spin } from "antd";

const ProtectedRoute = ({
  fetchUser,
  userInfo,
  loading,
  logoutUserSuccess,
  resetLogoutState,
  children,
}) => {
  const [initialFetchDone, setInitialFetchDone] = useState(false); // Trạng thái để theo dõi lần fetch đầu tiên

  useEffect(() => {
    console.log(
      "ProtectedRoute - userInfo:",
      userInfo,
      "loading:",
      loading,
      "logoutUserSuccess:",
      logoutUserSuccess,
      "initialFetchDone:",
      initialFetchDone
    );

    if (!userInfo && !loading && !initialFetchDone && !logoutUserSuccess) {
      fetchUser(); // Gọi fetchUser lần đầu tiên
    }

    if (!loading && !initialFetchDone) {
      setInitialFetchDone(true); // Đánh dấu fetch đầu tiên đã hoàn tất khi loading kết thúc
    }

    if (logoutUserSuccess && !loading) {
      resetLogoutState(); // Reset trạng thái logout sau khi thành công
    }
  }, [
    fetchUser,
    userInfo,
    loading,
    logoutUserSuccess,
    resetLogoutState,
    initialFetchDone,
  ]);

  if (loading || (!initialFetchDone && !userInfo)) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f0f2f5",
        }}
      >
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (!userInfo) {
    console.log("Redirecting to /login because userInfo is null after fetch");
    return <Navigate to="/login" replace />;
  }

  return children;
};

const mapStateToProps = (state) => ({
  userInfo: state.userReducer.user,
  loading: state.userReducer.loading,
  logoutUserSuccess: state.userReducer.logoutUserSuccess,
});

const mapDispatchToProps = {
  fetchUser,
  resetLogoutState,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
