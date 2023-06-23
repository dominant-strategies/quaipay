import { Pressable, StyleSheet, TextInput } from 'react-native';
import MagnifyingGlass from '../assets/magnifyingGlass.svg';
import React from 'react';
import { Theme } from '../types';
import { useThemedStyle } from '../hooks/useThemedStyle';

type QuaiPaySearchbarProps = {
  placeholder: string;
  searchValue?: string;
  onSearchChange: (search: string) => void;
  onPress?: () => void;
};

export const QuaiPaySearchbar: React.FC<QuaiPaySearchbarProps> = ({
  placeholder,
  searchValue,
  onSearchChange,
  onPress,
}) => {
  const styles = useThemedStyle(themedStyle);

  return (
    <Pressable onPress={onPress} style={[styles.contactSearch]}>
      <MagnifyingGlass style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#808080"
        style={styles.searchInput}
        value={searchValue}
        onChangeText={onSearchChange}
      />
    </Pressable>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    contactSearch: {
      flexDirection: 'row',
      paddingLeft: 6,
      height: 32,
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: theme.surface,
    },
    searchIcon: {
      marginRight: 6,
    },
    searchInput: {
      color: theme.primary,
      width: '100%',
    },
  });
