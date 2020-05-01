import { Dispatch, SetStateAction } from 'react';
import { ArticleType, CommentType, ProfileType, UserType } from '.';

export type AuthProps = {
  isLoggedIn: boolean;
};

export type CurrentUserProps = {
  currentUser: UserType;
};

export type CacheProps = CurrentUserProps & AuthProps;

export type ArticleListProps = {
  articles: ArticleType[];
};

export type ArticleMetaProps = ArticlePreviewProps & {
  isAuthor: boolean;
};

export type ArticlePaginationProps = {
  count: number;
  tag?: string;
  author?: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  max: number;
  setMax: Dispatch<SetStateAction<number>>;
  loadMore: LoadMoreFunction;
};

export type ArticlePreviewProps = {
  article: ArticleType;
};

export type CommentInputProps = CurrentUserProps & {
  slug: string;
}

export type CommentListProps = CurrentUserProps & {
  comments: CommentType[];
};

export type CommentSectionProps = CommentListProps & {
  slug: string;
};

export type CommentProps = CurrentUserProps & {
  comment: CommentType;
};

export type FollowUserButtonProps = {
  user: ProfileType;
};

export type TagsProps = {
  tags: string[];
  setTag: Dispatch<SetStateAction<string>>;
  loadMore: LoadMoreFunction;
};

export type LoadMoreFunction = (offset: number, tag?: string) => void;
