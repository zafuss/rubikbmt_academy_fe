import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import styles from "./homepage_style.module.scss";

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" },
  };

  return (
    <motion.section
      id="social-media"
      className={`d-flex align-items-center ${styles.socialMediaSection}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Container className="py-5">
        <div className="text-center mb-5">
          <motion.h1
            className="fw-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Mạng xã hội
          </motion.h1>
        </div>
        <Row className="text-center">
          {socialLinks.map((link, index) => (
            <Col lg={4} md={4} className="mb-4" key={index}>
              <motion.div
                className={`card h-100 border-0 shadow-sm ${styles.card}`}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                variants={cardVariants}
              >
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
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default SocialMediaSection;
