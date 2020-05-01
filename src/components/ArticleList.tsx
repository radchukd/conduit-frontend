import React from 'react';
import ArticlePreview from './ArticlePreview';
import { ArticleListProps } from '../types';

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="article-preview">
        No articles here... yet.
      </div>
    );
  }

  return (
    <>
      {
        articles.map(article => (
          <ArticlePreview article={article} key={article.slug} />
        ))
      }
    </>
  );
};

export default ArticleList;
