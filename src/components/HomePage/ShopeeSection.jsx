// ShopeeSection.jsx
import styles from "./homepage_style.module.scss";
import { Container, Row, Col, Button } from "react-bootstrap";

const ShopeeSection = () => {
  return (
    <section
      id="shopee"
      className={`${styles.section} ${styles.shopeeSection}`}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="p-4">
            <h1>Gian hàng Rubik chính hãng</h1>
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
            <div className={styles.imageContainer}>
              <img
                src="/images/shopee_screen.png"
                alt="BMT Image"
                className={styles.imageContainerImg}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShopeeSection;
