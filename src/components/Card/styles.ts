import { CSSProperties } from 'react';
import styled from '@emotion/styled';

export interface CardProps {
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
}

const Cards = styled('div')<Partial<CardProps>>({}, props => ({
  margin: props.margin || '0 16px',
  padding: props.padding || '28px 16px',
  borderRadius: '8px',
  backgroundColor: '#f8f9fb',
}));

export default Cards;
