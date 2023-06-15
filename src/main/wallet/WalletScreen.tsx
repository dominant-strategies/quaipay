import React from 'react';

import { MainTabStackScreenProps } from '../MainStack';
import { QuaiPayContent } from '../../shared/components';
import { CardSize, QuaiPayCard } from '../../shared/components/QuaiPayCard';

const WalletScreen: React.FC<MainTabStackScreenProps<'Wallet'>> = ({}) => {
  return (
    <QuaiPayContent navButton={false}>
      <QuaiPayCard
        size={CardSize.Small}
        quaiAmount="142.123"
        address="0x123453.....0934823"
        zone="Cyprus-02"
        fiatAmount="1,000"
        title="Balance"
      />
    </QuaiPayContent>
  );
};

export default WalletScreen;
