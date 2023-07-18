import React from 'react';
import { TouchableOpacity } from 'react-native';
import TestRenderer from 'react-test-renderer';
import { useAmountInput } from 'src/shared/hooks/useAmountInput';

type TestComponentProps = {
  initialAmount: string;
};

const TestComponent: React.FC<TestComponentProps> = ({ initialAmount }) => {
  const { eqInput, input, onSwap } = useAmountInput(initialAmount);

  return (
    <div>
      <p id="inputValue">{input.value}</p>
      <p id="eqInputValue">{eqInput.value}</p>
      <TouchableOpacity id="swapButton" onPress={onSwap}>
        Swap
      </TouchableOpacity>
    </div>
  );
};

describe('useAmountInput', () => {
  describe('onSwap', () => {
    it('is idempotent', () => {
      const testRenderer = TestRenderer.create(
        <TestComponent initialAmount="0.005" />,
      );
      const testInstance = testRenderer.root;

      let inputValueBeforePress = testInstance.findByProps({ id: 'inputValue' })
        .children[0];
      let eqInputValueBeforePress = testInstance.findByProps({
        id: 'eqInputValue',
      }).children[0];

      const swapButton = testInstance.findByProps({ id: 'swapButton' });
      TestRenderer.act(() => {
        swapButton.props.onPress();
      });
      TestRenderer.act(() => {
        swapButton.props.onPress();
      });

      let inputValueAfterPress = testInstance.findByProps({ id: 'inputValue' })
        .children[0];
      let eqInputValueAfterPress = testInstance.findByProps({
        id: 'eqInputValue',
      }).children[0];

      expect(inputValueBeforePress).toEqual(inputValueAfterPress);
      expect(eqInputValueBeforePress).toEqual(eqInputValueAfterPress);
    });
  });
});
