/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavChevronLeft from 'src/../assets/icons/navChevronLeft.svg';

import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';
import { QuaiPayText } from './QuaiPayText';
import { styledColors } from 'src/shared/styles';
import { useTheme } from 'src/shared/context/themeContext';

const MARGIN_RIGHT_OFFSET = 16;

interface QuaiPayContentProps {
  children: React.ReactNode;
  handleGoBack?: () => void;
  navButton?: boolean;
  noInsetBottom?: boolean;
  title?: string | null;
  hasBackgroundVariant?: boolean;
}

export const QuaiPayContent: React.FC<QuaiPayContentProps> = ({
  children,
  handleGoBack,
  navButton = true,
  noInsetBottom = false,
  title,
  hasBackgroundVariant = true,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyle(themedStyle);
  const isDarkMode = useTheme();

  const goBack = useCallback(
    () =>
      handleGoBack
        ? handleGoBack()
        : navigation.canGoBack()
        ? navigation.goBack()
        : false,
    [handleGoBack, navigation],
  );

  const backgroundColor = isDarkMode
    ? hasBackgroundVariant
      ? styledColors.dark
      : styledColors.black
    : hasBackgroundVariant
    ? styledColors.light
    : styledColors.white;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: insets.top,
          paddingBottom: noInsetBottom ? 0 : insets.bottom,
        },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <View style={styles.header}>
        {navButton && (
          <Pressable
            onPress={goBack}
            style={({ pressed }) => [
              pressed && { opacity: 0.5 },
              styles.navIconMargin,
            ]}
          >
            <NavChevronLeft />
          </Pressable>
        )}
        {!!title && (
          <QuaiPayText
            type="H2"
            style={[styles.title, navButton && styles.titleMargin]}
          >
            {title}
          </QuaiPayText>
        )}
      </View>
      {children}
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 8,
      minHeight: 60,
    },
    navIconMargin: {
      marginRight: MARGIN_RIGHT_OFFSET,
    },
    titleMargin: {
      marginRight: MARGIN_RIGHT_OFFSET + 12,
    },
    title: {
      flex: 1,
      color: theme.primary,
    },
  });
