import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "./homepage_style.module.scss";

const AboutSection = () => {
  const founders = [
    {
      name: "Lê Văn Tuấn",
      title: "Nhà sáng lập Học viện Rubik BMT",
      image: "/images/Tuantinhtao.jpg",
      link: "https://www.facebook.com/tuan.levan.921677",
    },
    {
      name: "Nguyễn Hữu Thông",
      title: "Nhà sáng tạo nội dung hàng đầu Việt Nam về trò chơi trí tuệ",
      image: "/images/thong.jpg",
      link: "https://www.facebook.com/profile.php?id=100009665823378",
    },
  ];

  const founderVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
    hover: { scale: 1.05 },
  };

  return (
    <motion.section
      id="about"
      className={`d-flex align-items-center text-center ${styles.aboutSection}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Container className="my-5">
        <motion.h1
          className="mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Chúng tôi là
        </motion.h1>
        <Row>
          {founders.map((founder, index) => (
            <Col lg={6} md={6} className="mb-4" key={index}>
              <motion.a
                href={founder.link}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                variants={founderVariants}
              >
                <div className={styles.info}>
                  <div className={styles.circleImage}>
                    <img
                      src={founder.image}
                      alt={`${founder.name} image`}
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <h3 className="mt-4">{founder.name}</h3>
                  <p>{founder.title}</p>
                </div>
              </motion.a>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default AboutSection;
