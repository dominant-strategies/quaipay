import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type LoaderProps = {
  text: string;
  backgroundColor?: string;
};

export function QuaiPayLoader({ text, backgroundColor }: LoaderProps) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={[
        styles({ isDarkMode }).container,
        !!backgroundColor && { backgroundColor },
      ]}
    >
      <View style={styles({ isDarkMode }).indicatorWrapper}>
        <ActivityIndicator size="large" />
        <Text style={styles({ isDarkMode }).indicatorText}>{text}</Text>
      </View>
    </SafeAreaView>
  );
}

type LoaderStyles = {
  isDarkMode: boolean;
};
const styles = ({ isDarkMode }: LoaderStyles) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      flex: 1,
    },
    indicatorWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicatorText: {
      color: isDarkMode ? Colors.white : Colors.black,
      fontSize: 18,
      marginTop: 12,
    },
  });
