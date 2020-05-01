import gql from 'graphql-tag';
import { Cache } from '../types';

export const cacheData: Cache = {
  user: {
    __typename: 'UserType',
    _id: '',
    email: '',
    username: '',
    bio: '',
    image: '',
  },
};

export const typeDefs = gql`
  type UserType {
    _id: ID!
    email: String!
    username: String!
    token: String!
    bio: String
    image: String
  }

  extend type Query {
   user: UserType!
  }

`;

export const resolvers = {};
