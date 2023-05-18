import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

type LoaderProps = {
  text: string;
};

export default function Loader({ text }: LoaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" style={styles.indicator} />
        <Text style={styles.indicatorText}>{text}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {},
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
  },
});
