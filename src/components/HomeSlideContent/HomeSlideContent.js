import React from "react";
import { Button } from "react-bootstrap";

const HomeSlideContent = ({ key, style, title, content }) => {
  return (
    <div className="slider-content" style={style}>
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "700",
          fontFamily: "'Adamina', serif",
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: "1.5rem" }}>{content}</p>
      <div>
        <Button style={{ backgroundColor: "#C40808", border: "none" }}>
          Read the article
        </Button>
      </div>
    </div>
  );
};

export default HomeSlideContent;
