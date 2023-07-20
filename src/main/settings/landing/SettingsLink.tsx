import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { QuaiPayText } from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks';
import Chevron from 'src/shared/assets/leftChevron.svg';

export type SettingsLinksProps = {
  text: string;
  icon: React.ReactNode;
  redirect: () => void;
};

export const SettingsLink: React.FC<SettingsLinksProps> = ({
  text,
  icon,
  redirect,
}) => {
  const styles = useThemedStyle(themedStyle);

  return (
    <TouchableOpacity style={styles.wrapper} onPress={redirect}>
      <View style={styles.leftColumn}>
        <View style={styles.icon}>{icon}</View>
        <QuaiPayText style={styles.text}>{text}</QuaiPayText>
      </View>
      <View style={styles.chevron}>
        <Chevron width={16} height={16} />
      </View>
    </TouchableOpacity>
  );
};

const themedStyle = () =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    leftColumn: { flexDirection: 'row', alignItems: 'center' },
    text: { fontSize: 16, fontWeight: '500', marginLeft: 26 },
    chevron: {
      transform: [{ rotate: '180deg' }],
    },
    icon: {
      width: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
