import { useState, useEffect } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../services/classService.js";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getClasses()
      .then((data) => {
        setClasses(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: "Tên lớp", dataIndex: "name", key: "name" },
    { title: "Giáo viên", dataIndex: "teacher", key: "teacher" },
    { title: "Số học viên", dataIndex: "students", key: "students" },
    { title: "Ngày bắt đầu", dataIndex: "startDate", key: "startDate" },
  ];

  const formFields = [
    {
      name: "name",
      label: "Tên lớp",
      placeholder: "Nhập tên lớp",
      rules: [{ required: true, message: "Vui lòng nhập tên lớp!" }],
    },
    {
      name: "teacher",
      label: "Giáo viên",
      placeholder: "Nhập tên giáo viên",
      rules: [{ required: true, message: "Vui lòng nhập tên giáo viên!" }],
    },
    {
      name: "students",
      label: "Số học viên",
      placeholder: "Nhập số học viên",
      type: "number",
      rules: [{ required: true, message: "Vui lòng nhập số học viên!" }],
    },
  ];

  const handleAdd = (values) => {
    return addClass(values).then((newClass) => {
      setClasses([...classes, newClass]);
    });
  };

  const handleUpdate = (key, values) => {
    return updateClass(key, values).then((updatedClass) => {
      setClasses(
        classes.map((classItem) =>
          classItem.key === key ? updatedClass : classItem
        )
      );
    });
  };

  const handleDelete = (key) => {
    return deleteClass(key).then(() => {
      setClasses(classes.filter((classItem) => classItem.key !== key));
    });
  };

  return (
    <DataManagementPage
      title="Danh sách lớp học"
      subtitle="Xem và quản lý danh sách các lớp học trong hệ thống."
      columns={columns}
      data={classes}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      formFields={formFields}
    />
  );
};

export default ClassList;
