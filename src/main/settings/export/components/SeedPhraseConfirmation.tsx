import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { QuaiPayText } from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { styledColors } from 'src/shared/styles';
import { Theme } from 'src/shared/types';

interface SeedPhraseConfirmationProps {
  seedPhrase: string;
}

export const SeedPhraseConfirmation: React.FC<SeedPhraseConfirmationProps> = ({
  seedPhrase,
}) => {
  const styles = useThemedStyle(themedStyle);

  const seedPhraseWords = seedPhrase.split(' ');
  return (
    <>
      <View style={styles.wordFillerContainer}>
        {seedPhraseWords.map((_, idx) => (
          <View key={idx} style={styles.itemContainer}>
            <View style={styles.word} />
          </View>
        ))}
        {seedPhraseWords.map((word, idx) => (
          <Pressable
            key={idx}
            style={({ pressed }) => [
              styles.itemContainer,
              styles.wordButtonContainer,
              pressed && { opacity: 0.5 },
            ]}
          >
            <QuaiPayText style={styles.word}>{word}</QuaiPayText>
          </Pressable>
        ))}
      </View>
    </>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    textContainer: {
      flex: 1,
      alignItems: 'center',
      marginBottom: 20,
    },
    wordFillerContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      gap: 8,
      marginHorizontal: 16,
      paddingRight: 16,
    },
    itemContainer: {
      width: '30%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 2,
    },
    wordButtonContainer: {
      backgroundColor: theme.normal,
    },
    word: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: theme.border,
      paddingTop: 10,
      paddingHorizontal: 8,
      width: 85,
      height: 40,
      textAlign: 'left',
    },
    continueButton: {
      marginBottom: 70,
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    separator: {
      height: 40,
    },
    whiteColor: {
      color: styledColors.white,
    },
  });
