import React from 'react';
import { Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { getArticles } from '../../../queries/public_queries';

const Table = () => {
  const { data, error, isError, isLoading } = useQuery(['articles'], getArticles);
  if (isLoading) {
    return <span>Loading...</span>
  }
 
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <Col xs={8}>
      <ul>
        {data.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </Col>
  )
}

export default Table