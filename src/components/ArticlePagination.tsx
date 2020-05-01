import React from 'react';
import { ArticlePaginationProps } from '../types';

const ArticlePagination: React.FC<ArticlePaginationProps> = ({
  count,
  page,
  setPage,
  max,
  setMax,
  loadMore,
}) => (
  <nav>
    <ul className="pagination">
      <li className="page-item">
        <button
          className="page-link"
          type="button"
          disabled={page === 0}
          onClick={() => {
            setPage(page - 1);
            loadMore((page - 1) * 20);
          }}
        >
          {'<'}
        </button>
      </li>
      {
        Array(max + 1).fill(0).map((_, i) => i).map(p => (
          <li
            className={p === page ? 'page-item active' : 'page-item'}
            key={p.toString()}
          >
            <button
              className="page-link"
              type="button"
              disabled={page === p}
              onClick={() => {
                setPage(p);
                loadMore(p * 20);
              }}
            >
              {p + 1}
            </button>
          </li>
        ))
      }
      <li className="page-item">
        <button
          className="page-link"
          type="button"
          disabled={count < 20}
          onClick={() => {
            setPage(page + 1);
            if (page + 1 > max) { setMax(page + 1); }
            loadMore((page + 1) * 20);
          }}
        >
          {'>'}
        </button>
      </li>
    </ul>
  </nav>
);

export default ArticlePagination;
