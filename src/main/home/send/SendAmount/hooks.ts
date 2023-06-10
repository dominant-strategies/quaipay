import { useState } from 'react';

import { Currency } from 'src/shared/types';

export const EXCHANGE_RATE = 0.005;

// TODO: improve input logic handling
// TODO: get exchange rate from internet
export const useSendInput = (initialAmount: string = '0') => {
  const [amount, setAmount] = useState(initialAmount);
  const [unit, setUnit] = useState(Currency.USD);
  const [eqValue, setEqValue] = useState(
    (Number(initialAmount) / EXCHANGE_RATE).toString(),
  );

  const input = {
    value: amount,
    unit,
  };

  const eqInput = {
    value: eqValue,
    unit: unit === Currency.QUAI ? Currency.USD : Currency.QUAI,
  };

  const updateInputs = (value: string) => {
    if (unit === Currency.USD) {
      setAmount(value);
      setEqValue((Number(value) / EXCHANGE_RATE).toString());
    } else {
      setAmount(value);
      setEqValue((Number(value) * EXCHANGE_RATE).toString());
    }
  };

  const onInputChange = (value: string) => {
    const prevValue = value.slice(0, -1);
    const newValue = value[value.length - 1];

    if (newValue === '.') {
      return updateInputs(value);
    }

    if (prevValue === initialAmount) {
      return updateInputs(value[value.length - 1]);
    }

    if (value === '') {
      return updateInputs(initialAmount);
    }

    return updateInputs(value);
  };

  const onSwap = () => {
    const result = unit === Currency.USD ? Currency.QUAI : Currency.USD;
    const pastInput = input.value;
    const pastEq = eqInput.value;

    setUnit(result);
    setEqValue(pastInput);
    setAmount(pastEq);
  };

  return {
    eqInput,
    input,
    onInputChange,
    onSwap,
  };
};
