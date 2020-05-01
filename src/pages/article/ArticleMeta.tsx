import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from './ArticleActions';
import { ArticleMetaProps } from '../../types';
import Avatar from '../../assets/avatar.jpg';

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article, isAuthor }) => (
  <div className="article-meta">
    <Link to={`/${article.author.username}`}>
      <img
        src={article.author.image ? `data:image/png;base64,${article.author.image}` : Avatar}
        alt={article.author.username}
      />
    </Link>

    <div className="info">
      <Link to={`/${article.author.username}`} className="author">
        {article.author.username}
      </Link>
      <span className="date">
        {new Date(article.createdAt).toDateString()}
      </span>
    </div>
    {isAuthor && <ArticleActions article={article} />}
  </div>
);


export default ArticleMeta;
