import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Area.css';

import { getRessources } from '../../services/soccerapi_services';

const Area = () => {
  const [areas, setAreas] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
}

  useEffect(() => {
    async function getDatas(){
      await getRessources("areas").then(res => setAreas(res));
    }
    getDatas();
      return () => {console.log(areas)}
  }, [])
  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <Col xs={8} >
          <div className='layout-cols'>
            <h1>Countries and areas</h1>
            <Container>
              <Row>
                <Col xs={6}>
                  <SearchBar
                  className="search__input"
                  type="text"
                  placeholder="Search a country"
                  name="searchbar"
                  value={searchValue}
                  onChange={handleSearch}
                  />
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                {areas
                .filter((area) => {
                  return area.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
              })
                .map(area => (
                  <Col xs={4} >
                    <Card key={area.id} className="text-center" style={{ marginTop: "1rem" }} >
                      <ListGroup variant="flush">
                        <ListGroup.Item>{area.name}</ListGroup.Item>
                        <Card.Header>Area: {area.parentArea}</Card.Header>
                      </ListGroup>
                    </Card>
                  </Col>
              ))}
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Area