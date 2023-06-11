/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavChevronLeft from 'src/../assets/icons/navChevronLeft.svg';

import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';
import { QuaiPayText } from './QuaiPayText';

const MARGIN_RIGHT_OFFSET = 16;

interface QuaiPayContentProps {
  children: React.ReactNode;
  navButton?: boolean;
  noInsetBottom?: boolean;
  title?: string | null;
}

export const QuaiPayContent: React.FC<QuaiPayContentProps> = ({
  children,
  navButton = true,
  noInsetBottom = false,
  title,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyle(themedStyle);

  const goBack = useCallback(
    () => (navigation.canGoBack() ? navigation.goBack() : false),
    [navigation],
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: noInsetBottom ? 0 : insets.bottom,
        },
      ]}
    >
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
      backgroundColor: theme.background,
      paddingHorizontal: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: 12,
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
