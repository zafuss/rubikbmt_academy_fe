const CubeViewer = () => {
  return (
    <iframe
      src="cube.html" // Đặt đúng đường dẫn tới file HTML của bạn
      width="100%"
      height="600px"
      title="Rubik's Cube"
      style={{ border: "none" }}
    />
  );
};

export default CubeViewer;
