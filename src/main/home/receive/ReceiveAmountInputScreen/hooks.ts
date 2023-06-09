import { useState } from 'react';

import { EUnit } from './types';

const INITIAL_AMOUNT = '0';
export const EXCHANGE_RATE = 0.005;

// TODO: improve input logic handling
// TODO: get exchange rate from internet
export const useReceiveInput = () => {
  const [amount, setAmount] = useState(INITIAL_AMOUNT);
  const [unit, setUnit] = useState(EUnit.USD);
  const [eqValue, setEqValue] = useState(INITIAL_AMOUNT);

  const input = {
    value: amount,
    unit,
  };

  const eqInput = {
    value: eqValue,
    unit: unit === EUnit.QUAI ? EUnit.USD : EUnit.QUAI,
  };

  const updateInputs = (value: string) => {
    if (unit === EUnit.USD) {
      setAmount(value);
      setEqValue((Number(value) / EXCHANGE_RATE).toString());
    } else {
      setAmount(value);
      setEqValue((Number(value) * EXCHANGE_RATE).toString());
    }
  };

  const onInputButtonPress = (value: string) => {
    alert(value);
  };

  const onInputChange = (value: string) => {
    const prevValue = value.slice(0, -1);
    const newValue = value[value.length - 1];

    if (newValue === '.') {
      return updateInputs(value);
    }

    if (prevValue === INITIAL_AMOUNT) {
      return updateInputs(value[value.length - 1]);
    }

    if (value === '') {
      return updateInputs(INITIAL_AMOUNT);
    }

    return updateInputs(value);
  };

  const onSwap = () => {
    const result = unit === EUnit.USD ? EUnit.QUAI : EUnit.USD;
    const pastInput = input.value;
    const pastEq = eqInput.value;

    setUnit(result);
    setEqValue(pastInput);
    setAmount(pastEq);
  };

  return {
    eqInput,
    input,
    onInputButtonPress,
    onInputChange,
    onSwap,
  };
};
