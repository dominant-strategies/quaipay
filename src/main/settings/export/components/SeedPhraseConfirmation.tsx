import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { QuaiPayText } from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { styledColors } from 'src/shared/styles';
import { Theme } from 'src/shared/types';

const BOX_HEIGHT = 40;
const BOX_WIDTH = 85;

interface SeedPhraseConfirmationProps {
  seedPhrase: string;
  result: string[];
  setResult: React.Dispatch<React.SetStateAction<string[]>>;
}

const WordBox = ({ onPress, word }: { onPress?: () => void; word: string }) => {
  const styles = useThemedStyle(themedStyle);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wordButton, pressed && { opacity: 0.5 }]}
    >
      <QuaiPayText style={styles.word}>{word}</QuaiPayText>
    </Pressable>
  );
};

export const SeedPhraseConfirmation: React.FC<SeedPhraseConfirmationProps> = ({
  seedPhrase,
}) => {
  const styles = useThemedStyle(themedStyle);

  const seedPhraseWords = seedPhrase.split(' ');
  return (
    <>
      <View style={styles.mainContainer}>
        {seedPhraseWords.map((_, idx) => (
          <View key={idx} style={styles.emptyBox}>
            <WordBox word={''} />
          </View>
        ))}
      </View>
      <View style={styles.separator} />
      <View style={styles.mainContainer}>
        {seedPhraseWords.map((word, idx) => (
          <View key={idx}>
            <WordBox word={word} />
          </View>
        ))}
      </View>
    </>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 8,
      marginHorizontal: 16,
      paddingHorizontal: 16,
    },
    emptyBox: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: theme.border,
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
    },
    wordButton: {
      width: BOX_WIDTH,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: theme.normal,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: theme.border,
    },
    word: {
      paddingVertical: 12,
      paddingHorizontal: 8,
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      textAlign: 'left',
    },
    continueButton: {
      marginBottom: 70,
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    separator: {
      borderWidth: 1,
      borderColor: theme.border,
      marginVertical: 18,
    },
    whiteColor: {
      color: styledColors.white,
    },
  });
