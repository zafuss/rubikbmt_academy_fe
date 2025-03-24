import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "../Styles/homepage_style.module.scss";
import CubeViewer from "../RubiksCube/CubeViewer";

const IntroSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" },
  };

  return (
    <motion.section
      id="intro"
      className={`${styles.section} ${styles.introSection}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <CubeViewer />
            </motion.div>
          </Col>
          <Col md={6} className="text-center text-md-start">
            <motion.img
              src="/images/newLogo.png"
              alt="Logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.p
              className={`lead ${styles.leadText}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Học viện có sứ mệnh nâng tầm mạnh mẽ nhận thức và trí tuệ của trẻ
              em Việt Nam. Là môi trường lý tưởng để khai phá tiềm năng của trẻ.
            </motion.p>

            <Button
              className={`${styles.btnPrimary}`}
              variant="light"
              size="lg"
            >
              <a href="#mentors" className="text-dark text-decoration-none">
                Học ngay
              </a>
            </Button>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default IntroSection;
