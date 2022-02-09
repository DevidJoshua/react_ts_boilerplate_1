import React, { FC } from 'react';
import { styContainer } from './styles';

const Layouts: FC = ({ children }) => {
  return <div className={styContainer}>{children}</div>;
};

export default Layouts;
