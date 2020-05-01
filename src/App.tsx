import React, { FC, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useApolloClient, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { USER, CACHED_USER } from './graphql';
import { Header, Loading } from './components';
import {
  Home,
  Feed,
  Login,
  Signup,
  Editor,
  Article,
  Profile,
  NotFound,
  Settings,
} from './pages';
import { UserType } from './types';

const App: FC<{}> = () => {
  const isLoggedIn = !!localStorage.getItem('authToken');
  const client = useApolloClient();
  const getUserQuery = useQuery(CACHED_USER);
  const [loadUser, loadUserQuery] = useLazyQuery(USER, {
    onCompleted: ({ user }) => {
      client.writeData({ data: { user } });
    },
  });
  useEffect(() => {
    if (isLoggedIn && (getUserQuery.data && !getUserQuery.data.user._id)) { loadUser(); }
  }, [isLoggedIn, getUserQuery, loadUser]);

  const currentUser: UserType = getUserQuery.data && getUserQuery.data.user;
  if ((isLoggedIn && !currentUser) || getUserQuery.loading || loadUserQuery.loading) {
    return <Loading />;
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={isLoggedIn ? Feed : Home} />
        <Route path="/login" component={() => <Login isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" component={() => <Signup isLoggedIn={isLoggedIn} />} />
        <Route path="/editor/:slug" component={() => <Editor isLoggedIn={isLoggedIn} />} />
        <Route path="/editor" component={() => <Editor isLoggedIn={isLoggedIn} />} />
        <Route path="/article/:slug" component={() => <Article currentUser={currentUser} />} />
        <Route path="/settings" component={() => <Settings isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
        <Route path="/user/:username" component={() => <Profile currentUser={currentUser} />} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
