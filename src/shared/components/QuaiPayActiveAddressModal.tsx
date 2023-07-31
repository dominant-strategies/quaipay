import React, { forwardRef } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Theme, Zone } from 'src/shared/types';
import Done from 'src/shared/assets/done.svg';
import GreyDone from 'src/shared/assets/greyDone.svg';
import { abbreviateAddress } from 'src/shared/services/quais';
import { useWalletContext } from 'src/shared/context/walletContext';
import { useThemedStyle } from 'src/shared/hooks';
import { allNodeData } from 'src/shared/constants/nodeData';
import { useTranslation } from 'react-i18next';

import { QuaiPayBottomSheetModal } from '../components/QuaiPayBottomSheetModal/QuaiPayBottomSheetModal';
import { QuaiPayText } from '../components/QuaiPayText';
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';
import { QuaiPayLoader } from 'src/shared/components/QuaiPayLoader';

const zones = Object.keys(Zone) as Zone[];

interface QuaiPayActiveAddressModalProps {
  balances?: Record<string, string>;
}

export const QuaiPayActiveAddressModal = forwardRef<
  BottomSheetModal,
  QuaiPayActiveAddressModalProps
>(({ balances }, ref) => {
  const quaiRate = useQuaiRate();
  const { zone: selectedZone, setZone, walletObject } = useWalletContext();
  const styles = useThemedStyle(themedStyle);
  const { t } = useTranslation('translation', { keyPrefix: 'wallet' });

  if (!quaiRate) {
    return <QuaiPayLoader text={t('wallet.loading')} />;
  }

  return (
    <QuaiPayBottomSheetModal ref={ref}>
      <QuaiPayText style={styles.title}>{t('chooseAddress')}</QuaiPayText>
      <ScrollView>
        <View style={styles.wrapper}>
          {zones.map((zone: Zone) => {
            const isSelected = selectedZone === zone;
            return (
              <Pressable
                key={zone}
                onPress={() => {
                  if (!isSelected) {
                    setZone(zone);
                  }
                }}
              >
                <View
                  style={
                    isSelected
                      ? [styles.card, styles.cardSelected]
                      : styles.card
                  }
                >
                  <View style={styles.leftColumn}>
                    {isSelected ? (
                      <Done width={20} height={20} />
                    ) : (
                      <GreyDone width={20} height={20} />
                    )}
                    <View style={styles.leftText}>
                      <QuaiPayText
                        type="H3"
                        style={
                          isSelected
                            ? [styles.textNotSelected, styles.textSelected]
                            : styles.textNotSelected
                        }
                      >
                        {allNodeData[zone].name}
                      </QuaiPayText>
                      <QuaiPayText themeColor="secondary">
                        {abbreviateAddress(walletObject![zone].address)}
                      </QuaiPayText>
                    </View>
                  </View>
                  <View style={styles.rightText}>
                    <QuaiPayText
                      type="H3"
                      style={
                        isSelected
                          ? [styles.textNotSelected, styles.textSelected]
                          : styles.textNotSelected
                      }
                    >
                      {(balances && balances[walletObject![zone].address]) ||
                        '0'}{' '}
                      Quai
                    </QuaiPayText>
                    <QuaiPayText themeColor="secondary">
                      $
                      {balances
                        ? balances[walletObject![zone].address]
                          ? (
                              Number(balances[walletObject![zone].address]) *
                              quaiRate.quote
                            ).toFixed(2)
                          : '0.00'
                        : '0.00'}
                    </QuaiPayText>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </QuaiPayBottomSheetModal>
  );
});

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      padding: 8,
      backgroundColor: theme.surface,
    },
    title: {
      backgroundColor: theme.surface,
    },
    card: {
      alignItems: 'center',
      borderColor: theme.border,
      borderRadius: 4,
      borderWidth: 2,
      backgroundColor: theme.surface,
      flexDirection: 'row',
      height: 72,
      marginVertical: 4,
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    cardSelected: {
      borderColor: theme.normal,
    },
    textNotSelected: {
      color: theme.primary,
    },
    textSelected: {
      color: theme.normal,
    },
    leftText: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginLeft: 8,
    },
    rightText: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    leftColumn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
