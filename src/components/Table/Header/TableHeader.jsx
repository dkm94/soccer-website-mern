import React from 'react';
import { Container } from '@mui/material';
import './TableHeader.css';

const TableHeader = ({ children }) => {
  return <Container className="custom__table-header">{children}</Container>;
};

export default TableHeader;
