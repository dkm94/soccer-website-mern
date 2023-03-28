import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";
import competitionSeeds from "../../../seeds/competitions";
import { useNavigate } from "react-router-dom";
import "./Competitions.css";

const Competition = ({ competition }) => {
  const titleStyle = {
    fontSize: "1rem",
    fontWeight: 600,
  };

  let navigate = useNavigate();
  const [season, setSeason] = useState(2022);

  return (
    <Col className="cpt-card-style">
      <Card
        style={{ borderRadius: "0" }}
        onClick={() => navigate(`/competitions/${competition?.id}/teams`)}
      >
        <Card.Img
          variant="top"
          style={{ height: "11rem", padding: "1.3rem" }}
          src={competition?.emblem}
        />
        <Card.Body>
          <Card.Title className="text-center" style={titleStyle}>
            {competition?.name}
          </Card.Title>
          <Card.Text className="text-center">
            {competition?.area.name}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Competition;
