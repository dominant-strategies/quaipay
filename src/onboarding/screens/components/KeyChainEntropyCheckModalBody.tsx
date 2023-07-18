import React from 'react';
import { StyleSheet, View } from 'react-native';

import { QuaiPayButton, QuaiPayText } from 'src/shared/components';

export const KeyChainEntropyCheckModalBody: React.FC = ({}) => {
  return (
    <View style={styles.mainContainer}>
      <QuaiPayText>Entropy detected from keychain</QuaiPayText>
      <QuaiPayButton title="Continue with keychain info" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 32,
    marginHorizontal: 16,
  },
});
