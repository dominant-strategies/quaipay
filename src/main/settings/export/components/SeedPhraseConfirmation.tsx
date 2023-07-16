import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuaiPayText } from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { styledColors } from 'src/shared/styles';
import { Theme } from 'src/shared/types';
import { shuffle } from 'src/shared/utils/shuffle';

const BOX_HEIGHT = 40;
const BOX_WIDTH = 85;

const AMOUNT_OF_WORDS_TO_CONFIRM = 4;

interface SeedPhraseConfirmationProps {
  shouldShuffle?: boolean;
  seedPhrase: string;
  result: string[];
  setResult: React.Dispatch<React.SetStateAction<string[]>>;
}

interface WordBoxProps {
  onPress?: (w: string) => void;
  word: string;
}

const WordBox = ({ onPress, word }: WordBoxProps) => {
  const styles = useThemedStyle(themedStyle);

  const handleOnPress = () => onPress && onPress(word);

  return (
    <Pressable
      onPress={handleOnPress}
      style={({ pressed }) => [
        styles.box,
        styles.wordButton,
        pressed && { opacity: 0.5 },
      ]}
    >
      <QuaiPayText style={styles.word}>{word}</QuaiPayText>
    </Pressable>
  );
};

export const SeedPhraseConfirmation: React.FC<SeedPhraseConfirmationProps> = ({
  shouldShuffle = true,
  seedPhrase,
  result,
  setResult,
}) => {
  const styles = useThemedStyle(themedStyle);

  const seedPhraseWords = useMemo(
    (arr = seedPhrase.split(' ')) => (shouldShuffle ? shuffle(arr) : arr),
    [seedPhrase],
  );

  const expectedIndexes = useMemo(
    () =>
      shuffle([...seedPhraseWords].map((_, idx) => idx)).slice(
        0,
        AMOUNT_OF_WORDS_TO_CONFIRM,
      ),
    [seedPhraseWords],
  );

  const expectedWords = useMemo(
    () =>
      seedPhraseWords.filter((_, idx) =>
        expectedIndexes.find(index => index === idx),
      ),
    [seedPhraseWords],
  );

  const hasFullAnswer = result.length === expectedWords.length;

  const appendWord = (word: string) => {
    if (hasFullAnswer) {
      return;
    }
    if (result.find(w => w === word)) {
      return;
    }
    setResult(prevState => [...prevState, word]);
  };

  const popWord = (word: string) => {
    setResult(prevState => prevState.filter(w => word !== w));
  };

  return (
    <>
      <View style={styles.mainContainer}>
        {expectedWords.map((_, idx) => (
          <View
            key={idx}
            style={[styles.box, !result[idx] && styles.boxBorder]}
          >
            {!!result[idx] && <WordBox onPress={popWord} word={result[idx]} />}
          </View>
        ))}
      </View>
      <View style={styles.separator} />
      <View style={styles.mainContainer}>
        {seedPhraseWords.map((word, idx) => (
          <View
            key={idx}
            style={[
              styles.box,
              !!result.find(w => w === word) && styles.boxBorder,
            ]}
          >
            {!result.find(w => w === word) && (
              <WordBox word={word} onPress={appendWord} />
            )}
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
    box: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      borderRadius: 4,
    },
    boxBorder: {
      borderWidth: 1,
      borderColor: theme.border,
    },
    wordButton: {
      backgroundColor: theme.normal,
    },
    word: {
      paddingVertical: 12,
      paddingHorizontal: 8,
      textAlign: 'left',
      color: styledColors.white,
    },
    continueButton: {
      marginBottom: 70,
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    separator: {
      borderTopWidth: 1,
      borderColor: theme.border,
      marginVertical: 18,
    },
    whiteColor: {
      color: styledColors.white,
    },
  });
