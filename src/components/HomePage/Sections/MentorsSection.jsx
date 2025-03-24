import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "../Styles/homepage_style.module.scss";

const openDialog = (id, name) => {};

const MentorsSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" },
  };

  return (
    <motion.section
      id="mentors"
      className={`${styles.section} ${styles.mentorsSection}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className={styles.headerWrapper}>
        <h1>CHỌN 1 HUẤN LUYỆN VIÊN ĐỂ BẮT ĐẦU</h1>
      </div>
      <Container>
        <Row className="justify-content-center">
          {[
            {
              id: "lhp",
              name: "Lê Hà Phong",
              img: "/images/mentor_haphong.png",
            },
            {
              id: "hhtt",
              name: "Hoàng Hà Thuỷ Tiên",
              img: "/images/mentor_thuytien.png",
            },
            {
              id: "nhtp",
              name: "Nguyễn Hoàng Thiên Phú",
              img: "/images/mentor_thienphu.png",
            },
          ].map((mentor, index) => (
            <Col lg={4} md={6} sm={12} className="mb-4" key={index}>
              <div className={styles.info}>
                <img
                  src={mentor.img}
                  alt={`${mentor.name} image`}
                  className={styles.mentorImage}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default MentorsSection;
