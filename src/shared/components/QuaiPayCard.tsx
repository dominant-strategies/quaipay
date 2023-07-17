import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import makeBlockie from 'ethereum-blockies-base64';

import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';
import { styledColors } from '../styles';
import { QuaiPayText } from './QuaiPayText';
import { useProfilePicture } from '../hooks';

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
  const profilePicture = useProfilePicture();

  const profileImg = profilePicture ?? makeBlockie(address);

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
            <QuaiPayText style={[styles.bold, styles.colorOverwrite]}>
              {zone}:&nbsp;
            </QuaiPayText>
            {address}
          </QuaiPayText>
        </View>
      </View>
      <Image style={styles.image} source={{ uri: profileImg }} />
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
      borderColor: styledColors.white,
      borderWidth: 2,
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
