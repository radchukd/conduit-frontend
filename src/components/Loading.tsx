import React, { FC } from 'react';

import LoadingGif from '../assets/loading.gif';

const Loading: FC<{ what?: string }> = ({ what }) => (
  <div style={{ margin: '25% 50%' }}>
    {`Loading ${what || ''}...`}
    <img src={LoadingGif} alt="loading" style={{ height: '64px', width: '64px' }} />
  </div>
);

export default Loading;
