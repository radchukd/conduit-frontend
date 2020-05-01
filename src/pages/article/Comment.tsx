import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_COMMENT } from '../../graphql';
import { CommentProps } from '../../types';
import Avatar from '../../assets/avatar.jpg';

const Comment: React.FC<CommentProps> = ({ comment, currentUser }) => {
  const isAuthor = currentUser && currentUser.username === comment.author.username;

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { _id: comment._id },
    onCompleted: () => window.location.reload(),
  });

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/user/${comment.author.username}`}
          className="comment-author"
        >
          <img
            src={comment.author.image ? `data:image/png;base64,${comment.author.image}` : Avatar}
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link
          to={`/user/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        {isAuthor &&
          <span className="mod-options">
            <button
              className="ion-trash-a"
              style={{ all: 'unset' }}
              aria-label="Delete comment"
              type="button"
              onClick={() => deleteComment()}
            />
          </span>
        }
      </div>
    </div>
  );
};

export default Comment;
