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
  onAdd = () => {},
  onUpdate = () => {},
  onDelete = () => {},
  formFields = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        const action = editingRecord
          ? onUpdate(editingRecord.key, values)
          : onAdd(values);
        return action;
      })
      .then(() => {
        message.success(
          editingRecord ? "Cập nhật thành công!" : "Thêm mới thành công!"
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        message.error(error.message || "Đã có lỗi xảy ra!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showDeleteConfirm = (key) => {
    setDeleteKey(key);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    onDelete(deleteKey)
      .then(() => {
        message.success("Xóa thành công!");
      })
      .catch((error) => {
        message.error(error.message || "Đã có lỗi xảy ra!");
      })
      .finally(() => {
        setLoading(false);
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
    render: (_, record) => (
      <Space>
        <Button
          type="link"
          style={{ color: colors.primary }}
          onClick={() => showModal(record)}
          disabled={loading}
        >
          Sửa
        </Button>
        <Button
          type="link"
          danger
          onClick={() => showDeleteConfirm(record.key)}
          disabled={loading}
        >
          Xóa
        </Button>
      </Space>
    ),
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
          disabled={loading}
        >
          Thêm mới
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={[...enhancedColumns, actionColumn]}
          dataSource={filteredData}
          pagination={{
            ...pagination,
            total: filteredData.length,
            onChange: (page, pageSize) =>
              setPagination({ ...pagination, current: page, pageSize }),
          }}
          scroll={{ x: "max-content" }} // Kích hoạt cuộn ngang
        />
      </Spin>

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
        confirmLoading={loading}
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
                {field.type === "select" ? (
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
        confirmLoading={loading}
      >
        <p>Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.</p>
      </Modal>
    </StyledCard>
  );
};

export default DataTable;
