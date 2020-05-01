import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_COMMENT } from '../../graphql';
import { CommentInputProps } from '../../types';
import Avatar from '../../assets/avatar.jpg';

const CommentInput: FC<CommentInputProps> = ({ slug, currentUser }) => {
  const [body, changeBody] = useState('');

  const [submitComment] = useMutation(CREATE_COMMENT, {
    variables: { input: { slug, body } },
    onCompleted: () => window.location.reload(),
  });

  return (
    <form className="card comment-form" onSubmit={e => { e.preventDefault(); submitComment(); }}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={e => changeBody(e.target.value)}
          rows={3}
        />
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image ? `data:image/png;base64,${currentUser.image}` : Avatar}
          className="comment-author-img"
          alt={currentUser.username}
        />
        <button
          className="btn btn-sm btn-primary"
          type="submit"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
