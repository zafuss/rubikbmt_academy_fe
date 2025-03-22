import { Row, Col } from "antd";
import { motion } from "framer-motion";
import DataTable from "./DataTable.js";
import styles from "../styles/DataManagementPage.module.scss";

const DataManagementPage = ({
  title,
  subtitle,
  columns,
  data,
  onAdd,
  onUpdate,
  onDelete,
  formFields,
}) => {
  return (
    <div className={styles.pageContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerSection}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <DataTable
              columns={columns}
              data={data}
              onAdd={onAdd}
              onUpdate={onUpdate}
              onDelete={onDelete}
              formFields={formFields}
            />
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default DataManagementPage;
