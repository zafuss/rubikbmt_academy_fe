import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./homepage_style.module.scss";

const ShopeeSection = () => {
  return (
    <section
      id="shopee"
      className={`${styles.section} text-center`}
      style={{ background: "linear-gradient(to right, #FAD2A5, #FF9999)" }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Cột bên trái - Text và Button */}
          <Col md={6} className="p-4">
            <h1>Gian hàng Rubik chính hãng</h1>
            <Button variant="light" size="lg" className={styles.btnPrimary}>
              <a
                href="https://shopee.vn/rubikbmtstore"
                className="text-dark text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mua Rubik tại đây
              </a>
            </Button>
          </Col>

          {/* Cột bên phải - Hình ảnh */}
          <Col md={6} className="py-4">
            <div className="image-container">
              <img
                src="/images/shopee_screen.png"
                alt="BMT Image"
                className={`${styles.imageContainer} img-fluid`}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShopeeSection;