import { Pressable, StyleSheet, View } from 'react-native';
import { QuaiPayText } from 'src/shared/components/QuaiPayText';
import Done from 'src/shared/assets/done.svg';
import React from 'react';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks';
import { allNodeData } from 'src/shared/constants/nodeData';

type QuaiPaySelectableCardsProps = {
  setShards: (shard: number[]) => void;
  shards: number[];
};

const shardNames = Object.keys(allNodeData)
  .filter((key: string) => key.includes('wallet'))
  .map((key: string) => allNodeData[key].name);

export const ShardFilterMultiSelect: React.FC<QuaiPaySelectableCardsProps> = ({
  setShards,
  shards,
}) => {
  const styles = useThemedStyle(themedStyle);
  return (
    <View>
      {shardNames.map((shardName: string, ind: number) => {
        const isSelected = shards.includes(ind);
        const areAllSelected = shards.length === 9;
        return (
          <Pressable
            key={ind}
            onPress={() => {
              if (isSelected) {
                if (shards.length === 1) {
                  setShards([0, 1, 2, 3, 4, 5, 6, 7, 8]);
                } else if (areAllSelected) {
                  setShards([ind]);
                } else {
                  setShards(shards.filter(shard => shard !== ind));
                }
              } else {
                setShards([...shards, ind]);
              }
            }}
          >
            <View
              style={
                isSelected && !areAllSelected
                  ? [styles.card, styles.cardSelected]
                  : styles.card
              }
            >
              <QuaiPayText
                type="H3"
                style={
                  areAllSelected
                    ? styles.text
                    : isSelected
                    ? [styles.textNotSelected, styles.textSelected]
                    : styles.textNotSelected
                }
              >
                {shardName}
              </QuaiPayText>
              {isSelected && !areAllSelected ? <Done width={20} /> : null}
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
