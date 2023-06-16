/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import CompetitionCard from '../../components/Cards/Competition/Competition';
import { useQuery } from 'react-query';
import './Competition.css';

import { getCompetitions } from '../../services/publicAPIs/soccerapi_services';
import CompetitionsLoader from '../../components/Loaders/Skeletons/Competitions/Loader';
import Message from '../../components/Screens/Message';
import { styled } from '@mui/material';

const StyledContainer = styled('div')({
  padding: '1rem 0'
});

const Competition = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['competitions'],
    queryFn: () => getCompetitions()
  });

  const competitions = data?.competitions;

  return (
    <Col lg={8}>
      <div className="layout-cols">
        <MainContent title={'All competitions'}>
          <StyledContainer>
            {isError && <Message error={error} img={true} />}
            {isLoading && <CompetitionsLoader />}
            {competitions && (
              <Row
                xs={1}
                md={2}
                lg={4}
                className="g-4"
                style={{
                  padding: '1rem 0'
                }}>
                {competitions?.map((competition) => (
                  <CompetitionCard key={competitions?.id} competition={competition} />
                ))}
              </Row>
            )}
          </StyledContainer>
        </MainContent>
      </div>
    </Col>
  );
};

export default Competition;
