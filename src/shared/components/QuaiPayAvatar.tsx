import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Theme } from 'src/shared/types';
import { styledColors } from 'src/shared/styles';
import { useThemedStyle } from 'src/shared/hooks';

type QuaiPayAvatarProps = {
  profilePicture: string;
};

export const QuaiPayAvatar: React.FC<QuaiPayAvatarProps> = ({
  profilePicture,
}) => {
  const styles = useThemedStyle(themedStyle);
  return (
    <View style={styles.imageCenterer}>
      <View style={styles.imageNormalBorder}>
        <View style={styles.imageSurfaceBorder}>
          <Image
            source={{
              uri: profilePicture,
            }}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    imageCenterer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 16,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    imageSurfaceBorder: {
      borderRadius: 44,
      borderWidth: 4,
      borderColor: theme.surface,
    },
    imageNormalBorder: {
      borderRadius: 48,
      borderWidth: 4,
      borderColor: styledColors.normal,
    },
  });
