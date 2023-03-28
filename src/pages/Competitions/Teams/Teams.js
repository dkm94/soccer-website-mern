import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import MainContent from "../../../components/Wrappers/MainContent/MainContent";
import { getMatchesByCompetition } from "../../../services/soccerapi_services";
import imgMatch from "../../../images/20230206_200007-01.jpeg";
import imgTeams from "../../../images/C71M9002-01.jpeg";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./Teams.css";

const Teams = () => {
  let navigate = useNavigate();

  const containerStyle = {
    padding: "1rem 3rem",
  };

  const childrenStyle = {
    position: "absolute",
    zIndex: 10000,
    background: "rgba(255, 255, 255, 0.5)",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    fontSize: "2rem",
    textTransform: "uppercase",
    fontWeight: 800,
  };

  const [competition, setCompetition] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    async function getDatas() {
      await getMatchesByCompetition("competitions", id).then((res) => {
        console.log(res);
        setCompetition(res);
      });
    }
    getDatas();
    return () => {
      console.log(competition);
    };
  }, []);

  console.log("League", competition?.competition);

  return (
    <Col lg={8}>
      <div className="layout-cols">
        <MainContent title={`${competition?.competition?.name} teams`}>
          <Row xs={1} md={2} lg={4} className="g-4" style={containerStyle}>
            <div style={{ width: "100%", textAlign: "end" }}>
              <Button variant="outline-secondary" size="sm">
                <KeyboardBackspaceIcon fontSize="small" /> Go back to
                competitions
              </Button>
            </div>
            <div className="cpt-card-style" style={{ width: "100%" }}>
              <Col
                lg={6}
                style={{ position: "relative", padding: "2rem" }}
                onClick={() =>
                  navigate(
                    `/competitions/${competition?.competition?.code}/matches`
                  )
                }
              >
                <span style={childrenStyle}>Matches</span>
                <Image src={imgMatch} fluid />
              </Col>
              <Col
                lg={6}
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  padding: "2rem",
                }}
              >
                <span style={childrenStyle}>Teams</span>
                <Image src={imgTeams} fluid />
              </Col>
            </div>
          </Row>
        </MainContent>
      </div>
    </Col>
  );
};

export default Teams;
