import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { MainTabStackScreenProps } from '../MainStack';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { Theme } from 'src/shared/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from 'src/shared/navigation';

const SettingsScreen: React.FC<MainTabStackScreenProps<'Settings'>> = () => {
  const navigation = useNavigation<RootStackNavigationProps<'Main'>>();
  const styles = useThemedStyle(themedStyles);

  const goToExport = () =>
    navigation.navigate('ExportStack', { screen: 'ExportLanding' });

  return (
    <QuaiPayContent title={'Settings'} navButton={false}>
      <View style={styles.container}>
        <Pressable
          onPress={goToExport}
          style={({ pressed }) => [
            styles.placeholderBtn,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="H3">Export Account</QuaiPayText>
        </Pressable>
      </View>
    </QuaiPayContent>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderBtn: {
      padding: 10,
      backgroundColor: theme.normal,
    },
  });

export default SettingsScreen;
