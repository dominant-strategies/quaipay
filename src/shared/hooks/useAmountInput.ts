import { useState } from 'react';

import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';
import { Currency } from 'src/shared/types';

const INITIAL_AMOUNT = '0';

export const useAmountInput = (initialAmount: string = INITIAL_AMOUNT) => {
  const [amount, setAmount] = useState(initialAmount);
  const [unit, setUnit] = useState(Currency.USD);
  const [eqValue, setEqValue] = useState(
    parseFloat(
      (Number(initialAmount) / EXCHANGE_RATE).toFixed(6).toString(),
    ).toString(),
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
      setEqValue(
        parseFloat(
          (Number(value) / EXCHANGE_RATE).toFixed(6).toString(),
        ).toString(),
      );
    } else {
      setAmount(value);
      setEqValue(
        parseFloat(
          (Number(value) * EXCHANGE_RATE).toFixed(6).toString(),
        ).toString(),
      );
    }
  };

  const onInputButtonPress = (newChar: string) => {
    const prevValue = amount;

    // Check for empty value
    if (prevValue.startsWith('0') && !prevValue.includes('.')) {
      return updateInputs(newChar);
    }

    return updateInputs(prevValue + newChar);
  };

  const onDecimalButtonPress = () => {
    const prevValue = amount;
    // Default to dot (.) as the decimal comma
    return !prevValue.includes('.') && updateInputs(amount + '.');
  };

  const onDeleteButtonPress = () => {
    const prevValue = amount;

    return updateInputs(
      prevValue.length > 1 ? prevValue.slice(0, -1) : INITIAL_AMOUNT,
    );
  };

  const onSwap = () => {
    const result = unit === Currency.USD ? Currency.QUAI : Currency.USD;
    const pastInput = input.value;
    const pastEq = eqInput.value;

    setUnit(result);
    setEqValue(pastInput);
    setAmount(pastEq);
  };

  const keyboard = {
    onDecimalButtonPress,
    onDeleteButtonPress,
    onInputButtonPress,
  };

  return {
    eqInput,
    input,
    keyboard,
    onSwap,
  };
};
