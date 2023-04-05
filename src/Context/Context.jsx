import React, { useState, useEffect, createContext } from 'react';
import { getRessources } from '../services/dummyapi_services';

export const CommentsContext = createContext();
const CommentsContextProvider = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getRessources('comment').then((res) => setComments(res.data));
  }, [comments]);

  return (
    <CommentsContext.Provider
      value={{
        comments: comments
      }}>
      {props.children}
    </CommentsContext.Provider>
  );
};
export default CommentsContextProvider;
