import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuaiPayText } from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { Theme } from 'src/shared/types';

const placeholderWord = 'Octopus';
const placeholderSecuredWord = placeholderWord.split('').map(() => '*');

interface SeedPhraseDisplayProps {
  hide?: boolean;
  seedPhrase: string;
}

export const SeedPhraseDisplay: React.FC<SeedPhraseDisplayProps> = ({
  hide = true,
  seedPhrase,
}) => {
  const styles = useThemedStyle(themedStyle);

  const seedPhraseWords = seedPhrase.split(' ');
  return (
    <View style={styles.container}>
      {seedPhraseWords.map((word, idx) => (
        <View key={idx} style={styles.itemContainer}>
          <QuaiPayText>{idx + 1}.</QuaiPayText>
          <QuaiPayText style={styles.word}>
            {hide ? placeholderSecuredWord : word}
          </QuaiPayText>
        </View>
      ))}
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
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
  });
