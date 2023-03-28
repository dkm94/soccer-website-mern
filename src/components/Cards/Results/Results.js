import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import PauseIcon from "@mui/icons-material/Pause";
import ScheduleIcon from "@mui/icons-material/Schedule";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import "./Results.css";

const Results = ({ match }) => {
  let htScore = match?.score.fullTime.home;
  let atScore = match?.score.fullTime.away;

  const containerStyle = {
    marginTop: "1rem",
    borderRadius: "0",
  };

  const avatarStyle = {
    height: "3.5rem",
    width: "auto",
  };

  const timeStyle = {
    fontSize: "20px",
    fontWeight: "600",
  };

  const handleTime = (date) => {
    let data = new Date(date);
    let hrs = data.getHours();
    let mins = data.getMinutes();
    if (hrs <= 9) hrs = "0" + hrs;
    if (mins < 10) mins = "0" + mins;
    const postTime = hrs + ":" + mins;
    return postTime;
  };

  const getFontWeight = (score) => {
    if (score === Math.max(htScore, atScore)) {
      return "700";
    } else if (htScore === 0 && atScore === 0 && match?.status === "IN_PLAY") {
      return "300";
    } else if (htScore === 0 && atScore === 0 && match?.status === "FINISHED") {
      return "700";
    } else {
      return "300";
    }
  };

  // ajouter un usestate pour les resultats

  const getStatusStyle = (status) => {
    if (status === "IN_PLAY") {
      return "status-inplay";
    } else if (status === "FINISHED") {
      return "status-finished";
    } else if (status === "PAUSED") {
      return "status-paused";
    } else return "status-scheduled";
  };

  const getStatusIcon = (status) => {
    if (status === "IN_PLAY") {
      return <OndemandVideoIcon />;
    } else if (status === "FINISHED") {
      return null;
    } else if (status === "PAUSED") {
      return <PauseIcon />;
    } else if (status === "TIMED") {
      return <ScheduleIcon />;
    } else return null;
  };

  return (
    <Card key={match?.id} className="text-center" style={containerStyle}>
      <Card.Header id="card-header-style">
        {match?.competition.name} - Matchday {match?.matchday}
      </Card.Header>
      <Card.Body style={{ padding: "2rem 1rem" }}>
        <Container>
          <Card.Text style={timeStyle}>{handleTime(match?.utcDate)}</Card.Text>
          <Row className="justify-content-md-center">
            <Col xs={4}>
              <Card.Title style={{ fontWeight: getFontWeight(htScore) }}>
                {match?.score.fullTime.home}
              </Card.Title>
              <Card.Title style={{ fontWeight: getFontWeight(htScore) }}>
                {match?.homeTeam.shortName}
              </Card.Title>
            </Col>
            <Col xs={2}>
              <Card.Title>
                <span>
                  <Image
                    src={match?.area.flag}
                    className="avatar-style"
                    style={avatarStyle}
                  />
                </span>
              </Card.Title>
            </Col>
            <Col xs={4}>
              <Card.Title style={{ fontWeight: getFontWeight(atScore) }}>
                {match?.score.fullTime.away}
              </Card.Title>
              <Card.Title style={{ fontWeight: getFontWeight(atScore) }}>
                {match?.awayTeam.shortName}
              </Card.Title>
            </Col>
          </Row>
        </Container>
        <Card.Text>{!match?.group && null}</Card.Text>
      </Card.Body>
      <Card.Footer className={getStatusStyle(match?.status)}>
        {getStatusIcon(match?.status)} {match?.status}
      </Card.Footer>
    </Card>
  );
};

export default Results;
