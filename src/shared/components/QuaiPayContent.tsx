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

import { styledColors } from 'src/shared/styles';
import { useTheme } from 'src/shared/context/themeContext';
import NavChevronLeft from 'src/../assets/icons/navChevronLeft.svg';

import { QuaiPayText } from './QuaiPayText';
import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';

const MARGIN_RIGHT_OFFSET = 16;
const HIT_SLOPE_SIZE = 16;
export const MIN_HEIGHT_CONTENT_HEADER = 60;

interface QuaiPayContentProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  handleGoBack?: () => void;
  hasBackgroundVariant?: boolean;
  noNavButton?: boolean;
  noInsetBottom?: boolean;
  title?: string | null;
  style?: StyleProp<ViewStyle>;
}

export const QuaiPayContent: React.FC<QuaiPayContentProps> = ({
  children,
  containerStyle,
  handleGoBack,
  style,
  hasBackgroundVariant = false,
  noNavButton = false,
  noInsetBottom = false,
  title,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyle(themedStyle);
  const { isDarkMode } = useTheme();

  const goBack = useCallback(
    () =>
      handleGoBack
        ? handleGoBack()
        : navigation.canGoBack()
        ? navigation.goBack()
        : false,
    [handleGoBack, navigation],
  );

  const noHeader = noNavButton && !title;

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
        ...(style ? [style] : []),
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      {noHeader ? null : (
        <View style={styles.header}>
          {noNavButton ? null : (
            <Pressable
              onPress={goBack}
              hitSlop={HIT_SLOPE_SIZE}
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
      )}
      <View
        style={[styles.container, ...(containerStyle ? [containerStyle] : [])]}
      >
        {children}
      </View>
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
      minHeight: MIN_HEIGHT_CONTENT_HEADER,
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
