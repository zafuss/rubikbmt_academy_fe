// SocialMediaSection.jsx
import styles from "./homepage_style.module.scss";
import { Container, Row, Col } from "react-bootstrap";

const SocialMediaSection = () => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/rubikbmtstore",
      title: "Fanpage Rubik BMT",
      icon: "/images/iconFacebook.png",
    },
    {
      href: "https://www.facebook.com/groups/274808232920413",
      title: "Cộng đồng Rubik BMT",
      icon: "/images/iconGroup.png",
    },
    {
      href: "https://www.facebook.com/groups/800477228261027",
      title: "Lớp học Rubik",
      icon: "/images/iconClass.png",
    },
    {
      href: "https://www.youtube.com/rubikbmt47",
      title: "Youtube",
      icon: "/images/iconYoutube.jpg",
    },
    {
      href: "https://www.tiktok.com/@rubikbmt47",
      title: "TikTok",
      icon: "/images/iconTikTok.png",
    },
    {
      href: "https://shopee.vn/rubikbmtstore",
      title: "Shopee",
      icon: "/images/iconShopee.png",
    },
  ];

  return (
    <section
      id="social-media"
      className={`d-flex align-items-center ${styles.socialMediaSection}`}
    >
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Mạng xã hội</h1>
        </div>
        <Row className="text-center">
          {socialLinks.map((link, index) => (
            <Col lg={4} md={4} className="mb-4" key={index}>
              <div className={`card h-100 border-0 shadow-sm ${styles.card}`}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <div className="card-body d-flex align-items-center">
                    <img
                      src={link.icon}
                      className={`me-3 ${styles.icon}`}
                      alt={`Icon ${index + 1}`}
                    />
                    <div>
                      <h5 className="card-title fw-bold">{link.title}</h5>
                    </div>
                  </div>
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SocialMediaSection;
