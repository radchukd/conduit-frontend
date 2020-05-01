import React, { FC, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { ARTICLE, TAGS, CREATE_ARTICLE, UPDATE_ARTICLE } from '../../graphql';
import { ListErrors, Loading } from '../../components';
import { AuthProps } from '../../types';

const Editor: FC<AuthProps> = ({ isLoggedIn }) => {
  const history = useHistory();
  if (!isLoggedIn) { history.push('/login'); }

  const { slug } = useParams();
  const [title, changeTitle] = useState('');
  const [description, changeDescription] = useState('');
  const [body, changeBody] = useState('');
  const [tagList, changeTagList] = useState<string[]>([]);
  const [errors, changeErrors] = useState<string[]>([]);
  const [loadTags, tagsQuery] = useLazyQuery(TAGS);
  const [loadArticle, articleQuery] = useLazyQuery(ARTICLE, {
    variables: { slug },
    onCompleted: ({ article }) => {
      changeTitle(article.title);
      changeDescription(article.description);
      changeBody(article.body);
      changeTagList(article.tagList);
    },
  });
  useEffect(() => {
    if (slug) { loadArticle(); }
    else { loadTags(); }
  }, [slug, loadTags, loadArticle]);

  const mutation = slug ? UPDATE_ARTICLE : CREATE_ARTICLE;
  const input: any = { title, description, body };
  if (slug) { input.slug = slug; }
  else { input.tagList = tagList; }
  const [submitArticle, submitMutation] = useMutation(mutation, {
    variables: { input },
    onCompleted: ({ createArticle, updateArticle }) => {
      const newSlug = createArticle ? createArticle.slug : updateArticle.slug;
      history.push(`/article/${newSlug}`);
    },
    onError: (error) => changeErrors([error.message]),
  });

  const onTagClick = (tag: string) => {
    if (tagList.includes(tag)) {
      const copy = tagList.slice();
      copy.splice(copy.indexOf(tag), 1);
      changeTagList(copy);
    }
    else { changeTagList([...tagList, tag]); }
  };

  if (articleQuery.loading || tagsQuery.loading) { return <Loading />; }
  const tags: string[] = tagsQuery.data?.tags || [];

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">

            <ListErrors errors={errors} />

            <form>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    value={title}
                    onChange={e => changeTitle(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={e => changeDescription(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={e => changeBody(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <div className="tag-list">
                    {
                      tags.map((t: string) => (
                        <button
                          className="tag-default tag-pill"
                          type="button"
                          style={{ backgroundColor: tagList.includes(t) ? '#449d44' : '#818a91' }}
                          key={t}
                          onClick={() => onTagClick(t)}
                        >
                          {t}
                        </button>
                      ))
                    }
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={submitMutation.loading}
                  onClick={() => submitArticle()}
                >
                  Publish Article
                </button>

              </fieldset>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
