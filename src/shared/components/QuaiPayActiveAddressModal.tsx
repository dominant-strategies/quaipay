import React, { forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { QuaiPayBottomSheetModal, QuaiPayText } from 'src/shared/components';
import { Theme, Zone } from 'src/shared/types';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Done from 'src/shared/assets/done.svg';
import GreyDone from 'src/shared/assets/greyDone.svg';
import { abbreviateAddress } from 'src/shared/services/quais';
import { useWalletContext } from 'src/shared/context/walletContext';
import { useThemedStyle } from 'src/shared/hooks';
import { allNodeData } from 'src/shared/constants/nodeData';

const zones = Object.keys(Zone) as Zone[];

export const QuaiPayActiveAddressModal = forwardRef<BottomSheetModal>(
  ({}, ref) => {
    const { zone: selectedZone, setZone, walletObject } = useWalletContext();
    const styles = useThemedStyle(themedStyle);

    return (
      <QuaiPayBottomSheetModal ref={ref}>
        <QuaiPayText style={styles.title}>Choose Active Address</QuaiPayText>
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
                        XXXX Quai
                      </QuaiPayText>
                      <QuaiPayText themeColor="secondary">$0.00</QuaiPayText>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </QuaiPayBottomSheetModal>
    );
  },
);

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
