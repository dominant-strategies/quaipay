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
import { Theme } from '../types';
import { useThemedStyle } from 'src/shared/hooks';
import { QuaiPaySearchbar } from 'src/shared/components/QuaiPaySearchbar';

const MARGIN_RIGHT_OFFSET = 16;
const HIT_SLOPE_SIZE = 16;

interface QuaiPaySettingsContentProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  handleGoBack?: () => void;
  hasBackgroundVariant?: boolean;
  noInsetBottom?: boolean;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const QuaiPaySettingsContent: React.FC<QuaiPaySettingsContentProps> = ({
  children,
  containerStyle,
  handleGoBack,
  style,
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

  const backgroundColor = isDarkMode ? styledColors.black : styledColors.light;

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

      <View style={styles.header}>
        <View style={styles.headerTitle}>
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
          <QuaiPayText type="H2" style={styles.title}>
            {title}
          </QuaiPayText>
        </View>

        <QuaiPaySearchbar
          onSearchChange={() => {}}
          placeholder="Search in settings"
          style={{ width: '90%', marginTop: 8 }}
        />
      </View>

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
      backgroundColor: theme.surface,
    },
    header: {
      backgroundColor: theme.background,
      paddingTop: 48,
      paddingBottom: 8,
      alignItems: 'center',
      minHeight: 120,
      borderColor: theme.border,
      borderBottomWidth: 1,
    },
    headerTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    navIconMargin: {
      marginRight: MARGIN_RIGHT_OFFSET - 12,
    },
    title: {
      flex: 1,
      color: theme.secondary,
      marginRight: MARGIN_RIGHT_OFFSET,
    },
  });
