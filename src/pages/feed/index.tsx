import React, { FC, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { FEED } from '../../graphql';
import {
  ArticleList,
  ArticlePagination,
  Banner,
  Loading,
} from '../../components';
import { ArticleType } from '../../types';

const Feed: FC<{}> = () => {
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(page);

  const [loadFeed, feedQuery] = useLazyQuery(FEED, { fetchPolicy: 'no-cache' });
  useEffect(() => { loadFeed({ variables: { input: { offset: 0 } } }); }, [loadFeed]);
  const loadMore = (offset: number = 0) => loadFeed({ variables: { input: { offset } } });
  if (feedQuery.loading) { return <Loading what="articles" />; }
  const articles: ArticleType[] = feedQuery.data?.feed || [];

  return (
    <div className="home-page">

      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  Your Feed
                </li>
              </ul>
            </div>

            <ArticleList articles={articles} />
            <ArticlePagination
              count={articles.length}
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

export default Feed;
