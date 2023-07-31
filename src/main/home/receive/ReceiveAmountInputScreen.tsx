import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ExchangeIcon from 'src/shared/assets/exchange.svg';
import {
  useProfilePicture,
  useThemedStyle,
  useUsername,
  useWallet,
} from 'src/shared/hooks';
import { useAmountInput } from 'src/shared/hooks/useAmountInput';
import {
  QuaiPayAvatar,
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayAmountDisplay,
  QuaiPayKeyboard,
  QuaiPayText,
} from 'src/shared/components';
import { Currency, Theme } from 'src/shared/types';
import { abbreviateAddress } from 'src/shared/services/quais';
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';

import { ReceiveStackScreenProps } from './ReceiveStack';

export const ReceiveAmountInputScreen: React.FC<
  ReceiveStackScreenProps<'ReceiveAmountInput'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const profilePicture = useProfilePicture();
  const username = useUsername();
  const wallet = useWallet();
  const quaiRate = useQuaiRate();
  const { eqInput, input, keyboard, onSwap } = useAmountInput(
    undefined,
    quaiRate,
  );

  const goToGeneratedQR = () =>
    navigation.navigate('ReceiveQR', {
      amount: Number(input.unit === Currency.USD ? input.value : eqInput.value),
    });

  return (
    <QuaiPayContent title={t('common.request')}>
      <View style={styles.separator} />
      <View style={styles.nameAndPFPContainer}>
        <QuaiPayAvatar
          containerStyle={styles.image}
          iconSize={60}
          profilePicture={profilePicture ?? ''}
        />
        <QuaiPayText type="H3" style={styles.username}>
          {username}
        </QuaiPayText>
        <QuaiPayText>{abbreviateAddress(wallet?.address)}</QuaiPayText>
      </View>
      <View style={styles.inputDisplayContainer}>
        <QuaiPayAmountDisplay
          prefix={input.unit === 'USD' ? '$' : undefined}
          suffix={` ${input.unit}`}
          value={input.value}
        />
      </View>
      <View style={styles.row}>
        <QuaiPayText>
          {eqInput.unit === 'USD' && '$'}
          {eqInput.value} {eqInput.unit}
        </QuaiPayText>
        <QuaiPayButton
          pill
          outlined
          type="secondary"
          titleType="default"
          title={input.unit}
          onPress={onSwap}
          style={styles.swapButton}
          containerStyle={styles.swapButtonContainer}
          RightIcon={<ExchangeIcon color={styles.swapIcon.color} />}
        />
      </View>
      <QuaiPayButton
        disabled={Number(input.value) === 0}
        onPress={goToGeneratedQR}
        style={styles.continueButton}
        title={t('common.continue')}
      />
      <View style={styles.separator} />
      <QuaiPayKeyboard
        handleLeftButtonPress={keyboard.onDecimalButtonPress}
        handleRightButtonPress={keyboard.onDeleteButtonPress}
        onInputButtonPress={keyboard.onInputButtonPress}
      />
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      marginTop: 10,
    },
    swapButton: {
      borderColor: theme.border,
      paddingVertical: 6,
    },
    swapButtonContainer: {
      width: 75,
    },
    swapIcon: {
      color: theme.primary,
    },
    continueButton: {
      marginTop: 40,
      marginHorizontal: 16,
      marginBottom: 8,
    },
    inputDisplayContainer: {
      marginTop: 16,
    },
    image: {
      marginBottom: 0,
    },
    nameAndPFPContainer: {
      marginTop: 12,
      alignItems: 'center',
    },
    username: {
      marginTop: 8,
    },
    separator: {
      flex: 1,
    },
  });
