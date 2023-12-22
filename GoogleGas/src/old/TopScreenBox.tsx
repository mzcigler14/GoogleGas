import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const TopScreenBox = ({ children }: Props) => {
  const outStyle = {
    width: "100vh", // Adjust the width as needed
    height: "100vh", // 25% of the viewport height
    padding: "20px",
  };
  const boxStyle = {
    width: "50vh", // Adjust the width as needed
    height: "25vh", // 25% of the viewport height
    padding: "10px",
    backgroundColor: "#3498db",
    margin: "auto",
  };

  return (
    <div style={outStyle}>
      <div style={boxStyle}>{children}</div>
    </div>
  );
};

export default TopScreenBox;
