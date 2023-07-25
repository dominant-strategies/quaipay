import React, { useCallback, useRef } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MainTabStackScreenProps } from 'src/main/MainStack';
import { Theme } from 'src/shared/types';
import {
  useProfilePicture,
  useThemedStyle,
  useUsername,
  useWallet,
} from 'src/shared/hooks';
import { fontStyle, styledColors } from 'src/shared/styles';
import {
  QuaiPayButton,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import { abbreviateAddress } from 'src/shared/services/quais';
import { SettingsLinks } from 'src/main/settings/landing/SettingsLinks';
import { QuaiPayActiveAddressModal } from 'src/shared/components/QuaiPayActiveAddressModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RootNavigator } from 'src/shared/navigation/utils';

const SettingsScreen: React.FC<MainTabStackScreenProps<'Settings'>> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.landing',
  });
  const styles = useThemedStyle(themedStyle);

  const activeAddressModalRef = useRef<BottomSheetModal>(null);

  const username = useUsername();
  const wallet = useWallet();
  const profilePicture = useProfilePicture();

  const handlePresentActiveAddressModalPress = useCallback(() => {
    activeAddressModalRef.current?.present();
  }, []);

  if (!wallet) {
    return <QuaiPayLoader text={'Loading wallet...'} />;
  }

  return (
    <View>
      <QuaiPayActiveAddressModal ref={activeAddressModalRef} />
      <View style={styles.top}>
        <Image style={styles.image} source={{ uri: profilePicture }} />
      </View>
      <View style={styles.middle}>
        <QuaiPayText style={styles.username}>{username}</QuaiPayText>
        <QuaiPayText themeColor="secondary">
          {abbreviateAddress(wallet.address)}
        </QuaiPayText>
        <View style={styles.buttonContainer}>
          <QuaiPayButton
            title={t('chooseAddress')}
            containerStyle={styles.chooseAddressButtonContainer}
            style={styles.button}
            onPress={handlePresentActiveAddressModalPress}
          />
          <QuaiPayButton
            title={t('earn')}
            containerStyle={styles.earnButtonContainer}
            style={[styles.button, styles.earnButton]}
            type="secondary"
            onPress={() => {
              RootNavigator.navigate('SettingsStack', { screen: 'Referral' });
            }}
          />
        </View>
      </View>
      <SettingsLinks />
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
      zIndex: 2,
    },
    middle: {
      backgroundColor: theme.surface,
      paddingHorizontal: 32,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
    username: {
      ...fontStyle.fontH2,
      fontSize: 20,
      marginTop: 30,
    },
    chooseAddressButtonContainer: {
      width: 200,
    },
    earnButtonContainer: {
      width: 100,
    },
    button: {
      height: 32,
      padding: 0,
      justifyContent: 'center',
    },
    earnButton: { borderColor: styledColors.gray, borderWidth: 1 },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 24,
    },
    image: {
      bottom: -30,
      position: 'absolute',
      borderRadius: 70,
      alignSelf: 'center',
      height: 68,
      width: 68,
      borderColor: theme.normal,
      borderWidth: 4,
    },
  });

export default SettingsScreen;
