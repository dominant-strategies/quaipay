import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { RootNavigator } from 'src/shared/navigation/utils';

import { MainTabStackScreenProps } from '../MainStack';
import { Theme } from 'src/shared/types';
import AvatarPlaceHolder from 'src/shared/assets/avatarPlaceholder.svg';
import { useThemedStyle, useUsername, useWallet } from 'src/shared/hooks';
import { fontStyle } from 'src/shared/styles';
import { QuaiPayLoader, QuaiPayText } from 'src/shared/components';
import { abbreviateAddress } from 'src/shared/services/quais';

const SettingsScreen: React.FC<MainTabStackScreenProps<'Settings'>> = () => {
  const styles = useThemedStyle(themedStyle);
  const username = useUsername();
  const wallet = useWallet();
  const goToExport = () =>
    RootNavigator.navigate('ExportStack', { screen: 'ExportLanding' });

  if (!wallet) {
    return <QuaiPayLoader text={'Loading wallet...'} />;
  }

  return (
    <View>
      <View style={styles.top}>
        <AvatarPlaceHolder style={styles.avatar} width={96} height={96} />
      </View>
      <View>
        <QuaiPayText style={styles.username}>{username}</QuaiPayText>
        <QuaiPayText themeColor="secondary">
          {abbreviateAddress(wallet.address)}
        </QuaiPayText>
      </View>
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
    username: {
      ...fontStyle.fontH2,
      fontSize: 20,
      marginTop: 30,
    },
  });

export default SettingsScreen;
