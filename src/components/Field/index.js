import React from 'react';

import { X, O } from './styles';

const Field = ({ value, type, waiting, gameOver, ...rest }) => {
  if (value) {
    if (value === 'x') return <X />;
    if (value === 'o') return <O />;
  } else if (!gameOver && !waiting) {
    if (type === 'x') return <X {...rest} className="x__placeholder" />;
    if (type === 'o') return <O {...rest} className="o__placeholder" />;
  }

  return <></>;
};

export default Field;
