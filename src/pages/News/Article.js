import React from 'react';
import { Image } from 'react-bootstrap';

const Article = ({ article }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ textAlign: 'end' }}>
        <span>Written on {article?.createdAt} </span>
      </div>
      <Image src={article?.img} width={'100%'} />
      <h1 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{article?.title}</h1>
    </div>
  );
};

export default Article;
