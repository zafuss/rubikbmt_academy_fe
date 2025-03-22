import { Row, Col } from "antd";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import Chart from "../components/Chart";
import { motion } from "framer-motion";

const Dashboard = () => {
  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
  ];

  const data = Array.from({ length: 10 }, (_, index) => ({
    key: index,
    name: `Người dùng ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 2 === 0 ? "Admin" : "Giáo viên",
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Row gutter={[16, 16]}>
        {[
          {
            title: "Tổng doanh thu",
            value: "$12,345",
            gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          },
          { title: "Người dùng mới", value: "1,234" },
          { title: "Đơn hàng", value: "567" },
          { title: "Lợi nhuận", value: "$3,456" },
        ].map((card, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <StatCard
                title={card.title}
                value={card.value}
                gradient={card.gradient}
              />
            </motion.div>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {[1, 2].map((_, index) => (
          <Col xs={24} md={12} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.2 }}
            >
              <Chart />
            </motion.div>
          </Col>
        ))}
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col xs={24}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <DataTable columns={columns} data={data} />
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default Dashboard;
