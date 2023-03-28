import React from 'react';
import { Col } from 'react-bootstrap';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import './Teams.css';

const Teams = () => {
  const containerStyle = {
    padding: '1rem 3rem'
  };
  return (
    <Col lg={8}>
      <div className="layout-cols">
        <MainContent title={'All teams'}>
          <div style={containerStyle}></div>
        </MainContent>
      </div>
    </Col>
  );
};

export default Teams;
