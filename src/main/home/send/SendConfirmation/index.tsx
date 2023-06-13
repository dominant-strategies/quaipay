import React from 'react';
import {
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { QuaiPayText } from 'src/shared/components';
import { styledColors } from 'src/shared/styles';
import { useAmountInput } from 'src/shared/hooks';
import { abbreviateAddress } from 'src/shared/services/quais';
import ShareControl from '../../receive/ShareControl';
import Done from 'src/shared/assets/done.svg';
import { Currency } from 'src/shared/types';
import { goHome } from 'src/shared/navigation/utils';

type SendConfirmationScreenProps = {
  navigation: any;
  route: any;
};

function SendConfirmationScreen({ route }: SendConfirmationScreenProps) {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const { address, username, tip, wallet, from } = route.params;
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
  };
  const textColor = {
    color: isDarkMode ? styledColors.white : styledColors.black,
  };
  const lightTextColor = {
    color: isDarkMode ? '#808080' : '#808080',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View
            style={[
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
            <Done />
            <QuaiPayText style={[styles.confirmText, textColor]} type="default">
              Payment Confirmed!
            </QuaiPayText>
            <QuaiPayText style={[styles.unit, textColor]} type="paragraph">
              {eqInput.value} {eqInput.unit}
            </QuaiPayText>
            <QuaiPayText
              style={[styles.unitUSD, lightTextColor]}
              type="paragraph"
            >
              {input.value} {input.unit}
            </QuaiPayText>
            <QuaiPayText style={[styles.ends, lightTextColor]} type="bold">
              from
            </QuaiPayText>
            <QuaiPayText type="bold" style={[styles.username, textColor]}>
              {from}
            </QuaiPayText>
            <QuaiPayText type="bold" style={[styles.address, lightTextColor]}>
              {abbreviateAddress(wallet?.address as string)}
            </QuaiPayText>
            <QuaiPayText style={[styles.ends, lightTextColor]} type="bold">
              sent to
            </QuaiPayText>
            <QuaiPayText style={[styles.username, textColor]} type="bold">
              {username}
            </QuaiPayText>
            <QuaiPayText type="bold" style={[styles.address, lightTextColor]}>
              {abbreviateAddress(address)}
            </QuaiPayText>
            <View style={styles.shareControl}>
              <ShareControl />
            </View>
            <TouchableOpacity style={[styles.button, styles.saveContact]}>
              <QuaiPayText style={textColor} type="H3">
                Save Receipent to Contacts
              </QuaiPayText>
            </TouchableOpacity>
            <TouchableOpacity onPress={goHome} style={styles.button}>
              <QuaiPayText style={{ color: styledColors.white }} type="H3">
                Complete
              </QuaiPayText>
            </TouchableOpacity>
          </View>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  confirmText: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '700',
    marginVertical: 16,
  },
  unit: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 2,
  },
  unitUSD: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 2,
  },
  ends: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 16,
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
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
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
    paddingTop: 32,
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
    backgroundColor: '#0066FF',
    alignSelf: 'center',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    width: '96%',
    alignItems: 'center',
    paddingVertical: 16,
    maxHeight: 50,
  },
});

export default SendConfirmationScreen;
