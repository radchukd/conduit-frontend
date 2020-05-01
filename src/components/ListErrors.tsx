import React from 'react';

const ListErrors: React.FC<{ errors: string[] }> = ({ errors }) => {
  if (!errors) { return null; }

  return (
    <ul className="error-messages">
      {
        errors.map((error, i) => (
          <li key={i}>
            {error}
          </li>
        ))
      }
    </ul>
  );
};

export default ListErrors;
