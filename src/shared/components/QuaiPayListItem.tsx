import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from '../types';
import { QuaiPayText } from './QuaiPayText';
import { styledColors } from '../styles';
import { abbreviateAddress } from 'src/shared/services/quais';

type QuaiPayListItemProps = {
  picture: string | React.ReactNode;
  name: string;
  date?: string;
  quaiAmount?: string;
  fiatAmount?: string;
  address?: string;
};

export const QuaiPayListItem: React.FC<QuaiPayListItemProps> = ({
  picture,
  name,
  date,
  quaiAmount,
  fiatAmount,
  address,
}) => {
  const styles = useThemedStyle(themedStyle);

  return (
    <View style={styles.wrapper}>
      {typeof picture === 'string' ? (
        <Image source={{ uri: picture }} style={styles.image} />
      ) : (
        <View style={styles.image}>{picture}</View>
      )}
      <View style={styles.textWrapper}>
        <View style={styles.leftTextWrapper}>
          <QuaiPayText type="paragraph">{name}</QuaiPayText>
          {date ? (
            <QuaiPayText style={styles.colorOverwrite}>{date}</QuaiPayText>
          ) : null}
        </View>
        <View style={styles.separator} />
        {quaiAmount ? (
          <View style={styles.rightTextWrapper}>
            <QuaiPayText>{quaiAmount}&nbsp;QUAI</QuaiPayText>
            <QuaiPayText style={styles.colorOverwrite}>
              ${fiatAmount}&nbsp;USD
            </QuaiPayText>
          </View>
        ) : (
          <View style={styles.rightTextWrapper}>
            <QuaiPayText style={styles.colorOverwrite}>
              {abbreviateAddress(address)}
            </QuaiPayText>
          </View>
        )}
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.surface,
      marginBottom: 16,
    },
    textWrapper: {
      flex: 1,
      flexDirection: 'row',
      marginLeft: 4,
      alignItems: 'center',
    },
    leftTextWrapper: {
      alignItems: 'flex-start',
    },
    rightTextWrapper: {
      alignItems: 'flex-end',
    },
    colorOverwrite: {
      color: styledColors.gray,
    },
    separator: {
      flex: 1,
    },
  });
