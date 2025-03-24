import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.footer
      id="footer"
      className="text-white py-4 bg-dark"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <Container>
        <Row className="justify-content-between">
          <Col md={4} className="mb-4 d-flex flex-column align-items-start">
            <div className="d-flex align-items-center">
              <img src="/images/AvatarRubikBmt.png" alt="Logo" width="40px" />
              <h3 className="ms-2 mb-0">RUBIK BMT</h3>
            </div>
            <p className="mt-2 mb-0">
              Một sản phẩm của{" "}
              <a
                href="https://www.facebook.com/zafus2103/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warning text-decoration-none"
              >
                zafus
              </a>
            </p>
          </Col>
          <Col md={4} className="mb-4 text-md">
            <h4 className="text-warning">Liên hệ</h4>
            <ul className="list-unstyled">
              <li>
                <a
                  href="mailto:rubikbmt47@gmail.com"
                  className="text-white text-decoration-none"
                >
                  Email: rubikbmt47@gmail.com
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <a href="#" className="text-white me-3">
            <i className="bi bi-facebook" style={{ fontSize: "2rem" }}></i>
          </a>
          <a href="#" className="text-white">
            <i className="bi bi-youtube" style={{ fontSize: "2rem" }}></i>
          </a>
        </div>
      </Container>
    </motion.footer>
  );
};

export default Footer;
