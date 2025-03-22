import { useState, useEffect } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Ngày tham gia", dataIndex: "joinDate", key: "joinDate" },
  ];

  const formFields = [
    {
      name: "name",
      label: "Tên",
      placeholder: "Nhập tên",
      rules: [{ required: true, message: "Vui lòng nhập tên!" }],
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Nhập email",
      rules: [
        { required: true, message: "Vui lòng nhập email!" },
        { type: "email", message: "Email không hợp lệ!" },
      ],
    },
    {
      name: "role",
      label: "Vai trò",
      placeholder: "Chọn vai trò",
      type: "select",
      options: [
        { value: "Admin", label: "Admin" },
        { value: "Giáo viên", label: "Giáo viên" },
      ],
      rules: [{ required: true, message: "Vui lòng chọn vai trò!" }],
    },
  ];

  const handleAdd = (values) => {
    return addUser(values).then((newUser) => {
      setUsers([...users, newUser]);
    });
  };

  const handleUpdate = (key, values) => {
    return updateUser(key, values).then((updatedUser) => {
      setUsers(users.map((user) => (user.key === key ? updatedUser : user)));
    });
  };

  const handleDelete = (key) => {
    return deleteUser(key).then(() => {
      setUsers(users.filter((user) => user.key !== key));
    });
  };

  return (
    <DataManagementPage
      title="Quản lý người dùng"
      subtitle="Xem và quản lý danh sách người dùng trong hệ thống."
      columns={columns}
      data={users}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      formFields={formFields}
    />
  );
};

export default UserManagement;
