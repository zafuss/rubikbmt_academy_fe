// AboutSection.jsx
import styles from "./homepage_style.module.scss";
import { Container, Row, Col } from "react-bootstrap";

const AboutSection = () => {
  const founders = [
    {
      name: "Lê Văn Tuấn",
      title: "Nhà sáng lập Học viện Rubik BMT",
      image: "/images/Tuantinhtao.jpg",
      link: "https://www.facebook.com/tuan.levan.921677",
    },
    {
      name: "Nguyễn Hữu Thông",
      title: "Nhà sáng tạo nội dung hàng đầu Việt Nam về trò chơi trí tuệ",
      image: "/images/thong.jpg",
      link: "https://www.facebook.com/profile.php?id=100009665823378",
    },
  ];

  return (
    <section
      id="about"
      className={`d-flex align-items-center text-center ${styles.aboutSection}`}
    >
      <Container className="my-5">
        <h1 className="mb-5">Chúng tôi là</h1>
        <Row>
          {founders.map((founder, index) => (
            <Col lg={6} md={6} className="mb-4" key={index}>
              <a href={founder.link} target="_blank" rel="noopener noreferrer">
                <div className={styles.info}>
                  <div className={styles.circleImage}>
                    <img
                      src={founder.image}
                      alt={`${founder.name} image`}
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <h3 className="mt-4">{founder.name}</h3>
                  <p>{founder.title}</p>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
