import { useState } from 'react';

import { EUnit } from './types';

const INITIAL_AMOUNT = '0';

export const useReceiveInput = () => {
  const [amount, setAmount] = useState(INITIAL_AMOUNT);
  const [unit, setUnit] = useState(EUnit.USD);

  const onInputChange = (value: string) => {
    const prevValue = value.slice(0, -1);
    const newValue = value[value.length - 1];

    if (newValue === '.') {
      return setAmount(value);
    }

    if (prevValue === INITIAL_AMOUNT) {
      return setAmount(value[value.length - 1]);
    }

    if (value === '') {
      return setAmount(INITIAL_AMOUNT);
    }

    return setAmount(value);
  };

  const onSwap = () => {
    const result = unit === EUnit.USD ? EUnit.QUAI : EUnit.USD;
    setUnit(result);
  };

  return {
    amount,
    unit,
    onInputChange,
    onSwap,
  };
};
