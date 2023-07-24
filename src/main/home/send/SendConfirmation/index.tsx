import React, { useCallback, useEffect, useState } from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { QuaiPayBanner, QuaiPayText } from 'src/shared/components';
import { buttonStyle, styledColors } from 'src/shared/styles';
import { useAmountInput, useWallet } from 'src/shared/hooks';
import {
  abbreviateAddress,
  waitForTransaction,
} from 'src/shared/services/quais';
import ShareControl from 'src/main/home/receive/ShareControl';
import { Currency } from 'src/shared/types';
import { SendStackParamList } from '../SendStack';
import { TxStatus, TxStatusIndicator } from './TxStatusIndicator';
import { BottomButton } from 'src/main/home/send/SendConfirmation/BottomButton';
import { allNodeData } from 'src/shared/constants/nodeData';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { useZone } from 'src/shared/hooks/useZone';
import { addContact, useContacts } from 'src/shared/hooks/useContacts';
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';

type SendConfirmationScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendConfirmation'
>;

function SendConfirmationScreen({ route }: SendConfirmationScreenProps) {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const { sender, receiverAddress, receiverPFP, receiverUsername, tip } =
    route.params;
  const contacts = useContacts();
  const wallet = useWallet();
  const { zone } = useZone();
  const quaiRate = useQuaiRate();
  const { showSnackBar } = useSnackBar();
  const [connectionStatus, setConnectionStatus] = useState<NetInfoState>();
  const [showError, setShowError] = useState(false);
  const [contactSaved, setContactSaved] = useState(false);
  const [txStatus, setTxStatus] = useState(TxStatus.pending);
  // TODO: remove when setShowError is used
  console.log(setShowError);
  const nodeData = allNodeData[zone];
  const transactionUrl = `${nodeData.provider.replace('rpc.', '')}/tx/${
    route.params.transaction.hash
  }`;
  const { eqInput, input } = useAmountInput(
    `${
      Number(
        route.params.input.unit === Currency.USD
          ? route.params.input.value
          : route.params.eqInput.value,
      ) + Number(tip)
    }`,
    quaiRate,
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
    flex: 1,
  };

  const subscribeToTransaction = useCallback(() => {
    waitForTransaction(route.params.transaction.hash, zone)
      .then(receipt => {
        if (receipt?.status === 0) {
          setTxStatus(TxStatus.failed);
        } else if (receipt?.status === 1) {
          setTxStatus(TxStatus.success);
        }
      })
      .catch(error => {
        console.log(error);
        setTxStatus(TxStatus.failed);
      });
  }, [setTxStatus, route.params.transaction.hash]);

  useEffect(() => {
    // re-subscribe to transaction if internet connection is lost and regained
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state);
    });
    if (connectionStatus?.isInternetReachable === true) {
      subscribeToTransaction();
    } else {
      showSnackBar({
        message: t('home.send.noInternet'),
        moreInfo: t('home.send.noInternetMessage') as string,
        type: 'error',
      });
    }
    return () => {
      unsubscribe();
    };
  }, [connectionStatus?.isInternetReachable, subscribeToTransaction]);

  useEffect(() => {
    console.log('contacts', contacts);
    console.log('transaction', route.params.transaction);
    if (contacts) {
      contacts?.find(contact => contact.address === receiverAddress) &&
        setContactSaved(true);
    }
  }, [contacts]);

  const saveToContacts = () => {
    addContact({
      address: receiverAddress,
      username: receiverUsername!,
      profilePicture: receiverPFP!,
    }).then(() => {
      setContactSaved(true);
      showSnackBar({
        message: t('common.success'),
        moreInfo: t('home.send.savedToContacts') || '',
        type: 'success',
      });
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <QuaiPayBanner
          boldText={t('home.send.somethingWrong')}
          showError={showError}
          text={t('home.send.retryTransaction')}
        />
        <ScrollView
          contentContainerStyle={[
            styles.confirmation,
            {
              borderColor: isDarkMode
                ? styledColors.darkGray
                : styledColors.border,
              backgroundColor: isDarkMode
                ? styledColors.dark
                : styledColors.white,
            },
          ]}
        >
          <TxStatusIndicator txStatus={txStatus} />
          <QuaiPayText style={styles.unit}>
            {eqInput.value} {eqInput.unit}
          </QuaiPayText>
          <QuaiPayText style={styles.unitUSD}>
            {input.value} {input.unit}
          </QuaiPayText>
          <QuaiPayText style={styles.ends} type="bold">
            {t('common.from')}
          </QuaiPayText>
          <QuaiPayText type="bold" style={styles.username}>
            {sender}
          </QuaiPayText>
          <QuaiPayText
            type="bold"
            themeColor="secondary"
            style={styles.address}
          >
            {abbreviateAddress(wallet?.address)}
          </QuaiPayText>
          <QuaiPayText style={styles.ends} type="bold">
            {t('common.sentTo')}
          </QuaiPayText>
          <QuaiPayText style={styles.username} type="bold">
            {receiverUsername}
          </QuaiPayText>
          <QuaiPayText
            type="bold"
            themeColor="secondary"
            style={styles.address}
          >
            {abbreviateAddress(receiverAddress)}
          </QuaiPayText>
          <View style={styles.shareControl}>
            {/* TODO: ask product what should be shared here */}
            <ShareControl share={''} />
          </View>
          {receiverUsername && !contactSaved ? (
            <TouchableOpacity
              style={[styles.button, styles.saveContact]}
              disabled={contactSaved}
              onPress={saveToContacts}
            >
              <QuaiPayText type="H3">
                {t('home.send.saveToContacts')}
              </QuaiPayText>
            </TouchableOpacity>
          ) : null}
          <BottomButton txStatus={txStatus} />
        </ScrollView>
        <TouchableOpacity onPress={() => {}}>
          <QuaiPayText
            onPress={() => Linking.openURL(transactionUrl)}
            style={styles.quaiSnap}
          >
            {t('home.send.viewOnExplorer')}
          </QuaiPayText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  unit: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 2,
  },
  unitUSD: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 2,
    color: styledColors.gray,
  },
  ends: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 16,
    color: styledColors.gray,
  },
  username: {
    fontWeight: '700',
    fontSize: 16,
  },
  address: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  shareControl: {
    marginVertical: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    flex: 1,
  },
  confirmation: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    width: '92%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 64,
    marginTop: 16,
  },
  quaiSnap: {
    fontSize: 12,
    color: styledColors.gray,
    textDecorationLine: 'underline',
    marginVertical: 8,
  },
  saveContact: {
    backgroundColor: 'transparent',
    borderColor: '#808080',
    borderWidth: 1,
  },
  button: {
    ...buttonStyle.normal,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    minWidth: '96%',
    maxWidth: '96%',
    alignItems: 'center',
    height: 42,
    maxHeight: 50,
  },
});

export default SendConfirmationScreen;
