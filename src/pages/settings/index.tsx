import React from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import SettingsForm from './SettingsForm';
import { CacheProps } from '../../types';

const Settings: React.FC<CacheProps> = ({ isLoggedIn, currentUser }) => {
  const history = useHistory();
  if (!isLoggedIn) { history.push('/login'); }

  const client = useApolloClient();
  const logout = () => {
    localStorage.removeItem('authToken');
    client.writeData({
      data: {
        token: null,
        _id: null,
        email: null,
        username: null,
        bio: null,
        image: null,
      },
    });
    history.push('/');
    window.location.reload();
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">

            <h1 className="text-xs-center">Your Settings</h1>

            <SettingsForm currentUser={currentUser} />

            <hr />

            <button
              className="btn btn-outline-danger"
              type="submit"
              onClick={() => logout()}
            >
              Or click here to logout.
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
