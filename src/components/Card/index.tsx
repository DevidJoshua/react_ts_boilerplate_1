import React, { FC, CSSProperties } from 'react';
import Cards from './styles';

interface Props {
  children?: React.ReactNode;
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
}

const Card: FC<Props> = ({ children, margin, padding }) => {
  return (
    <Cards margin={margin} padding={padding}>
      {children}
    </Cards>
  );
};

export default Card;
