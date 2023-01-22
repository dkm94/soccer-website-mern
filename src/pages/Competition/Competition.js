import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button, Image } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import './Competition.css';

import { getCount, getRessources, getRessource } from '../../services/soccerapi_services';

const Competition = () => {
  const [competitions, setCompetitions] = useState([]);
  const [count, setCount] = useState(null);
  const [competition, setCompetition] = useState({});
  const [show, setShow] = useState(false);
  const [result, setResult] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function getDatas(){
    getRessources("competitions").then(res =>  setCompetitions(res));
  }
    getDatas();
      return () => {console.log(competitions)}
  }, [])

  useEffect(() => {
    async function getDatas(){
      getCount("competitions").then(res =>  setCount(res));
  }
    getDatas();
      return () => {console.log(count)}
  }, [])

  const openModal = async (id) => {
    await getRessource("competitions", id).then(res =>  setCompetition(res));
    handleShow();
  }

  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <Col lg={8} >
          <div className='layout-cols'>
            <h1>All the competitions</h1>
            <span>Total competitions : {count}</span>
            {competitions?.map((competition, index) => (
              <Card 
                key={index} 
                onClick={() => openModal(competition.id)}
                className="text-center" 
                style={{ marginTop: "1rem" }} >
              <Card.Header>{competition.name} / {competition.area.name}</Card.Header>
              <Card.Body>
                <Container>
                  <Row className="justify-content-md-center">
                    <Col >
                      <Card.Text>Current season: from {competition?.currentSeason?.startDate} to {competition?.currentSeason?.endDate}</Card.Text>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>)
            )}
            <Modal show={show} onHide={handleClose}>?
              <Modal.Header closeButton>
                <Modal.Title>{competition?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col xs={12} style={{ display: 'flex', justifyContent: 'center'}} >
                      <Image src={competition?.emblemUrl} />
                    </Col>
                    <Col xs={12} style={{ display: 'flex', justifyContent: 'center', margin: "10px"}} >
                      Current season: {competition?.currentSeason?.startDate} - {competition?.currentSeason?.endDate}
                    </Col>
                    <Col>
                      Last five seasons : {competition?.seasons?.slice(1,6).map(season => {
                        return(
                          <Container xs={12} key={season.id} style={{ margin: "10px" }}>
                            <Row>
                              <Col xs={12}>Start : {season?.startDate}</Col>
                              <Col xs={12}>End : {season?.endDate}</Col>
                              <Col xs={12}>Winner : {season?.winner?.name}</Col>
                            </Row>
                          </Container>
                        )
                      })}
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Competition