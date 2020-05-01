import React from 'react';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { CommentSectionProps } from '../../types';

const CommentSection: React.FC<CommentSectionProps> = ({ comments, currentUser, slug }) => {
  if (currentUser._id) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <CommentInput slug={slug} currentUser={currentUser} />

        <CommentList comments={comments} currentUser={currentUser} />
      </div>
    );
  }

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <p>
        <Link to="/login">Log in</Link>
        &nbsp;or&nbsp;
        <Link to="/signup">Sign up</Link>
        &nbsp;to add comments on this article.
      </p>

      <CommentList
        comments={comments}
        currentUser={currentUser}
      />
    </div>
  );
};

export default CommentSection;
