/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Col } from 'react-bootstrap';
import './SideArticles.css';

// import { getRessources } from '../../../services/dummyapi_services';
import { getArticles } from '../../../services/queries/public_queries';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import { Box, Typography } from '@mui/material';
import MainContent from '../../Wrappers/MainContent/MainContent';
import { useQuery } from 'react-query';

const SideArticles = () => {
  const {
    data: articles,
    error_articles,
    isError_articles,
    isLoading_articles
  } = useQuery(['articles'], getArticles);
  console.log('🚀 ~ file: SideArticles.jsx:21 ~ SideArticles ~ articles:', articles);
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   async function getData() {
  //     await getRessources('comment').then((res) => setComments(res.data));
  //   }
  //   getData();
  //   return () => {
  //     console.log(comments);
  //   };
  // }, []);

  let temp = articles?.slice(-5);

  return (
    <Col lg={4} className="comment-layout">
      <MainContent title={'Last articles'} width={'80%'}>
        <Box sx={{ background: '#fff', boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)' }}>
          <div className="cmt-content">
            {temp &&
              temp.map(({ id, title, author, createdAt }, i) => (
                <ArticleCard key={id} title={title} author={author} date={createdAt} />
              ))}
          </div>
        </Box>
      </MainContent>
    </Col>
  );
};

export default SideArticles;
