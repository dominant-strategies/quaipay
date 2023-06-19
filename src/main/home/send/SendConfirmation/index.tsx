import React, { useState } from 'react';
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
import { QuaiPayBanner, QuaiPayText } from 'src/shared/components';
import { buttonStyle, styledColors } from 'src/shared/styles';
import { useAmountInput } from 'src/shared/hooks';
import { abbreviateAddress } from 'src/shared/services/quais';
import ShareControl from '../../receive/ShareControl';
import { Currency } from 'src/shared/types';
import { SendStackParamList } from '../SendStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TxStatus, TxStatusIndicator } from './TxStatusIndicator';
import { BottomButton } from 'src/main/home/send/SendConfirmation/BottomButton';

type SendConfirmationScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendConfirmation'
>;

function SendConfirmationScreen({ route }: SendConfirmationScreenProps) {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const { wallet, sender, address, receiver, tip } = route.params;
  const [showError, setShowError] = useState(false);
  const [txStatus, setTxStatus] = useState(TxStatus.pending);
  const { eqInput, input } = useAmountInput(
    `${
      Number(
        route.params.input.unit === Currency.USD
          ? route.params.input.value
          : route.params.eqInput.value,
      ) + Number(tip)
    }`,
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <QuaiPayBanner
          boldText="Something went wrong."
          showError={showError}
          text="Please retry the transaction."
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
            {abbreviateAddress(wallet.address)}
          </QuaiPayText>
          <QuaiPayText style={styles.ends} type="bold">
            {t('common.sentTo')}
          </QuaiPayText>
          <QuaiPayText style={styles.username} type="bold">
            {receiver}
          </QuaiPayText>
          <QuaiPayText
            type="bold"
            themeColor="secondary"
            style={styles.address}
          >
            {abbreviateAddress(address)}
          </QuaiPayText>
          <View style={styles.shareControl}>
            <ShareControl />
          </View>
          <TouchableOpacity style={[styles.button, styles.saveContact]}>
            <QuaiPayText type="H3">{t('home.send.saveToContacts')}</QuaiPayText>
          </TouchableOpacity>
          <BottomButton txStatus={txStatus} />
        </ScrollView>
        <TouchableOpacity onPress={() => {}}>
          <QuaiPayText
            onPress={() => {
              Linking.openURL(
                `https://paxos1.colosseum.quaiscan.io/tx/${route.params.transaction.hash}`,
              );
            }}
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
