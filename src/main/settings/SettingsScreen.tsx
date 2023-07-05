import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { RootNavigator } from 'src/shared/navigation/utils';

import { MainTabStackScreenProps } from '../MainStack';
import { Theme } from 'src/shared/types';
import AvatarPlaceHolder from 'src/shared/assets/avatarPlaceholder.svg';
import { useThemedStyle } from 'src/shared/hooks';

const SettingsScreen: React.FC<MainTabStackScreenProps<'Settings'>> = () => {
  const styles = useThemedStyle(themedStyle);

  const goToExport = () =>
    RootNavigator.navigate('ExportStack', { screen: 'ExportLanding' });

  return (
    <View style={styles.top}>
      <AvatarPlaceHolder style={styles.avatar} width={96} height={96} />
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    top: {
      backgroundColor: theme.background,
      height: Dimensions.get('window').height * 0.2,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      position: 'relative',
    },
    avatar: {
      borderColor: theme.surface,
      borderWidth: 6,
      borderRadius: 48,
      bottom: -30,
      left: Dimensions.get('window').width / 2 - 48,
      position: 'absolute',
    },
  });

export default SettingsScreen;
