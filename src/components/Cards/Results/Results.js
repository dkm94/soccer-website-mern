import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import PauseIcon from '@mui/icons-material/Pause';
import ScheduleIcon from '@mui/icons-material/Schedule';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import "./Results.css";

const Results = ({ match }) => {

    let htScore = match?.score.fullTime.homeTeam
    let atScore = match?.score.fullTime.awayTeam;

    const containerStyle = {
        marginTop: "1rem",
        borderRadius: "0"
    }

    const avatarStyle = {
        height: "3.5rem",
        width: "auto"
      };

    const getFontWeight = (score) => {
        if(score === Math.max(htScore, atScore)){
             return "700";	
         } else if(htScore === 0 && atScore === 0 && match?.status === "IN_PLAY"){
            return "300"
         } else if(htScore === 0 && atScore === 0 && match?.status === "FINISHED"){
            return "700"
         } else	{
            return "300";
         }
     }

     // ajouter un usestate pour les resultats

     const getStatusStyle = (status) => {
        if(status === "IN_PLAY"){
            return "status-inplay"
        } else if(status === "FINISHED"){
            return "status-finished"
        } else if(status === "PAUSED"){
            return "status-paused"
        } else return "status-scheduled"
     }

     const getStatusIcon = (status) => {
        if(status === "IN_PLAY"){
            return <OndemandVideoIcon />
        } else if(status === "FINISHED"){
            return null
        } else if(status === "PAUSED"){
            return <PauseIcon />
        } else if(status === "SCHEDULED"){
            return <ScheduleIcon />
        } else return null
     }

  return (
    <Card key={match?.id} className="text-center" style={containerStyle} >
        <Card.Header id="card-header-style" >{match?.competition.name}</Card.Header>
        <Card.Body style={{ padding: "2rem 1rem" }}>
            <Container>
                <Row className="justify-content-md-center">
                <Col xs={4}>
                    <Card.Title style={{ fontWeight: getFontWeight(htScore) }}>{match?.score.fullTime.homeTeam}</Card.Title>
                    <Card.Title style={{ fontWeight: getFontWeight(htScore) }}>{match?.homeTeam.name}</Card.Title>
                </Col>
                <Col xs={2}>
                    <Card.Title>
                        <span>
                            <Image src={match?.competition.area.ensignUrl} className="avatar-style" style={avatarStyle} />    
                        </span>
                    </Card.Title>
                
                </Col>
                <Col xs={4}>
                    <Card.Title style={{ fontWeight: getFontWeight(atScore) }}>{match?.score.fullTime.awayTeam}</Card.Title>
                    <Card.Title style={{ fontWeight: getFontWeight(atScore) }}>{match?.awayTeam.name}</Card.Title>
                </Col>
                </Row>
            </Container>
            <Card.Text>
                {match?.group}
            </Card.Text>
        </Card.Body>
        <Card.Footer className={getStatusStyle(match?.status)} >{getStatusIcon(match?.status)} {match?.status}</Card.Footer>
    </Card>
  )
}

export default Results