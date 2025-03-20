import { Container, Row, Col } from "react-bootstrap";
import styles from "./homepage_style.module.scss";

const MentorsSection = () => {
  const openDialog = (id, name) => {
    console.log(`Opening dialog for ${id} - ${name}`);
  };

  return (
    <section
      id="mentors"
      className={`${styles.section} d-flex align-items-center text-center`}
    >
      <div>
       <div className={styles.headerGradient}>
      <h1
        style={{
          padding: "35px",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        CHỌN 1 HUẤN LUYỆN VIÊN ĐỂ BẮT ĐẦU
      </h1>
    </div>
        <Container fluid> {/* Sử dụng fluid để bỏ giới hạn chiều rộng */}
    <Row className="justify-content-center">
      <Col lg={4} md={6} sm={12} className="mb-4 px-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openDialog("lhp", "Lê Hà Phong");
          }}
          target="_blank"
        >
          <div className={styles.info}>
            <img
              src="/images/mentor_haphong.png"
              alt="Ha Phong image"
              className={`${styles.mentorImage} img-fluid`}
            />
          </div>
        </a>
      </Col>
      <Col lg={4} md={6} sm={12} className="mb-4 px-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openDialog("hhtt", "Hoàng Hà Thuỷ Tiên");
          }}
          target="_blank"
        >
          <div className={styles.info}>
            <img
              src="/images/mentor_thuytien.png"
              alt="Thuy Tien image"
              className={`${styles.mentorImage} img-fluid`}
            />
          </div>
        </a>
      </Col>
      <Col lg={4} md={6} sm={12} className="mb-4 px-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openDialog("nhtp", "Nguyễn Hoàng Thiên Phú");
          }}
          target="_blank"
        >
          <div className={styles.info}>
            <img
              src="/images/mentor_thienphu.png"
              alt="Thien Phu image"
              className={`${styles.mentorImage} img-fluid`}
            />
          </div>
        </a>
      </Col>
    </Row>
  </Container>
      </div>
    </section>
  );
};

export default MentorsSection;