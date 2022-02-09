import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface FlexProps {
  margin: CSSProperties['margin'];
  flexShrink: CSSProperties['flexShrink'];
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  maxHeight: CSSProperties['maxHeight'];
  minHeight: CSSProperties['minHeight'];
  maxWidth: CSSProperties['maxWidth'];
  padding: CSSProperties['padding'];
  alignItems: CSSProperties['alignItems'];
  justifyContent: CSSProperties['justifyContent'];
  flexDirection: CSSProperties['flexDirection'];
}

const Flex = styled('div')<Partial<FlexProps>>({}, props => ({
  display: 'flex',
  margin: props.margin || '0',
  flexShrink: props.flexShrink || 'initial',
  width: props.width || 'initial',
  height: props.height || 'initial',
  maxHeight: props.maxHeight || 'initial',
  minHeight: props.minHeight || 'initial',
  maxWidth: props.maxWidth || 'initial',
  padding: props.padding || '0',
  alignItems: props.alignItems || 'initial',
  justifyContent: props.justifyContent || 'initial',
  flexDirection: props.flexDirection || 'initial',
}));

export default Flex;
