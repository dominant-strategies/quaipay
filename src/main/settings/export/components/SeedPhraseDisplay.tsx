import React from 'react';
import { QuaiPayText } from 'src/shared/components';
import {
  QuaiPaySeedPhraseLayoutDisplay,
  seedPhraseLayoutDisplayWordThemedStyle,
} from 'src/shared/components/QuaiPaySeedPhraseLayoutDisplay';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

const placeholderWord = 'Octopus';
const placeholderSecuredWord = placeholderWord.split('').map(() => '*');

interface SeedPhraseDisplayProps {
  hide?: boolean;
  seedPhrase: string;
}

export const SeedPhraseDisplay: React.FC<SeedPhraseDisplayProps> = ({
  hide = false,
  seedPhrase,
}) => {
  const styles = useThemedStyle(seedPhraseLayoutDisplayWordThemedStyle);

  const seedPhraseWords = seedPhrase.split(' ');
  return (
    <QuaiPaySeedPhraseLayoutDisplay showIndex>
      {seedPhraseWords.map((word, idx) => (
        <QuaiPayText key={'sp-w-' + idx} style={styles.word}>
          {hide ? placeholderSecuredWord : word}
        </QuaiPayText>
      ))}
    </QuaiPaySeedPhraseLayoutDisplay>
  );
};
