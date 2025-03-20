import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./homepage_style.module.scss";
import MentorsSection from "./MentorsSection";
import SocialMediaSection from "./SocialMediaSection";
import ShopeeSection from "./ShopeeSection";
import AboutSection from "./AboutSection";

const IntroSection = () => {
  return (
    <div>
      <section id="intro" className={`${styles.section} ${styles.introSection}`}>
        <Container fluid className="mt-3">
          <br />
          <Row className="align-items-center">
            {/* Cột bên trái */}
            <Col md={6} className="text-center">
              {/* <img
                src="/images/rubik_cube.png"
                alt="Rubik Cube"
                className={`${styles.rubikImage} img-fluid`}
              /> */}
            </Col>

            {/* Cột bên phải */}
            <Col md={6} className="d-flex flex-column">
              <img
                src="/images/newLogo.png"
                alt="Logo"
                className={`${styles.logoImage} img-fluid`}
              />
              <p className={`lead ${styles.leadText}`}>
                Học viện có sứ mệnh nâng tầm mạnh mẽ nhận thức và trí tuệ của trẻ
                em Việt Nam. Là môi trường lý tưởng để khai phá tiềm năng của trẻ.
              </p>
              <Button
                className={`${styles.btnPrimary} ${styles.customButton}`} // Thêm lớp tùy chỉnh
                variant="light"
                size="sm" // Giảm kích thước nút (tùy chọn: 'sm', 'lg')
              >
                <a href="#mentors" className="text-dark text-decoration-none">
                  Học ngay
                </a>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <MentorsSection />
      <SocialMediaSection />
      <ShopeeSection />
      <AboutSection />
    </div>
  );
};

export default IntroSection;