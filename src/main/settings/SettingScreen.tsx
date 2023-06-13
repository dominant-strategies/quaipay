import React from 'react';
import { StyleSheet, View } from 'react-native';

import { QuaiPayContent } from 'src/shared/components';
import { MainTabStackScreenProps } from '../MainStack';

const SettingScreen: React.FC<MainTabStackScreenProps<'Setting'>> = () => {
  return (
    <QuaiPayContent title={'Settings'} navButton={false}>
      <View style={styles.container} />
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingScreen;
