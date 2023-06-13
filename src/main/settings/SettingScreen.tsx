import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { MainTabStackScreenProps } from '../MainStack';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { Theme } from 'src/shared/types';

const SettingScreen: React.FC<MainTabStackScreenProps<'Setting'>> = ({}) => {
  const styles = useThemedStyle(themedStyles);

  const goToExport = () => true;

  return (
    <QuaiPayContent title={'Settings'} navButton={false}>
      <View style={styles.container}>
        <Pressable
          onPress={goToExport}
          style={({ pressed }) => [
            styles.placeholderBtn,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="H3">Export Account</QuaiPayText>
        </Pressable>
      </View>
    </QuaiPayContent>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderBtn: {
      padding: 10,
      backgroundColor: theme.normal,
    },
  });

export default SettingScreen;
