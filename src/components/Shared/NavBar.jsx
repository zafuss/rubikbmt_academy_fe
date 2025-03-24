import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./navbar.css";

const NavBar = () => {
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, color: "#ffd700", transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/images/AvatarRubikBmt.png"
            alt="Logo"
            width="40"
            height="40"
            className="nav-logo d-inline-block align-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {[
              { to: "/#intro", text: "Giới thiệu" },
              { to: "/#mentors", text: "Học Rubik siêu cấp" },
              { to: "/#social-media", text: "Mạng xã hội" },
              { to: "/#shopee", text: "Mua hàng" },
              { to: "/#footer", text: "Liên hệ" },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="nav-item"
                whileHover="hover"
                variants={linkVariants}
              >
                <Link className="nav-link" to={item.to}>
                  {item.text}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
