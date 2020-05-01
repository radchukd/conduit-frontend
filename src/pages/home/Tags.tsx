import React from 'react';
import { TagsProps } from '../../types';

const Tags: React.FC<TagsProps> = ({ tags, setTag, loadMore }) => (
  <div className="tag-list">
    {
      tags.map(t => (
        <button
          className="tag-default tag-pill"
          type="button"
          key={t}
          onClick={() => {
            setTag(t);
            loadMore(0, t);
          }}
        >
          {t}
        </button>
      ))
    }
  </div>
);

export default Tags;
