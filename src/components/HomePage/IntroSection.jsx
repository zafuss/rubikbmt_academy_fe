import { useEffect } from "react";
import styles from "./homepage_style.module.scss"; // Import SCSS module
import { Container, Row, Col, Button } from "react-bootstrap"; // Import Bootstrap components

const IntroSection = () => {
  return (
    <section id="intro" className={`${styles.section} ${styles.introSection}`}>
      <Container className="mt-3">
        <br />
        <Row className="align-items-center">
          {/* Cột bên trái */}
          <Col md={6}>
            {/* <div className="full-height" id="container"></div> */}
            {/* <CubePage /> */}
          </Col>

          {/* Cột bên phải */}
          <Col md={6} className="text-center text-md-start">
            <img src="/images/newLogo.png" alt="Logo" />
            <p className={`lead ${styles.leadText}`}>
              Học viện có sứ mệnh nâng tầm mạnh mẽ nhận thức và trí tuệ của trẻ
              em Việt Nam. Là môi trường lý tưởng để khai phá tiềm năng của trẻ.
            </p>
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
    </section>
  );
};

export default IntroSection;
