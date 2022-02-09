import React, { FC } from 'react';
import { BottomSheet as RealBottomSheet, BottomSheetProps } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

const BottomSheet: FC<BottomSheetProps> = props => {
  const { children } = props;
  return <RealBottomSheet {...props}>{children}</RealBottomSheet>;
};

export default BottomSheet;
