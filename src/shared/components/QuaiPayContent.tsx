/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import {
  Pressable,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { QuaiPayText } from 'src/shared/components';
import { styledColors } from 'src/shared/styles';
import { useTheme } from 'src/shared/context/themeContext';
import NavChevronLeft from 'src/../assets/icons/navChevronLeft.svg';

import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';

const MARGIN_RIGHT_OFFSET = 16;

interface QuaiPayContentProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  handleGoBack?: () => void;
  hasBackgroundVariant?: boolean;
  noNavButton?: boolean;
  noInsetBottom?: boolean;
  title?: string | null;
}

export const QuaiPayContent: React.FC<QuaiPayContentProps> = ({
  children,
  containerStyle,
  handleGoBack,
  hasBackgroundVariant = false,
  noNavButton = false,
  noInsetBottom = false,
  title,
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
      ? styledColors.black
      : styledColors.dark
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
        ...(containerStyle ? [containerStyle] : []),
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <View style={styles.header}>
        {noNavButton ? null : (
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
            style={[styles.title, noNavButton && styles.noTitleMargin]}
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
      marginRight: MARGIN_RIGHT_OFFSET - 12,
    },
    title: {
      flex: 1,
      color: theme.primary,
      marginRight: MARGIN_RIGHT_OFFSET,
    },
    noTitleMargin: {
      marginRight: 0,
    },
  });
