import styled from "styled-components";
import { Card } from "antd";
import colors from "../constants/colors";

const primaryColor = colors.primary;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.gradient || "#fff"};
  color: ${(props) => (props.gradient ? "#fff" : primaryColor)};
  .ant-card-body {
    padding: 16px;
  }
`;

const StatCard = ({ title, value, gradient }) => {
  return (
    <StyledCard gradient={gradient}>
      <h3 style={{ margin: 0, fontSize: "16px" }}>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>{value}</p>
    </StyledCard>
  );
};

export default StatCard;
