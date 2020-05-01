import React, { FC, useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { HOME_PAGE, ARTICLES } from '../../graphql';
import Tags from './Tags';
import {
  ArticleList,
  ArticlePagination,
  Banner,
  Loading,
} from '../../components';
import { ArticleType } from '../../types';

const Home: FC<{}> = () => {
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(page);

  const [loadHome, homeQuery] = useLazyQuery(HOME_PAGE, { fetchPolicy: 'no-cache' });
  useEffect(() => loadHome(), [loadHome]);

  const [loadArticles, articlesQuery] = useLazyQuery(ARTICLES, { fetchPolicy: 'no-cache' });
  const loadMore = (offset: number, t: string = tag) => {
    setPage(0);
    setMax(0);
    const input: any = { offset };
    if (t) { input.tag = t; }
    loadArticles({ variables: { input } });
  };

  if (homeQuery.loading || articlesQuery.loading) { return <Loading what="articles" />; }
  const articles: ArticleType[] = articlesQuery.data?.articles || homeQuery.data?.articles || [];
  const tags: string[] = homeQuery.data?.tags || [];

  return (
    <div className="home-page">

      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  {tag || 'Global Feed' }
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

          <div className="col-md-3">
            <div className="sidebar">

              <p>Popular Tags</p>

              <Tags
                tags={tags}
                setTag={setTag}
                loadMore={loadMore}
              />

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
