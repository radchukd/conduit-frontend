import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { FAVORITE_ARTICLE, UNFAVORITE_ARTICLE } from '../graphql';
import { ArticlePreviewProps } from '../types';
import Avatar from '../assets/avatar.jpg';

const ArticlePreview: FC<ArticlePreviewProps> = ({ article }) => {
  const isLoggedIn = !!localStorage.getItem('authToken');
  const [favorited, changeFavorited] = useState(article.favorited);
  const buttonClass = favorited
    ? 'btn btn-sm btn-primary'
    : 'btn btn-sm btn-outline-primary';

  const [favorite] = useMutation(FAVORITE_ARTICLE, {
    variables: { slug: article.slug },
    onCompleted: () => changeFavorited(true),
  });
  const [unfavorite] = useMutation(UNFAVORITE_ARTICLE, {
    variables: { slug: article.slug },
    onCompleted: () => changeFavorited(false),
  });

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/user/${article.author.username}`}>
          <img
            src={article.author.image ? `data:image/png;base64,${article.author.image}` : Avatar}
            alt={article.author.username}
          />
        </Link>

        <div className="info">
          <Link className="author" to={`/user/${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
        {isLoggedIn &&
          <div className="pull-xs-right">
            <button
              className={buttonClass}
              type="button"
              onClick={favorited ? () => unfavorite() : () => favorite()}
            >
              <i className="ion-heart" />
              {article.favoritesCount}
            </button>
          </div>
        }
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map((tag: string) => (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            ))
          }
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
