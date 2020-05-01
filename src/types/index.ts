export * from './props';

export type ArticleType = {
  _id?: string;
  slug?: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited?: boolean;
  favoritesCount: number;
  author: ProfileType;
};

export type CommentType = {
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: ProfileType;
};

type CommonUserType = {
  username: string;
  bio: string;
  image: string;
};

export interface UserType extends CommonUserType {
  _id: string;
  email: string;
};

export interface ProfileType extends CommonUserType {
  following: boolean;
};

export type Cache = {
  user: UserType & { __typename: string; };
};
