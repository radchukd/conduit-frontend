import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from '../../graphql';
import { CurrentUserProps } from '../../types';

const SettingsForm: FC<CurrentUserProps> = ({ currentUser }) => {
  const history = useHistory();
  const [image, changeImage] = useState(currentUser.image);
  const [username, changeUsername] = useState(currentUser.username);
  const [bio, changeBio] = useState(currentUser.bio);
  const [email, changeEmail] = useState(currentUser.email);
  const [password, changePassword] = useState('');

  const [submitUser, { loading }] = useMutation(UPDATE_USER, {
    variables: { input: { image, username, bio, email, password } },
    onCompleted: () => history.push(`/user/${currentUser.username}`),
  });

  const handleImage = (files: FileList) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      if (reader.result) {
        changeImage((reader.result as string).replace(/(.*),/, ''));
      }
    };
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); submitUser(); }}>
      <fieldset>

        <fieldset className="form-group">
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={e => handleImage(e.target.files as FileList)}
          />
        </fieldset>

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
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
            value={bio}
            onChange={e => changeBio(e.target.value)}
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
            placeholder="New Password"
            value={password}
            onChange={e => changePassword(e.target.value)}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={loading}
        >
          Update Profile
        </button>

      </fieldset>
    </form>
  );
};

export default SettingsForm;
