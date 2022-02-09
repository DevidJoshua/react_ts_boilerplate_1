import React from 'react';
import { cx } from 'emotion';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Flex from '../Flex';
import { styBoxBtn, styInput } from './styles';

interface Props {
  disabledMin?: boolean;
  disabledPlus?: boolean;
  disabledText?: boolean;
  value?: string | number;
  maxLength?: number | undefined;
  onChangeText: (e: number) => void;
  onClickMinus?: React.MouseEventHandler;
  onClickPlus?: React.MouseEventHandler;
}

function QuantityEditor(props: Props) {
  const {
    maxLength,
    value,
    disabledMin,
    disabledPlus,
    disabledText,
    onChangeText,
    onClickMinus,
    onClickPlus,
  } = props;

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val: string = e.target.value;
    const newVal = Number(val.replace(/[^0-9]/gm, ''));
    onChangeText(newVal);
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <div
        className={cx(styBoxBtn, { disabled: disabledMin })}
        onClick={!disabledMin ? onClickMinus : () => {}}
      >
        <RemoveIcon />
      </div>
      <div>
        <input
          disabled={disabledText}
          className={styInput}
          maxLength={maxLength}
          type="text"
          value={value}
          onChange={!disabledText ? e => handleChangeText(e) : () => {}}
        />
      </div>
      <div
        className={cx(styBoxBtn, { disabled: disabledPlus })}
        onClick={!disabledPlus ? onClickPlus : () => {}}
      >
        <AddIcon />
      </div>
    </Flex>
  );
}

export default QuantityEditor;
