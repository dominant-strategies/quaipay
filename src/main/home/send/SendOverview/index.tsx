import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import {
  QuaiPayBanner,
  QuaiPayInputDisplay,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { buttonStyle, fontStyle, styledColors } from 'src/shared/styles';
import { useAmountInput, useWallet } from 'src/shared/hooks';
import { transferFunds } from 'src/shared/services/transferFunds';
import { Currency, Transaction } from 'src/shared/types';
import { abbreviateAddress } from 'src/shared/services/quais';
import { dateToLocaleString } from 'src/shared/services/dateUtil';
import { useZone } from 'src/shared/hooks/useZone';
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';

import { SendStackParamList } from '../SendStack';

type SendOverviewProps = NativeStackScreenProps<
  SendStackParamList,
  'SendOverview'
>;

function SendOverviewScreen({ route, navigation }: SendOverviewProps) {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const {
    receiverAddress,
    receiverPFP,
    receiverUsername,
    tip,
    tipInUSD,
    amountInUSD,
    amountInQUAI,
  } = route.params;
  const wallet = useWallet();
  const { zone } = useZone();
  const quaiRate = useQuaiRate();
  const { eqInput, input, onSwap } = useAmountInput(
    `${Number(amountInUSD) + Number(tipInUSD)}`,
    quaiRate,
  );
  const [gasFee, setGasFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
  };

  useEffect(() => {
    // TODO: estimate gas before sending
    // estimateGas(address, eqInput.value).then(gas => console.log('gas', gas));
    setGasFee(21000 * 0.000000001);
  }, []);

  const send = () => {
    setLoading(true);
    wallet &&
      transferFunds(receiverAddress, amountInQUAI, wallet.privateKey, zone)
        .then(res => {
          setShowError(false);
          setLoading(false);
          navigation.navigate('SendConfirmation', {
            transaction: res as Transaction,
            ...route.params,
          });
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          err.reason.includes('insufficient funds') && setShowError(true);
        });
  };

  if (!quaiRate) {
    return <QuaiPayLoader text="Getting updated rate" />;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.mainContainer}>
        <View style={styles.bannerWrapper}>
          <View style={styles.banner}>
            <QuaiPayBanner
              boldText="Insufficient Funds."
              showError={showError}
              text="You need more QUAI."
            />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={[
              styles.overview,
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
            <View style={styles.container}>
              <QuaiPayText
                style={[
                  styles.amountUnit,
                  {
                    color: isDarkMode ? styledColors.gray : styledColors.black,
                  },
                ]}
              >
                {parseFloat(Number(eqInput.value).toFixed(6))} {eqInput.unit}
              </QuaiPayText>
              <QuaiPayInputDisplay
                value={parseFloat(Number(input.value).toFixed(6)).toString()}
                suffix={` ${input.unit}`}
              />
              <TouchableOpacity onPress={onSwap} style={[styles.exchangeUnit]}>
                <Text
                  style={{
                    color: isDarkMode ? styledColors.white : styledColors.black,
                  }}
                >
                  {input.unit}
                </Text>
                <ExchangeIcon
                  color={isDarkMode ? styledColors.white : styledColors.black}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.border,
                {
                  backgroundColor: isDarkMode
                    ? styledColors.darkGray
                    : styledColors.border,
                },
              ]}
            />
            <Text style={styles.date}>{dateToLocaleString(new Date())}</Text>
            <Image style={styles.image} source={{ uri: receiverPFP }} />
            <View style={styles.receiver}>
              <QuaiPayText style={styles.username} type="paragraph">
                {t('common:to')} {receiverUsername}
              </QuaiPayText>
              <QuaiPayText themeColor="secondary" style={styles.wallet}>
                {abbreviateAddress(receiverAddress)}
              </QuaiPayText>
            </View>
            <View
              style={[
                styles.border,
                {
                  backgroundColor: isDarkMode
                    ? styledColors.darkGray
                    : styledColors.border,
                },
              ]}
            />
            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <View style={styles.detailLabel}>
                  <QuaiPayText type="paragraph">
                    {t('home.send.sending')}
                  </QuaiPayText>
                </View>
                <View>
                  <Text style={styles.unit}>
                    {eqInput.value} {eqInput.unit}
                  </Text>
                  <Text style={styles.unitUSD}>
                    {input.unit === Currency.USD
                      ? `$${parseFloat(Number(input.value).toFixed(6))} ${
                          input.unit
                        }`
                      : `${parseFloat(Number(input.value).toFixed(6))} ${
                          input.unit
                        }`}
                  </Text>
                </View>
              </View>
              {tip && Number(tip) > 0 ? (
                <View style={styles.details}>
                  <View style={styles.detailLabel}>
                    <QuaiPayText type="paragraph">
                      {t('home.send.includedTip')}
                    </QuaiPayText>
                  </View>
                  <View>
                    <Text style={styles.unit}>
                      {input.value === Currency.USD
                        ? `$${parseFloat(Number(tip).toFixed(6))} ${
                            Currency.USD
                          }`
                        : `${
                            parseFloat(Number(tip).toFixed(6)) * quaiRate.quote
                          } ${Currency.QUAI}`}
                    </Text>
                    <Text style={styles.unitUSD}>
                      {input.value === Currency.USD
                        ? `${
                            parseFloat(Number(tip).toFixed(6)) * quaiRate.quote
                          } ${Currency.QUAI}`
                        : `$${parseFloat(Number(tip).toFixed(6))} ${
                            Currency.USD
                          }`}
                    </Text>
                  </View>
                </View>
              ) : null}
              <View style={styles.details}>
                <View style={styles.detailLabel}>
                  <QuaiPayText type="paragraph">
                    {t('home.send.gasFee')}
                  </QuaiPayText>
                </View>
                <View>
                  <Text style={styles.unit}>
                    {gasFee.toFixed(5)} {eqInput.unit}
                  </Text>
                  <Text style={styles.unitUSD}>
                    {(gasFee * quaiRate.base).toFixed(2)} {input.unit}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.border,
                {
                  backgroundColor: isDarkMode
                    ? styledColors.darkGray
                    : styledColors.border,
                },
              ]}
            />
            <View style={styles.total}>
              <View style={styles.detailLabel}>
                <QuaiPayText type="paragraph">
                  {t('home.send.totalCost')}
                </QuaiPayText>
              </View>
              <View>
                <Text style={styles.unit}>
                  {eqInput.value} {eqInput.unit}
                </Text>
                <Text style={styles.unitUSD}>
                  {input.unit === Currency.USD
                    ? `$${parseFloat(Number(input.value).toFixed(6))} ${
                        input.unit
                      }`
                    : `${parseFloat(Number(input.value).toFixed(6))} ${
                        input.unit
                      }`}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => {}}>
          <QuaiPayText style={styles.learnMoreText}>
            {t('common.learnMore')}
          </QuaiPayText>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          onPress={send}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator color={styledColors.white} />
          ) : (
            <QuaiPayText
              type="H3"
              style={{
                color: styledColors.white,
              }}
            >
              {`${t('home.send.pay')} $(${(
                Number(amountInUSD) + Number(tipInUSD)
              ).toFixed(2)})`}
            </QuaiPayText>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerWrapper: {
    alignItems: 'center',
  },
  banner: {
    width: '90%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  receiver: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overview: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exchangeUnit: {
    width: 90,
    height: 24,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: styledColors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginVertical: 10,
  },
  border: {
    width: '100%',
    height: 1,
  },
  date: {
    marginVertical: 16,
    fontWeight: '600',
    fontSize: 14,
  },
  username: {
    ...fontStyle.fontH3,
    marginVertical: 8,
    fontSize: 14,
  },
  wallet: {
    marginVertical: 8,
  },
  detailsContainer: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailLabel: {
    height: '100%',
  },
  total: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  alignRight: {
    textAlign: 'right',
  },
  learnMoreText: {
    color: styledColors.gray,
    textDecorationLine: 'underline',
    marginVertical: 8,
  },
  button: {
    ...buttonStyle.normal,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 16,
    maxHeight: 50,
  },
  amountUnit: {
    marginVertical: 8,
  },
  unit: {
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 14,
  },
  unitUSD: {
    fontSize: 14,
    color: styledColors.gray,
    textAlign: 'right',
  },
  image: {
    borderRadius: 70,
    height: 60,
    width: 60,
  },
});

export default SendOverviewScreen;
