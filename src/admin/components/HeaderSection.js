import { Layout } from "antd"; // Import Layout
import { Dropdown, Avatar } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import colors from "../constants/colors";
import styled from "styled-components";

const { Header } = Layout; // Destructure Header from Layout

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledAvatar = styled(Avatar)`
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.primaryGradient} 100%
  );
`;

const HeaderSection = ({ userInfo, userMenu }) => (
  <StyledHeader>
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      style={{ margin: 0, color: colors.primary }}
    >
      RubikBMT Academy
    </motion.h2>
    <UserSection>
      <span style={{ marginRight: 8, color: colors.primary }}>
        Welcome, {userInfo.name}
      </span>
      <Dropdown menu={userMenu} trigger={["click"]}>
        <StyledAvatar size={40} icon={<UserOutlined />} src={userInfo.avatar}>
          <DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
        </StyledAvatar>
      </Dropdown>
    </UserSection>
  </StyledHeader>
);

export default HeaderSection;
