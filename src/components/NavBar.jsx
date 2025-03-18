// src/components/Navbar.js
import React from "react";

import "./navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-0">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/images/AvatarRubikBmt.png"
            alt="Logo"
            width="30"
            height="30"
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
            <li className="nav-item">
              <Link className="nav-link" to="/#intro">
                Giới thiệu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#mentors">
                Học Rubik siêu cấp
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#social-media">
                Mạng xã hội
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#shopee">
                Mua hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#ranking">
                Bảng xếp hạng giải đấu Back To School
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#blog">
                Bài viết
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#footer">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
