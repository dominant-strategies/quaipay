import React from 'react';
import { View } from 'react-native';

import { QuaiPayContent } from 'src/shared/components';

import { ExportStackScreenProps } from './ExportStack';

export const ExportLandingScreen: React.FC<
  ExportStackScreenProps<'ExportLanding'>
> = ({}) => {
  return (
    <QuaiPayContent>
      <View />
    </QuaiPayContent>
  );
};
