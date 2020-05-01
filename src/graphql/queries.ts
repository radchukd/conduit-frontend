import { gql } from 'apollo-boost';

// client

export const CACHED_USER = gql`
  query cachedUser @client{
    user{
      _id
      email
      username 
      bio
      image
    }
  }
`;

// article

export const ARTICLE = gql`
  query($slug: String!){
    article(slug: $slug){
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

export const ARTICLE_PAGE = gql`
  query($slug: String!){
    article(slug: $slug){
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
    comments(slug: $slug){
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

export const ARTICLES = gql`
  query($input: ArticlesInput){
    articles(input: $input){
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

export const FEED = gql`
  query($input: FeedInput){
    feed(input: $input){
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

export const HOME_PAGE = gql`
  query($input: ArticlesInput){
    articles(input: $input){
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
    tags
  }
`;

export const TAGS = gql`
  query{
    tags
  }
`;

// user

export const LOGIN = gql`
  query Login($input: LoginInput!){
    login(input: $input){
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

export const PROFILE_PAGE = gql`
  query($username: String!, $input: ArticlesInput){
    profile(username: $username){
      username
      bio
      image
      following
    }

    articles(input: $input){
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

export const USER = gql`
  query{
    user{
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
