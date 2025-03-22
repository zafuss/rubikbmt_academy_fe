import { Dropdown, Avatar } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import styles from "../styles/UserInfoCard.module.scss";

const UserInfoCard = ({ userInfo, roleMenuItems }) => {
  return (
    <Dropdown menu={{ items: roleMenuItems }} trigger={["click"]}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={styles.card}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Avatar
            size={48}
            icon={<UserOutlined />}
            src={userInfo.avatar}
            className={styles.avatar}
          />
        </motion.div>
        <div className={styles.text}>
          <div className={styles.name}>{userInfo.name}</div>
          <div className={styles.role}>{userInfo.currentRole}</div>
        </div>
        <DownOutlined className={styles.dropdownIcon} />
      </motion.div>
    </Dropdown>
  );
};

export default UserInfoCard;
