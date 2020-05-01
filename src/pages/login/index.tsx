import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { LOGIN } from '../../graphql';
import { ListErrors } from '../../components';
import { AuthProps } from '../../types';

const Login: FC<AuthProps> = ({ isLoggedIn }) => {
  const history = useHistory();
  if (isLoggedIn) { history.push('/'); }

  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [errors, changeErrors] = useState<string[]>([]);

  const client = useApolloClient();
  const [submitLogin, { loading }] = useLazyQuery(LOGIN, {
    variables: { input: { email, password } },
    onCompleted: ({ login }) => {
      localStorage.setItem('authToken', login.token);
      client.writeData({
        data: {
          token: login.token,
          currentUser: {
            email: login.email,
            username: login.username,
            bio: login.token,
            image: login.image,
          },
        },
      });
      window.location.reload();
    },
    onError: (error) => changeErrors([error.message]),
  });

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Log in</h1>
            <p className="text-xs-center">
              <Link to="/signup">
                Need an account?
              </Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={(e) => { e.preventDefault(); submitLogin(); }}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => changeEmail(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => changePassword(e.target.value)}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={loading}
                >
                  Log in
                </button>

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
