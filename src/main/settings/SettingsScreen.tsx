import React from 'react';
import { StyleSheet, View } from 'react-native';

import { RootNavigator } from 'src/shared/navigation/utils';
import { QuaiPayButton, QuaiPayContent } from 'src/shared/components';

import { MainTabStackScreenProps } from '../MainStack';

const SettingsScreen: React.FC<MainTabStackScreenProps<'Settings'>> = () => {
  const goToExport = () =>
    RootNavigator.navigate('ExportStack', { screen: 'ExportLanding' });

  return (
    <QuaiPayContent title={'Settings'} noNavButton>
      <View style={styles.container}>
        <QuaiPayButton onPress={goToExport} title="Export Account" />
      </View>
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
