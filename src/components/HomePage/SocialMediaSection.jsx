import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./homepage_style.module.scss";

const SocialMediaSection = () => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/rubikbmtstore",
      icon: "/images/iconFacebook.png",
      title: "Fanpage Rubik BMT",
      alt: "Facebook Icon",
    },
    {
      href: "https://www.facebook.com/groups/274808232920413",
      icon: "/images/iconGroup.png",
      title: "Cộng đồng Rubik BMT",
      alt: "Group Icon",
    },
    {
      href: "https://www.facebook.com/groups/800477228261027",
      icon: "/images/iconClass.png",
      title: "Lớp học Rubik",
      alt: "Class Icon",
    },
    {
      href: "https://www.youtube.com/rubikbmt47",
      icon: "/images/iconYoutube.jpg",
      title: "Youtube",
      alt: "Youtube Icon",
    },
    {
      href: "https://www.tiktok.com/@rubikbmt47",
      icon: "/images/iconTikTok.png",
      title: "TikTok",
      alt: "TikTok Icon",
    },
    {
      href: "https://shopee.vn/rubikbmtstore",
      icon: "/images/iconShopee.png",
      title: "Shopee",
      alt: "Shopee Icon",
    },
  ];

  return (
    <section
      id="social-media"
      className={`${styles.section} d-flex align-items-center`}
      style={{ background: "linear-gradient(to right, #b2d3f5, #e1e8f5)" }}
    >
      <Container fluid className="py-5">
        <div className="text-center mb-5">
          <h1 className={`${styles.sectionTitle} fw-bold`}>Mạng xã hội</h1>
        </div>
        <Row className="text-center g-3">
          {socialLinks.map((link, index) => (
            <Col lg={4} md={4} sm={6} className="mb-4" key={index}>
              <Card className={`${styles.cardStyle} h-100 border-0`}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.noUnderline}
                >
                  <Card.Body className={`${styles.cardBody}`}>
                    <img
                      src={link.icon}
                      className={`${styles.icon} img-fluid`}
                      alt={link.alt}
                    />
                    <div className="flex-grow-1">
                      <h5 className={`${styles.cardTitle} fw-bold mb-0`}>{link.title}</h5>
                    </div>
                  </Card.Body>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SocialMediaSection;