import React, { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { PROFILE_PAGE, ARTICLES } from '../../graphql';
import FollowUserButton from './FollowUserButton';
import { ArticleList, ArticlePagination, Loading } from '../../components';
import { CurrentUserProps, ArticleType, ProfileType } from '../../types';
import Avatar from '../../assets/avatar.jpg';

const Profile: FC<CurrentUserProps> = ({ currentUser }) => {
  const { username } = useParams();
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(page);

  const [loadProfile, profileQuery] = useLazyQuery(PROFILE_PAGE, {
    variables: { username, input: { author: username, offset: 0 } },
    fetchPolicy: 'no-cache',
  });
  useEffect(() => loadProfile(), [loadProfile, username]);

  const [loadArticles, articlesQuery] = useLazyQuery(ARTICLES, { fetchPolicy: 'no-cache' });
  const loadMore = (offset: number = 0) => {
    loadArticles({ variables: { input: { author: username, offset } } });
  };

  if (profileQuery.loading || articlesQuery.loading) { return <Loading what="profile" />; }
  const articles: ArticleType[] = articlesQuery.data?.articles || profileQuery.data?.articles || [];
  const profile: ProfileType = profileQuery.data?.profile || {} as ProfileType;
  const isUser = profile && currentUser && profile.username === currentUser.username;

  return (
    <div className="profile-page">

      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">

              <img
                src={profile.image ? `data:image/png;base64,${profile.image}` : Avatar}
                className="user-img"
                alt={profile.username}
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              {isUser &&
                <Link
                  to="/settings"
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-gear-a" />
                Edit Profile Settings
              </Link>}
              {!isUser && currentUser._id && <FollowUserButton user={profile} />}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">

            <ArticleList articles={articles} />
            <ArticlePagination
              count={articles.length}
              author={username}
              page={page}
              setPage={setPage}
              max={max}
              setMax={setMax}
              loadMore={loadMore}
            />
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;
