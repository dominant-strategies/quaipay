import { useState } from 'react';

import { EUnit } from './types';

export const useReceiveInput = () => {
  const [amount, setAmount] = useState('0.00');
  const [unit, setUnit] = useState(EUnit.USD);

  const onInputChange = setAmount;

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
