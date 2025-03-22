// MentorsSection.jsx
import styles from "./homepage_style.module.scss";
import { Container, Row, Col } from "react-bootstrap";

const openDialog = (id, name) => {};

const MentorsSection = () => {
  return (
    <section
      id="mentors"
      className={`${styles.section} ${styles.mentorsSection}`}
    >
      <div className={styles.headerWrapper}>
        <h1>CHỌN 1 HUẤN LUYỆN VIÊN ĐỂ BẮT ĐẦU</h1>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col lg={4} md={6} sm={12} className="mb-4">
            <a onClick={() => openDialog("lhp", "Lê Hà Phong")}>
              <div className={styles.info}>
                <img
                  src="/images/mentor_haphong.png"
                  alt="Ha Phong image"
                  className={styles.mentorImage}
                />
              </div>
            </a>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-4">
            <a onClick={() => openDialog("hhtt", "Hoàng Hà Thuỷ Tiên")}>
              <div className={styles.info}>
                <img
                  src="/images/mentor_thuytien.png"
                  alt="Thuy Tien image"
                  className={styles.mentorImage}
                />
              </div>
            </a>
          </Col>
          <Col lg={4} md={6} sm={12} className="mb-4">
            <a onClick={() => openDialog("nhtp", "Nguyễn Hoàng Thiên Phú")}>
              <div className={styles.info}>
                <img
                  src="/images/mentor_thienphu.png"
                  alt="Thien Phu image"
                  className={styles.mentorImage}
                />
              </div>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MentorsSection;
