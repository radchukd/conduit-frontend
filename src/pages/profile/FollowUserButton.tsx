import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../graphql';
import { FollowUserButtonProps } from '../../types';

const FollowUserButton: FC<FollowUserButtonProps> = ({ user }) => {
  const [following, changeFollowing] = useState(user.following);
  const buttonClass = following
    ? 'btn btn-sm action-btn btn-secondary'
    : 'btn btn-sm action-btn btn-outline-secondary';

  const [follow] = useMutation(FOLLOW_USER, {
    variables: { username: user.username },
    onCompleted: () => changeFollowing(true),
  });
  const [unfollow] = useMutation(UNFOLLOW_USER, {
    variables: { username: user.username },
    onCompleted: () => changeFollowing(false),
  });

  return (
    <button
      className={buttonClass}
      type="submit"
      onClick={following ? () => unfollow() : () => follow()}
    >
      <i className="ion-plus-round" />
      &nbsp;
      {following ? 'Unfollow' : 'Follow'}
      {' '}
      {user.username}
    </button>
  );
};

export default FollowUserButton;
