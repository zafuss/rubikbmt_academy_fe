import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Spin,
  Space,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import colors from "../constants/colors";

const { Option } = Select;

const StyledCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Thêm cuộn ngang cho toàn bộ card nếu cần */
`;

const DataTable = ({
  columns,
  data,
  loading = false,
  onAdd = () => {},
  onUpdate = () => {},
  onDelete = () => {},
  formFields = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  // Cập nhật filteredData khi data thay đổi
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          val &&
          typeof val === "string" &&
          val.toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setPagination({ ...pagination, current: 1 });
  };

  const showModal = (record = null) => {
    console.log("record:", record);

    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      console.log("1. Bắt đầu xử lý");
      setModalLoading(true);

      const values = await form.validateFields();
      console.log("2. Form values:", values);

      if (editingRecord) {
        console.log("3a. Đang update...");
        const updatedValues = {
          ...values,
          _id: editingRecord._id,
        };
        console.log("Updated values:", updatedValues);
        await onUpdate(updatedValues);
      } else {
        console.log("3b. Đang thêm mới...");
        await onAdd(values);
      }

      console.log("4. Thao tác hoàn thành");
      message.success(
        editingRecord ? "Cập nhật thành công!" : "Thêm mới thành công!"
      );
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("5. Lỗi:", error);
      message.error(error.message || "Đã có lỗi xảy ra!");
    } finally {
      console.log("6. Kết thúc");
      setModalLoading(false);
    }
  };

  const showDeleteConfirm = (key) => {
    setDeleteKey(key);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setModalLoading(true);
    onDelete(deleteKey)
      .then(() => {
        message.success("Xóa thành công!");
      })
      .catch((error) => {
        message.error(error.message || "Đã có lỗi xảy ra!");
      })
      .finally(() => {
        setModalLoading(false);
        setIsDeleteModalOpen(false);
        setDeleteKey(null);
      });
  };

  // Thêm cột hành động
  const actionColumn = {
    title: "Hành động",
    key: "action",
    fixed: "right", // Giữ cột hành động cố định bên phải
    width: 120, // Giới hạn chiều rộng cột hành động
    render: (_, record) => {
      return (
        <Space>
          <Button
            type="link"
            style={{ color: colors.primary }}
            onClick={() => showModal(record)}
            disabled={loading || modalLoading}
          >
            Sửa
          </Button>
          <Button
            type="link"
            danger
            onClick={() => showDeleteConfirm(record.key)}
            disabled={loading || modalLoading}
          >
            Xóa
          </Button>
        </Space>
      );
    },
  };

  // Tự động thêm width cho các cột nếu chưa có
  const enhancedColumns = columns.map((col) => ({
    ...col,
    width: col.width || 150, // Chiều rộng mặc định nếu không được chỉ định
  }));

  return (
    <StyledCard>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          style={{ background: colors.primary, border: "none" }}
          disabled={loading || modalLoading}
        >
          Thêm mới
        </Button>
      </div>

      <Table
        columns={[...enhancedColumns, actionColumn]}
        dataSource={filteredData}
        loading={loading}
        pagination={{
          ...pagination,
          total: filteredData.length,
          onChange: (page, pageSize) =>
            setPagination({ ...pagination, current: page, pageSize }),
        }}
        scroll={{ x: "max-content" }}
      />

      <Modal
        title={editingRecord ? "Chỉnh sửa" : "Thêm mới"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingRecord(null);
        }}
        okText={editingRecord ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
        confirmLoading={modalLoading}
      >
        <Form form={form} layout="vertical">
          {formFields && formFields.length > 0 ? (
            formFields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules || []}
              >
                {field.type === "checkbox-group" ? (
                  <Checkbox.Group options={field.options} />
                ) : field.type === "select" ? (
                  <Select placeholder={field.placeholder}>
                    {field.options &&
                      field.options.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                  </Select>
                ) : (
                  <Input
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                  />
                )}
              </Form.Item>
            ))
          ) : (
            <p>Không có trường nhập liệu nào được định nghĩa.</p>
          )}
        </Form>
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeleteKey(null);
        }}
        okText="Xóa"
        okType="danger"
        cancelText="Hủy"
        confirmLoading={modalLoading}
      >
        <p>Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.</p>
      </Modal>
    </StyledCard>
  );
};

export default DataTable;
