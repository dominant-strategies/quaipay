import React from 'react';
import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { styledColors } from '../styles';
import { QuaiPayText } from './QuaiPayText';

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
        <QuaiPayText style={styles.colorOverwrite} type="H3">
          {title}
        </QuaiPayText>
        <QuaiPayText style={styles.colorOverwrite} type="H2">
          {quaiAmount}&nbsp;QUAI
        </QuaiPayText>
        <QuaiPayText style={styles.colorOverwrite}>
          ${fiatAmount}&nbsp;USD
        </QuaiPayText>
        <View style={styles.address}>
          <QuaiPayText style={styles.colorOverwrite}>
            <QuaiPayText style={styles.bold}>{zone}:&nbsp;</QuaiPayText>
            {address}
          </QuaiPayText>
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
