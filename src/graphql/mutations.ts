import { gql } from 'apollo-boost';

// article


export const CREATE_ARTICLE = gql`
  mutation($input: CreateArticleInput!){
    createArticle(input: $input){
      _id
      slug
      title
      description
      body
      tagList
      createdAt
      updatedAt
      favorited
      favoritesCount
      author {
        username
        bio
        image
        following
      }
    }
  }
`;

export const FAVORITE_ARTICLE = gql`
  mutation($slug: String!){
    favoriteArticle(slug: $slug){
      _id
      slug
      title
      description
      body
      tagList
      createdAt
      updatedAt
      favorited
      favoritesCount
      author {
        username
        bio
        image
        following
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation($slug: String!){
    deleteArticle(slug: $slug)
  }
`;

export const UNFAVORITE_ARTICLE = gql`
  mutation($slug: String!){
    unfavoriteArticle(slug: $slug){
      _id
      slug
      title
      description
      body
      tagList
      createdAt
      updatedAt
      favorited
      favoritesCount
      author {
        username
        bio
        image
        following
      }
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation($input: UpdateArticleInput!){
    updateArticle(input: $input){
      _id
      slug
      title
      description
      body
      tagList
      createdAt
      updatedAt
      favorited
      favoritesCount
      author {
        username
        bio
        image
        following
      }
    }
  }
`;

// comment

export const CREATE_COMMENT = gql`
  mutation($input: CreateCommentInput!){
    createComment(input: $input){
      _id
      body
      createdAt
      updatedAt
      author {
        username
        bio
        image
        following
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation($_id: ID!){
    deleteComment(_id: $_id)
  }
`;

// user

export const FOLLOW_USER = gql`
  mutation($username: String!){
    followUser(username: $username){
      username
      bio
      image
      following
    }
  }
`;

export const SIGNUP = gql`
  mutation($input: SignupInput!) {
    signup(input: $input){
      _id
      email
      username
      token
      bio
      image
      createdAt
      updatedAt
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation($username: String!){
    unfollowUser(username: $username){
      username
      bio
      image
      following
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!){
    updateUser(input: $input){
      _id
      email
      username
      token
      bio
      image
      createdAt
      updatedAt
    }
  }
`;
