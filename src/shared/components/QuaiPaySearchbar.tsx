import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import MagnifyingGlass from '../assets/magnifyingGlass.svg';
import React from 'react';
import { Theme } from '../types';
import { styledColors } from '../styles';
import { useThemedStyle } from '../hooks/useThemedStyle';

type QuaiPaySearchbarProps = {
  marginHorizontal: number;
  placeholder: string;
};

export const QuaiPaySearchbar: React.FC<QuaiPaySearchbarProps> = ({
  marginHorizontal,
  placeholder,
}) => {
  const styles = useThemedStyle(themedStyle);

  return (
    <View
      style={[
        styles.contactSearch,
        {
          marginHorizontal,
          width: Dimensions.get('window').width - marginHorizontal * 2,
        },
      ]}
    >
      <MagnifyingGlass style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#808080"
        style={styles.searchInput}
      />
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    contactSearch: {
      flexDirection: 'row',
      paddingLeft: 6,
      height: 32,
      marginHorizontal: 32,
      marginTop: 22,
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderColor: theme.border,
      borderWidth: 2,
      borderRadius: 4,
      backgroundColor: styledColors.white,
    },
    searchIcon: {
      marginRight: 6,
    },
    searchInput: {
      width: '100%',
    },
  });
