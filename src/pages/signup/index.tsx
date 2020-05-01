import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SIGNUP } from '../../graphql';
import { ListErrors } from '../../components';
import { AuthProps } from '../../types';

const Signup: FC<AuthProps> = ({ isLoggedIn }) => {
  const history = useHistory();
  if (isLoggedIn) { history.push('/'); }

  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [username, changeUsername] = useState('');
  const [errors, changeErrors] = useState<string[]>([]);

  const client = useApolloClient();
  const [submitSignup, { loading }] = useMutation(SIGNUP, {
    variables: { input: { email, username, password } },
    onCompleted: ({ signup }) => {
      localStorage.setItem('authToken', signup.token);
      client.writeData({
        data: {
          token: signup.token,
          currentUser: {
            email: signup.email,
            username: signup.username,
            bio: signup.token,
            image: signup.image,
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
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/login">
                Have an account?
              </Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={(e) => { e.preventDefault(); submitSignup(); }}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => changeUsername(e.target.value)}
                  />
                </fieldset>

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
                  Sign up
                </button>

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
