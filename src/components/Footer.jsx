import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="text-white py-4 bg-dark">
      <div className="container">
        <div className="row">
          <div className="row d-flex justify-content-between">
            {/* Logo */}
            <div className="col-md-4 mb-4 d-flex align-items-center">
              <img src="/images/AvatarRubikBmt.png" alt="Logo" width="40px" />
              <h3 className="ms-2 mb-0">RUBIK BMT</h3>
            </div>

            {/* Liên hệ */}
            <div className="col-md-4 mb-4">
              <h4 className="text-warning">Liên hệ</h4>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="mailto:rubikbmt47@gmail.com"
                    className="text-white text-decoration-none"
                  >
                    Email: rubikbmt47@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="text-center mt-3">
          <a href="#" className="text-white me-3">
            <i className="bi bi-facebook" style={{ fontSize: "2rem" }}></i>
          </a>
          <a href="#" className="text-white">
            <i className="bi bi-youtube" style={{ fontSize: "2rem" }}></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
