import { Dropdown, Avatar } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const UserInfoCard = ({ userInfo, roleMenuItems }) => {
  return (
    <Dropdown menu={{ items: roleMenuItems }} trigger={["click"]}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          margin: "16px 16px",
          padding: "12px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Avatar
            size={48}
            icon={<UserOutlined />}
            src={userInfo.avatar}
            style={{
              background: "linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)",
            }}
          />
        </motion.div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>
            {userInfo.name}
          </div>
          <div style={{ fontSize: "14px", color: "#d3e0ff" }}>
            {userInfo.currentRole}
          </div>
        </div>
        <DownOutlined style={{ color: "#d3e0ff", fontSize: 12 }} />
      </motion.div>
    </Dropdown>
  );
};

export default UserInfoCard;
