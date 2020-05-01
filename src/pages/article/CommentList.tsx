import React from 'react';
import Comment from './Comment';
import { CommentListProps } from '../../types';

const CommentList: React.FC<CommentListProps> = ({ comments, currentUser }) => {
  if (comments.length === 0) {
    return (
      <>
        No comments here... yet.
      </>
    );
  }

  return (
    <>
      {
        comments.map(comment => (
          <Comment
            comment={comment}
            currentUser={currentUser}
            key={comment._id}
          />
        ))
      }
    </>
  );
};

export default CommentList;
