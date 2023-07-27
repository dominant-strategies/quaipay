import { useState } from 'react';

import { Currency } from 'src/shared/types';
import { QuaiRate } from './useQuaiRate';

const INITIAL_AMOUNT = '0';

export function useAmountInput(
  initialAmount: string = INITIAL_AMOUNT,
  quaiRate?: QuaiRate,
) {
  const [amount, setAmount] = useState(initialAmount);
  const [unit, setUnit] = useState(Currency.USD);
  const [eqValue, setEqValue] = useState(
    parseFloat(
      (Number(initialAmount) * (quaiRate?.quote ?? 0)).toFixed(6).toString(),
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

  function updateInputs(value: string) {
    if (quaiRate) {
      if (unit === Currency.USD) {
        setAmount(value);
        setEqValue(
          parseFloat(
            (Number(value) * quaiRate?.quote).toFixed(6).toString(),
          ).toString(),
        );
      } else {
        setAmount(value);
        setEqValue(
          parseFloat(
            (Number(value) * quaiRate?.base).toFixed(6).toString(),
          ).toString(),
        );
      }
    }
  }

  function onInputButtonPress(newChar: string) {
    const prevValue = amount;

    // Check for empty value
    if (prevValue.startsWith('0') && !prevValue.includes('.')) {
      return updateInputs(newChar);
    }

    return updateInputs(prevValue + newChar);
  }

  function onDecimalButtonPress() {
    const prevValue = amount;
    // Default to dot (.) as the decimal comma
    return !prevValue.includes('.') && updateInputs(amount + '.');
  }

  function onDeleteButtonPress() {
    const prevValue = amount;

    return updateInputs(
      prevValue.length > 1 ? prevValue.slice(0, -1) : INITIAL_AMOUNT,
    );
  }

  function onSwap() {
    const result = unit === Currency.USD ? Currency.QUAI : Currency.USD;
    const pastInput = input.value;
    const pastEq = eqInput.value;

    setUnit(result);
    setEqValue(pastInput);
    setAmount(pastEq);
  }

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
}
