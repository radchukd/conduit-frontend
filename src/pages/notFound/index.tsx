import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC<{}> = () => (
  <div style={{ margin: '15% 50%', width: '100%' }}>
    Page not found
    <br />
    <Link to="/">Home</Link>
  </div>
);

export default NotFound;
