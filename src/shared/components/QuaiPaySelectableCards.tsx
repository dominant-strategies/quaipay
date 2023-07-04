import { Pressable, StyleSheet, View } from 'react-native';
import { QuaiPayText } from 'src/shared/components/QuaiPayText';
import Done from 'src/shared/assets/done.svg';
import React from 'react';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks';

type QuaiPaySelectableCardsProps = {
  options: string[];
  setIndex: (index?: number) => void;
  index?: number;
};

export const QuaiPaySelectableCards: React.FC<QuaiPaySelectableCardsProps> = ({
  options,
  setIndex,
  index,
}) => {
  const styles = useThemedStyle(themedStyle);
  return (
    <View>
      {options.map((option: string, ind: number) => {
        const isCardSelected = ind === index;
        const isAnyCardSelected = index !== undefined;
        return (
          <Pressable
            key={ind}
            onPress={() => {
              if (isCardSelected) {
                setIndex(undefined);
              } else {
                setIndex(ind);
              }
            }}
          >
            <View
              style={
                isCardSelected
                  ? [styles.card, styles.cardSelected]
                  : styles.card
              }
            >
              <QuaiPayText
                type="H3"
                style={
                  isCardSelected
                    ? [styles.textNotSelected, styles.textSelected]
                    : isAnyCardSelected
                    ? styles.textNotSelected
                    : styles.text
                }
              >
                {option}
              </QuaiPayText>
              {isCardSelected ? <Done width={20} /> : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    card: {
      alignItems: 'center',
      borderColor: theme.surface,
      borderWidth: 2,
      flexDirection: 'row',
      height: 40,
      marginVertical: 4,
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    cardSelected: {
      borderColor: theme.normal,
      borderRadius: 4,
    },
    text: {
      color: theme.primary,
    },
    textNotSelected: {
      color: theme.secondary,
    },
    textSelected: {
      color: theme.normal,
    },
  });
