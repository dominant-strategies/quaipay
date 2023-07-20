import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import MagnifyingGlass from '../assets/magnifyingGlass.svg';
import Arrow from 'src/shared/assets/send.svg';
import { Theme } from '../types';
import { useThemedStyle } from 'src/shared/hooks';

type QuaiPaySearchbarProps = {
  placeholder: string;
  searchValue?: string;
  onSearchChange: (search: string) => void;
  onPress?: () => void;
  onPressRightIcon?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const QuaiPaySearchbar: React.FC<QuaiPaySearchbarProps> = ({
  placeholder,
  searchValue,
  onSearchChange,
  onPress,
  onPressRightIcon,
  style,
}) => {
  const styles = useThemedStyle(themedStyle);

  return (
    <Pressable
      onPress={onPress}
      style={style ? [styles.contactSearch, style] : styles.contactSearch}
    >
      <MagnifyingGlass style={styles.searchIcon} />
      <TextInput
        onPressOut={onPress}
        placeholder={placeholder}
        placeholderTextColor="#808080"
        style={styles.searchInput}
        value={searchValue}
        onChangeText={onSearchChange}
      />
      {onPressRightIcon && (
        <Pressable onPress={onPressRightIcon}>
          <Arrow
            width={18}
            fill={styles.rightIcon.color}
            style={styles.rightIcon}
          />
        </Pressable>
      )}
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
      flex: 1,
    },
    rightIcon: {
      color: theme.primary,
      marginRight: 6,
      textAlign: 'center',
    },
  });
