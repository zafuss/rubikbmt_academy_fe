import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "../Styles/homepage_style.module.scss";

const ShopeeSection = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" },
  };

  return (
    <motion.section
      id="shopee"
      className={`${styles.section} ${styles.shopeeSection}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="p-4">
            <motion.h1 variants={textVariants}>
              Gian hàng Rubik chính hãng
            </motion.h1>

            <Button variant="light" size="lg">
              <a
                href="https://shopee.vn/rubikbmtstore"
                className="text-dark text-decoration-none"
              >
                Mua Rubik tại đây
              </a>
            </Button>
          </Col>
          <Col md={6}>
            <motion.div
              className={styles.imageContainer}
              variants={imageVariants}
            >
              <img
                src="/images/shopee_screen.png"
                alt="BMT Image"
                className={styles.imageContainerImg}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default ShopeeSection;
