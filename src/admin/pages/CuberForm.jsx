import React, { useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./CuberForm.css";

const mockData = {
  parent: { name: "Nguyễn Văn A", phone: "0987654321", address: "Hà Nội" },
  student: { name: "Nguyễn Văn B", birthYear: 2012, path: "Speedcubing" },
  skills: {
    "Tập trung": 80,
    "Ghi nhớ": 90,
    "Kiên trì": 75,
    "Phản xạ": 85,
    "Khéo léo": 70,
    "Sáng tạo": 60,
  },
  cubeSkills: {
    Cross: 95,
    F2L: 90,
    OLL: 85,
    PLL: 80,
    "Finger trick": 88,
    "Look ahead": 78,
  },
  schedule: [
    "Giới thiệu cơ bản",
    "Cross nâng cao",
    "F2L cơ bản",
    "F2L nâng cao",
    "OLL cơ bản",
    "OLL nâng cao",
    "PLL cơ bản",
    "PLL nâng cao",
    "Look ahead",
    "Kiểm soát thời gian",
    "Giải đấu thử nghiệm",
    "Tổng kết & định hướng",
  ],
};

const CuberForm = () => {
  const componentRef = useRef(null);

  useEffect(() => {
    if (componentRef.current) {
      console.log("Component ref is set:", componentRef.current);
    } else {
      console.log("Component ref is NOT set");
    }
  }, []);

  const handleExportPDF = () => {
    const input = componentRef.current;
    if (!input) {
      console.error("No content to export: componentRef.current is null");
      return;
    }
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cuber-form.pdf");
    });
  };

  const handleExportPNG = () => {
    const input = componentRef.current;
    if (!input) {
      console.error("No content to export: componentRef.current is null");
      return;
    }
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "cuber-form.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="cuberFormScope">
      <div className="action-buttons">
        <button onClick={handleExportPDF}>Xuất PDF</button>
        <button onClick={handleExportPNG}>Xuất PNG</button>
      </div>
      <div ref={componentRef} className="a4-page">
        <div className="parent">
          <div className="cuber-container div1">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "48%" }}>
                <h2>Phụ huynh</h2>
                <div>
                  <label>Họ và tên:</label> {mockData.parent.name}
                </div>
                <div>
                  <label>Số điện thoại:</label> {mockData.parent.phone}
                </div>
                <div>
                  <label>Địa chỉ:</label> {mockData.parent.address}
                </div>
              </div>
              <div style={{ width: "48%" }}>
                <h2>Học viên</h2>
                <div>
                  <label>Họ và tên:</label> {mockData.student.name}
                </div>
                <div>
                  <label>Năm sinh:</label> {mockData.student.birthYear}
                </div>
                <div>
                  <label>Lộ trình:</label> {mockData.student.path}
                </div>
              </div>
            </div>
          </div>
          <div className="cuber-container div2">
            <h2>Kỹ năng</h2>
            <div className="skills-grid">
              {Object.entries(mockData.skills).map(
                ([skill, percent], index) => (
                  <React.Fragment key={index}>
                    <div className="grid-item">{skill}</div>
                    <div
                      className="progress-bar"
                      style={{ width: `${percent}%` }}
                    ></div>
                    <div className="percent">{percent}%</div>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
          <div className="cuber-container div3">
            <h2>Cube Skills</h2>
            <div className="cube-skills-grid">
              {Object.entries(mockData.cubeSkills).map(
                ([skill, percent], index) => (
                  <React.Fragment key={index}>
                    <div className="grid-item">{skill}</div>
                    <div
                      className="progress-bar"
                      style={{ width: `${percent}%` }}
                    ></div>
                    <div className="percent">{percent}%</div>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
          <div className="cuber-container div5 right-column">
            <h3>Các hạng mục thi đấu quốc tế (WCA)</h3>
            <div className="items">
              {[
                "Rubik một tay",
                "Rubik bịt mắt",
                "Rubik tối ưu",
                "----------------",
                "Rubik 2x2",
                "Rubik 3x3",
                "Rubik 4x4",
                "Rubik 5x5",
                "Rubik 6x6",
                "Rubik 7x7",
                "----------------",
                "Rubik Clock",
                "Rubik Skewb",
                "Rubik Square1",
                "Rubik Pyraminx",
                "Rubik Megaminx",
              ].map((item, index) => (
                <div
                  key={index}
                  className={item === "----------------" ? "divider" : "item"}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="cuber-container div6">
            <h2>Lộ Trình</h2>
            <div className="schedule">
              {mockData.schedule.map((lesson, i) => (
                <div key={i} className="grid-item">
                  Buổi {i + 1}: {lesson}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuberForm;
