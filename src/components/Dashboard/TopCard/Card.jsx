import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Col } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import "./Card.css";

const Item = styled(Paper)(({ theme }) => ({
    // height: 60,
    // lineHeight: '60px',
    padding: "1rem 2rem",
    position: "relative",
  }));

const Card = ({ title, icon }) => {
  
    const Icon = styled(Paper)(({ theme }) => ({
        height: 48,
        width: 48,
        // lineHeight: '60px',
        position: "absolute",
        bottom: "70%",
    }));

  return (
    <Col>
        <Item>
            <Typography style={{ textAlign:"end"}}>{title}</Typography>
            <Typography style={{ textAlign:"center", fontSize: "2rem"}}>9</Typography>
            <Icon>{icon}</Icon>
        </Item>
    </Col>
  )
}

export default Card