/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import CompetitionCard from '../../components/Cards/Competition/Competition';
import { useQuery } from 'react-query';
import './Competition.css';

import { getRessources } from '../../services/soccerapi_services';
import CompetitionsLoader from '../../components/Loaders/Skeletons/Competitions/Loader';

const Competition = () => {
  const {
    isLoading,
    // isError,
    data: competitions
  } = useQuery({
    queryKey: ['competitions'],
    queryFn: () => getRessources('competitions')
  });

  const containerStyle = {
    padding: '1rem 3rem'
  };

  return (
    <Col lg={8}>
      <div className="layout-cols">
        <MainContent title={'All competitions'}>
          <Row xs={1} md={2} lg={4} className="g-4" style={containerStyle}>
            {isLoading && <CompetitionsLoader />}
            {competitions &&
              competitions?.map((competition) => (
                <CompetitionCard key={competitions?.id} competition={competition} />
              ))}
          </Row>
        </MainContent>
      </div>
    </Col>
  );
};

export default Competition;
