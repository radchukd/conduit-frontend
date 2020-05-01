import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_ARTICLE } from '../../graphql';
import { ArticlePreviewProps } from '../../types';

const ArticleActions: React.FC<ArticlePreviewProps> = ({ article }) => {
  const [submitDelete] = useMutation(DELETE_ARTICLE, { variables: { slug: article.slug } });

  return (
    <span>

      <Link
        to={`/editor/${article.slug}`}
        className="btn btn-outline-secondary btn-sm"
      >
        <i className="ion-edit" />
        Edit Article
      </Link>
      &nbsp;&nbsp;
      <button
        className="btn btn-outline-danger btn-sm"
        type="submit"
        onClick={() => submitDelete()}
      >
        <i className="ion-trash-a" />
        Delete Article
      </button>

    </span>
  );
};

export default ArticleActions;
