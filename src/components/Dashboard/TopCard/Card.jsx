/* eslint-disable no-unused-vars */
import { Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { getUsers } from '../../../services/queries/public_queries';
import { getArticles } from '../../../services/queries/public_queries';
import { getReportedComments } from '../../../services/queries/mods_queries';
import './Card.css';

const Item = styled(Paper)(({ theme }) => ({
  // height: 60,
  // lineHeight: '60px',
  padding: '1rem 2rem',
  position: 'relative'
}));

const Card = ({ title, icon, collection, wip }) => {
  const getResource = {
    users: getUsers,
    articles: getArticles,
    comments: getReportedComments
  };

  const {
    data: cardData,
    error,
    isError,
    isLoading
  } = useQuery([collection], getResource[collection]);

  const Icon = styled(Paper)(({ theme }) => ({
    height: 48,
    width: 48,
    // lineHeight: '60px',
    position: 'absolute',
    bottom: '70%'
  }));

  const total = (name) => {
    switch (name) {
      case 'articles':
        return cardData?.length;
      case 'comments':
        return cardData?.length;
      default:
        return 'Unavailable';
    }
  };

  return (
    <Col style={{ opacity: '90%', boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)' }}>
      <Item className={!collection && `unavailable`}>
        <Typography style={{ textAlign: 'end' }}>{title}</Typography>
        <Typography style={{ textAlign: 'center', fontSize: '2rem' }}>
          {isLoading && collection ? '...' : total(collection)}
        </Typography>
        <Icon>{icon}</Icon>
      </Item>
    </Col>
  );
};

export default Card;
