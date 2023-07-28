import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';

import CopyOutline from 'src/shared/assets/copyOutline.svg';
import ChevronMiniUp from 'src/shared/assets/chevronUpMini.svg';
import {
  QuaiPayActiveAddressModal,
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayLoader,
  QuaiPayQRCode,
  QuaiPayText,
  useBottomSheetModal,
} from 'src/shared/components';
import { RootStackNavigationProps } from 'src/shared/navigation';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { abbreviateAddress } from 'src/shared/services/quais';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { useWalletContext } from 'src/shared/context/walletContext';
import { useZone } from 'src/shared/hooks/useZone';

export const ReceiveScreen = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'home.receive.ReceiveScreen',
  });
  const styles = useThemedStyle(themedStyle);
  const { showSnackBar } = useSnackBar();
  const navigation = useNavigation<RootStackNavigationProps<'Main'>>();
  const { profilePicture } = useWalletContext(); // get bare profile picture state
  useProfilePicture(); // fetch profilePicture
  const username = useUsername();
  const wallet = useWallet();
  const { shardName } = useZone();
  const { ref: activeAddressModalRef } = useBottomSheetModal();

  if (!profilePicture || !username || !wallet) {
    return <QuaiPayLoader text={t('loading')} />;
  }

  const copyToClipboard = () => {
    Clipboard.setString(wallet.address);
    showSnackBar({
      message: t('copiedToClipboard'),
      moreInfo: abbreviateAddress(wallet.address),
      type: 'success',
    });
  };
  const handleOpenActiveAddressModal = () => {
    activeAddressModalRef.current?.present();
  };
  const goToInputScreen = () => {
    navigation.navigate('ReceiveStack', {
      screen: 'ReceiveAmountInput',
    });
  };
  // TODO: add proper action and link
  const goToLearnMore = () => {};

  return (
    <QuaiPayContent
      noNavButton
      hasBackgroundVariant
      containerStyle={styles.container}
    >
      <View style={styles.separator} />
      <View style={styles.walletView}>
        <QuaiPayQRCode
          value={JSON.stringify({
            address: wallet.address,
            username,
            profilePicture,
          })}
        />
        <QuaiPayText type="H2" style={styles.username}>
          {username}
        </QuaiPayText>
        <QuaiPayButton
          type="secondary"
          titleColor="gray"
          titleType="paragraph"
          onPress={copyToClipboard}
          onLongPress={copyToClipboard}
          style={styles.addressContainer}
          title={abbreviateAddress(wallet.address)}
          RightIcon={<CopyOutline />}
        />
        <QuaiPayButton
          pill
          outlined
          type="secondary"
          style={styles.activeAddressPill}
          containerStyle={styles.activeAddressPillContainer}
          title={shardName ?? ''}
          titleColor="gray"
          RightIcon={<ChevronMiniUp />}
          onPress={handleOpenActiveAddressModal}
        />
      </View>
      <QuaiPayButton
        style={styles.requestButton}
        type="secondary"
        title={t('request')}
        onPress={goToInputScreen}
      />
      <QuaiPayButton
        underline
        type="secondary"
        titleType="default"
        titleColor="gray"
        onPress={goToLearnMore}
        title={t('learnMore')}
      />
      <View style={styles.separator} />
      <QuaiPayActiveAddressModal ref={activeAddressModalRef} />
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 80,
    },
    username: {
      fontSize: 20,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 0,
      gap: 8,
      marginLeft: 8, // To compensate the gap and keep address centered
    },
    activeAddressPillContainer: {
      marginTop: 20,
    },
    activeAddressPill: {
      borderColor: theme.border,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'center', // to avoid stretching horizontally
    },
    walletView: {
      height: Dimensions.get('window').height / 2,
      paddingVertical: 40,
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: theme.surface,
      borderColor: theme.border,
    },
    requestButton: {
      marginTop: 15,
      backgroundColor: theme.surface,
    },
    separator: {
      flex: 1,
    },
  });
