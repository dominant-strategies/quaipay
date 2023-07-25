import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
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
  const { t } = useTranslation();
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
    return <QuaiPayLoader text={'Loading...'} />;
  }

  const copyToClipboard = () => {
    Clipboard.setString(wallet.address);
    showSnackBar({
      message: t('home.receive.copiedToClipboard'),
      moreInfo: abbreviateAddress(wallet.address),
      type: 'success',
    });
  };

  const handleOpenActiveAddressModal = () => {
    activeAddressModalRef.current?.present();
  };

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
        <QuaiPayText type="H2" style={styles.ownerName}>
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
          RightIcon={CopyOutline}
        />
        <QuaiPayButton
          pill
          outlined
          type="secondary"
          style={styles.activeAddressPill}
          containerStyle={styles.activeAddressPillContainer}
          title={shardName ?? ''}
          RightIcon={ChevronMiniUp}
          onPress={handleOpenActiveAddressModal}
        />
      </View>
      <QuaiPayButton
        style={styles.requestButton}
        type="secondary"
        title={t('common.request')}
        onPress={() => {
          navigation.navigate('ReceiveStack', {
            screen: 'ReceiveAmountInput',
          });
        }}
      />
      <QuaiPayButton
        underline
        type="secondary"
        titleType="default"
        titleColor="gray"
        onPress={() => {}}
        title={t('common.learnMore')}
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
    ownerName: {
      fontSize: 20,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 0,
      gap: 8,
      marginLeft: 8, // To compensate the gap and keep address centered
    },
    activeAddressPillContainer: {
      marginTop: 20,
    },
    activeAddressPill: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'center', // to avoid stretching horizontally
    },
    walletView: {
      height: Dimensions.get('window').height / 2,
      width: '100%',
      paddingVertical: 40,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
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
