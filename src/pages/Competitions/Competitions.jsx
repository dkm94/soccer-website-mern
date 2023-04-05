import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import CompetitionCard from '../../components/Cards/Competition/Competition';
import './Competition.css';

import { getRessources } from '../../services/soccerapi_services';

const Competition = () => {
  const [competitions, setCompetitions] = useState([]);
  // const [count, setCount] = useState(null);
  // const [competition, setCompetition] = useState({});
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const containerStyle = {
    padding: '1rem 3rem'
  };

  useEffect(() => {
    async function getDatas() {
      await getRessources('competitions').then((res) => setCompetitions(res));
    }
    getDatas();
    return () => {
      console.log(competitions);
    };
  }, []);

  console.log(competitions);

  // const openModal = async (id) => {
  //   await getRessource("competitions", id).then(res =>  setCompetition(res));
  //   handleShow();
  // }

  return (
    <Col lg={8}>
      <div className="layout-cols">
        <MainContent title={'All competitions'}>
          <Row xs={1} md={2} lg={4} className="g-4" style={containerStyle}>
            {competitions?.map((competition) => (
              <CompetitionCard key={competitions?.id} competition={competition} />
            ))}
          </Row>
        </MainContent>
      </div>
    </Col>
    // <Container className='layout' >
    //   <Row>
    //     <Col lg={8} >
    //       <div className='layout-cols'>
    //         <h1>All the competitions</h1>
    //         <span>Total competitions : {count}</span>
    //         {competitions?.map((competition, index) => (
    //           <Card
    //             key={index}
    //             onClick={() => openModal(competition.id)}
    //             className="text-center"
    //             style={{ marginTop: "1rem" }} >
    //           <Card.Header>{competition.name} / {competition.area.name}</Card.Header>
    //           <Card.Body>
    //             <Container>
    //               <Row className="justify-content-md-center">
    //                 <Col >
    //                   <Card.Text>Current season: from {competition?.currentSeason?.startDate} to {competition?.currentSeason?.endDate}</Card.Text>
    //                 </Col>
    //               </Row>
    //             </Container>
    //           </Card.Body>
    //         </Card>)
    //         )}
    //         <Modal show={show} onHide={handleClose}>?
    //           <Modal.Header closeButton>
    //             <Modal.Title>{competition?.name}</Modal.Title>
    //           </Modal.Header>
    //           <Modal.Body>
    //             <Container>
    //               <Row>
    //                 <Col xs={12} style={{ display: 'flex', justifyContent: 'center'}} >
    //                   <Image src={competition?.emblemUrl} />
    //                 </Col>
    //                 <Col xs={12} style={{ display: 'flex', justifyContent: 'center', margin: "10px"}} >
    //                   Current season: {competition?.currentSeason?.startDate} - {competition?.currentSeason?.endDate}
    //                 </Col>
    //                 <Col>
    //                   Last five seasons : {competition?.seasons?.slice(1,6).map(season => {
    //                     return(
    //                       <Container xs={12} key={season.id} style={{ margin: "10px" }}>
    //                         <Row>
    //                           <Col xs={12}>Start : {season?.startDate}</Col>
    //                           <Col xs={12}>End : {season?.endDate}</Col>
    //                           <Col xs={12}>Winner : {season?.winner?.name}</Col>
    //                         </Row>
    //                       </Container>
    //                     )
    //                   })}
    //                 </Col>
    //               </Row>
    //             </Container>
    //           </Modal.Body>
    //           <Modal.Footer>
    //             <Button variant="secondary" onClick={handleClose}>
    //               Close
    //             </Button>
    //           </Modal.Footer>
    //         </Modal>
    //       </div>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default Competition;
