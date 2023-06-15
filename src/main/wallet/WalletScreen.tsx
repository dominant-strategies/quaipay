import React from 'react';

import { MainTabStackScreenProps } from '../MainStack';
import { QuaiPayContent, QuaiPayText } from '../../shared/components';
import { CardSize, QuaiPayCard } from '../../shared/components/QuaiPayCard';
import { Pressable, StyleSheet, View } from 'react-native';
import { Theme } from '../../shared/types';
import { useThemedStyle } from '../../shared/hooks/useThemedStyle';
import { useTranslation } from 'react-i18next';
import { styledColors, typography } from '../../shared/styles';

const WalletScreen: React.FC<MainTabStackScreenProps<'Wallet'>> = ({}) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);

  return (
    <QuaiPayContent navButton={false}>
      <View style={styles.cardWrapper}>
        <QuaiPayCard
          size={CardSize.Small}
          quaiAmount="142.123"
          address="0x123453.....0934823"
          zone="Cyprus-02"
          fiatAmount="1,000"
          title={t('wallet.balance')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.addressButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText style={[typography.H3, styles.colorOverwrite]}>
            {t('wallet.chooseAddress')}
          </QuaiPayText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.earnButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText style={[typography.H3]}>{t('wallet.earn')}</QuaiPayText>
        </Pressable>
      </View>
    </QuaiPayContent>
  );
};
const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    addressButton: {
      backgroundColor: theme.normal,
      width: 210,
    },
    button: {
      height: 32,
      justifyContent: 'center',
      borderRadius: 8,
    },
    buttonWrapper: {
      backgroundColor: theme.surface,
      borderRightWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: theme.border,
      height: 60,
    },
    cardWrapper: {
      marginBottom: 20,
    },
    colorOverwrite: {
      color: styledColors.white,
    },
    earnButton: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: styledColors.gray,
      width: 110,
    },
  });

export default WalletScreen;
