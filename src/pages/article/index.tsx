import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import marked from 'marked';
import { useQuery } from '@apollo/react-hooks';
import { ARTICLE_PAGE } from '../../graphql';
import ArticleMeta from './ArticleMeta';
import CommentSection from './CommentSection';
import { Loading } from '../../components';
import { CurrentUserProps, ArticleType, CommentType } from '../../types';

const Article: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const history = useHistory();
  const { slug } = useParams();
  if (!slug) { history.push('/'); }

  const { loading, data } = useQuery(ARTICLE_PAGE, { variables: { slug } });
  if (loading) { return <Loading what="article" />; }
  const article: ArticleType = data.article;
  const comments: CommentType[] = data.comments;
  const markup = { __html: marked(article.body, { sanitize: true }) };
  const isAuthor = currentUser && currentUser.username === article.author.username;

  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">

          <h1>{article.title}</h1>
          <ArticleMeta
            article={article}
            isAuthor={isAuthor}
          />

        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-xs-12">

            <div dangerouslySetInnerHTML={markup} />

            <ul className="tag-list">
              {
                article.tagList.map(tag => (
                  <li
                    className="tag-default tag-pill tag-outline"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))
              }
            </ul>

          </div>
        </div>

        <hr />

        <div className="article-actions" />

        <div className="row">
          <CommentSection
            comments={comments}
            slug={slug as string}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
