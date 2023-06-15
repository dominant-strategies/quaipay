import React from 'react';
import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { styledColors, typography } from '../styles';

export enum CardSize {
  Small = 'small',
  Medium = 'medium',
}

type QuaiPayCardProps = {
  address: string;
  fiatAmount: string;
  quaiAmount: string;
  size: CardSize;
  title: string;
  zone: string;
};

export const QuaiPayCard: React.FC<QuaiPayCardProps> = ({
  address,
  fiatAmount,
  quaiAmount,
  size,
  title,
  zone,
}) => {
  const styles = useThemedStyle(themedStyle);
  const height = size === CardSize.Small ? 150 : 185;

  return (
    <View style={[styles.wrapper, { height }]}>
      <View style={styles.textWrapper}>
        <Text style={[typography.H3, styles.colorOverwrite]}>{title}</Text>
        <Text style={[typography.H2, styles.colorOverwrite]}>
          {quaiAmount}&nbsp;QUAI
        </Text>
        <Text style={[typography.default, styles.colorOverwrite]}>
          ${fiatAmount}&nbsp;USD
        </Text>
        <View style={styles.address}>
          <Text style={[typography.default, styles.colorOverwrite]}>
            <Text style={styles.bold}>{zone}:&nbsp;</Text>
            {address}
          </Text>
        </View>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png',
        }}
      />
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    address: {
      marginTop: 20,
    },
    bold: {
      fontWeight: '700',
    },
    colorOverwrite: {
      color: styledColors.white,
    },
    image: {
      borderRadius: 70,
      height: 68,
      width: 68,
    },
    textWrapper: {
      alignItems: 'flex-start',
    },
    wrapper: {
      width: Dimensions.get('window').width - 32,
      paddingTop: 26,
      paddingLeft: 20,
      paddingRight: 26,
      justifyContent: 'space-between',
      alignSelf: 'center',
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.normal,
    },
  });
