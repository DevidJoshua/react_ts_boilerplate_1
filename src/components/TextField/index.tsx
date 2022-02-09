import React, { ChangeEventHandler } from 'react';
import { cx } from 'emotion';
import Flex from '../Flex';
import Typography from '@mui/material/Typography';
import { styText } from './styles';

interface Props {
  label?: string;
  isDark?: boolean;
  isLight?: boolean;
  isSpaceBottom?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  type?: React.HTMLInputTypeAttribute;
}

function TextField(props: Props) {
  const { label, isDark, isLight, value, onChange, placeholder, isSpaceBottom, type } = props;

  return (
    <Flex flexDirection="column" width="100%" margin={isSpaceBottom ? '0 0 16px' : ''}>
      {label && (
        <Typography
          fontSize="14px"
          color={isDark ? 'primary' : 'secondary'}
          style={{ marginBottom: '4px' }}
        >
          {label}
        </Typography>
      )}
      <input
        className={cx(styText, { isLight: isLight }, { isDark: isDark })}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </Flex>
  );
}

export default TextField;
