import { Form, Input, Button, Card, InputNumber } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import colors from "../constants/colors";
const PageContainer = styled.div`
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 8px 0 0;
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  border: none;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, ${colors.primary}, #2a5298);
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  color: #fff;
  font-weight: 500;
  &:hover {
    background: linear-gradient(90deg, #2a5298, ${colors.primary});
    color: #fff;
  }
`;

const AddMassClass = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Add mass class:", values);
    form.resetFields();
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderSection>
          <Title>Thêm lớp học đại trà</Title>
          <Subtitle>Điền thông tin để tạo một lớp học đại trà mới.</Subtitle>
        </HeaderSection>
        <StyledCard>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="className"
              label={
                <span style={{ fontWeight: 500, color: colors.primary }}>
                  Tên lớp học
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập tên lớp học!" },
              ]}
            >
              <Input
                placeholder="Nhập tên lớp học"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label={
                <span style={{ fontWeight: 500, color: colors.primary }}>
                  Mô tả
                </span>
              }
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input.TextArea
                placeholder="Nhập mô tả"
                rows={4}
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
            <Form.Item
              name="teacher"
              label={
                <span style={{ fontWeight: 500, color: colors.primary }}>
                  Giáo viên phụ trách
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập tên giáo viên!" },
              ]}
            >
              <Input
                placeholder="Nhập tên giáo viên"
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
            <Form.Item
              name="maxStudents"
              label={
                <span style={{ fontWeight: 500, color: colors.primary }}>
                  Số lượng học viên tối đa
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng học viên tối đa!",
                },
              ]}
            >
              <InputNumber
                min={1}
                max={100}
                style={{ width: "100%", borderRadius: 8 }}
                placeholder="Nhập số lượng"
              />
            </Form.Item>
            <Form.Item>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <StyledButton type="primary" htmlType="submit">
                  Thêm lớp học đại trà
                </StyledButton>
              </motion.div>
            </Form.Item>
          </Form>
        </StyledCard>
      </motion.div>
    </PageContainer>
  );
};

export default AddMassClass;
