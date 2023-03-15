import React from 'react';
import { Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '../../../components/Dashboard/TopCard/Card';
import Table from '../../../components/Dashboard/Table/Table';

const Main = ({ cards, drawerWidth }) => {
  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, display: "grid", gap: "2rem", mt: "2rem" }}
      >
        <Row>
          {cards.map((card, i) => {
            const smallCard = card.size === "sm" && <Card key={i} title={card.title} icon={card.icon} />
            return smallCard;
          })}
        </Row>
        <Row>
          <Table />
          {cards.map((card, i) => {
            const largeCard = card.size === "lg" && <Card key={i} title={card.title} icon={card.icon} />
            return largeCard;
          })}
        </Row>
      </Box>
  )
}

export default Main