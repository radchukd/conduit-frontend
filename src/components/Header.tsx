import React from 'react';
import { Link } from 'react-router-dom';
import { CacheProps, CurrentUserProps } from '../types';
import Avatar from '../assets/avatar.jpg';

const Header: React.FC<CacheProps> = ({ isLoggedIn, currentUser }) => {
  const view = isLoggedIn
    ? <LoggedInView currentUser={currentUser} />
    : <LoggedOutView />;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        { view }
      </div>
    </nav>
  );
};

const LoggedOutView: React.FC<{}> = () => (
  <ul className="nav navbar-nav pull-xs-right">
    <li className="nav-item">
      <Link to="/" className="nav-link">
        Home
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/login" className="nav-link">
        Log in
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/signup" className="nav-link">
        Sign up
      </Link>
    </li>
  </ul>
);

const LoggedInView: React.FC<CurrentUserProps> = ({ currentUser }) => (
  <ul className="nav navbar-nav pull-xs-right">

    <li className="nav-item">
      <Link to="/" className="nav-link">
        Home
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/editor" className="nav-link">
        <i className="ion-compose" />
        &nbsp;New Post
      </Link>
    </li>

    <li className="nav-item">
      <Link to="/settings" className="nav-link">
        <i className="ion-gear-a" />
        &nbsp;Settings
      </Link>
    </li>

    <li className="nav-item">
      <Link
        to={`/user/${currentUser.username}`}
        className="nav-link"
      >
        <img
          src={currentUser.image ? `data:image/png;base64,${currentUser.image}` : Avatar}
          className="user-pic"
          alt={currentUser.username}
        />
        {currentUser.username}
      </Link>
    </li>

  </ul>
);

export default Header;
