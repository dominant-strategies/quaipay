import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';
import { QuaiPayText } from './QuaiPayText';
import { styledColors } from '../styles';

type QuaiPayListItemProps = {
  picture: string;
  name: string;
  date: string;
  quaiAmount: string;
  fiatAmount: string;
};

export const QuaiPayListItem: React.FC<QuaiPayListItemProps> = ({
  picture,
  name,
  date,
  quaiAmount,
  fiatAmount,
}) => {
  const styles = useThemedStyle(themedStyle);

  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: picture }} style={styles.image} />
      <View style={styles.textWrapper}>
        <View style={styles.leftTextWrapper}>
          <QuaiPayText style={styles.weightOverwrite} type="H3">
            {name}
          </QuaiPayText>
          <QuaiPayText style={styles.colorOverwrite}>{date}</QuaiPayText>
        </View>
        <View style={styles.rightTextWrapper}>
          <QuaiPayText>{quaiAmount}&nbsp;QUAI</QuaiPayText>
          <QuaiPayText style={styles.colorOverwrite}>
            ${fiatAmount}&nbsp;USD
          </QuaiPayText>
        </View>
      </View>
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    image: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 16,
      height: 32,
      width: 32,
    },
    wrapper: {
      flexDirection: 'row',
      backgroundColor: theme.surface,
      marginBottom: 16,
    },
    textWrapper: {
      flexDirection: 'row',
      width: Dimensions.get('window').width - 68,
      marginLeft: 4,
      justifyContent: 'space-between',
    },
    leftTextWrapper: {
      alignItems: 'flex-start',
    },
    rightTextWrapper: {
      alignItems: 'flex-end',
    },
    weightOverwrite: {
      fontWeight: '400',
    },
    colorOverwrite: {
      color: styledColors.gray,
    },
  });
