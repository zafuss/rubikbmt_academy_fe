import { Dropdown, Avatar } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const UserInfoCard = ({ userInfo, roleMenuItems, collapsed }) => {
  return (
    <Dropdown menu={{ items: roleMenuItems }} trigger={["click"]}>
      <motion.div
        whileHover={{ scale: collapsed ? 1 : 1.02 }} // Disable scale on hover when collapsed
        whileTap={{ scale: collapsed ? 1 : 0.98 }} // Disable scale on tap when collapsed
        style={{
          margin: collapsed ? "16px 8px" : "16px 16px", // Reduce margin when collapsed
          padding: collapsed ? "8px" : "12px", // Reduce padding when collapsed
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: collapsed ? "8px" : "12px", // Adjust gap when collapsed
          cursor: "pointer",
          transition: "all 0.3s ease",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          justifyContent: collapsed ? "center" : "flex-start", // Center content when collapsed
        }}
      >
        <motion.div
          whileHover={{ scale: collapsed ? 1 : 1.05 }}
          whileTap={{ scale: collapsed ? 1 : 0.95 }}
        >
          <Avatar
            size={collapsed ? 36 : 48} // Smaller avatar when collapsed
            icon={<UserOutlined />}
            src={userInfo.avatar}
            style={{
              background: "linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)",
            }}
          />
        </motion.div>
        {!collapsed && ( // Hide text when collapsed
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>
              {userInfo.name}
            </div>
            <div style={{ fontSize: "14px", color: "#d3e0ff" }}>
              {userInfo.currentRole}
            </div>
          </div>
        )}
        {!collapsed && ( // Hide DownOutlined when collapsed
          <DownOutlined style={{ color: "#d3e0ff", fontSize: 12 }} />
        )}
      </motion.div>
    </Dropdown>
  );
};

export default UserInfoCard;
