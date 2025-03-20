import { Container, Row, Col } from "react-bootstrap";
import styles from "./homepage_style.module.scss";

const AboutSection = () => {
  const teamMembers = [
    {
      name: "Lê Văn Tuấn",
      role: "Nhà sáng lập Học viện Rubik BMT",
      image: "/images/Tuantinhtao.jpg",
      alt: "Tuan tinh tao image",
      facebook: "https://www.facebook.com/tuan.levan.921677",
    },
    {
      name: "Nguyễn Hữu Thông",
      role: "Nhà sáng tạo nội dung hàng đầu Việt Nam về trò chơi trí tuệ",
      image: "/images/thong.jpg",
      alt: "Thong idol image",
      facebook: "https://www.facebook.com/profile.php?id=100009665823378",
    },
  ];

  return (
    <section
      id="about"
      className={`${styles.section} d-flex align-items-center text-center`}
      style={{ background: "linear-gradient(to right, #E6F0FA, #FFE4E1)" }}
    >
      <Container className="my-1">
        <h1 className={`${styles.sectionTitle} mb-5`}>Chúng tôi là</h1>
        <Row>
          {teamMembers.map((member, index) => (
            <Col lg={6} md={6} className={`mb-4 ${styles.customWidth}`} key={index}>
              <a
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.noUnderline}
              >
                <div className="info">
                  <div className={`${styles.circleImage}`}>
                    <img
                      src={member.image}
                      alt={member.alt}
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <h3 className={`${styles.memberName} mt-3`}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
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