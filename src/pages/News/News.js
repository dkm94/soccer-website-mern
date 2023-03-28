import React from "react";
import { Col } from "react-bootstrap";
import MainContent from "../../components/Wrappers/MainContent/MainContent";
import news from "../../seeds/news";
import Article from "./Article";
import "./News.css";

const News = () => {
  const containerStyle = {
    padding: "1rem 3rem",
  };

  return (
    <Col lg={8}>
      <div className="layout-cols">
        <MainContent title={"Latest articles"}>
          <div style={containerStyle}>
            {news?.map((article, i) => (
              <Article key={i} article={article} />
            ))}
          </div>
        </MainContent>
      </div>
    </Col>
  );
};

export default News;
