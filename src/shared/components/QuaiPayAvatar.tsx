import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Theme } from 'src/shared/types';
import { styledColors } from 'src/shared/styles';
import { useThemedStyle } from 'src/shared/hooks';

type QuaiPayAvatarProps = {
  containerStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
  profilePicture: string;
  bottomRightIcon?: React.ReactNode;
  onBottomRightIconPress?: () => void;
};

export const QuaiPayAvatar: React.FC<QuaiPayAvatarProps> = ({
  containerStyle,
  iconSize = 80,
  profilePicture,
  bottomRightIcon,
  onBottomRightIconPress,
}) => {
  const styles = useThemedStyle(themedStyle);
  return (
    <View
      style={
        containerStyle
          ? [styles.imageCenterer, containerStyle]
          : styles.imageCenterer
      }
    >
      <View
        style={[
          styles.imageNormalBorder,
          ...(bottomRightIcon ? [styles.bottomRightIconPosition] : []),
        ]}
      >
        <View style={styles.imageSurfaceBorder}>
          <Image
            source={{
              uri: profilePicture,
            }}
            style={[styles.image, { height: iconSize, width: iconSize }]}
          />
        </View>
        {bottomRightIcon && (
          // Wrap pressable to avoid showing actual background when pressed
          <View style={styles.button}>
            <Pressable
              onPress={onBottomRightIconPress}
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.8 },
              ]}
            >
              {bottomRightIcon}
            </Pressable>
          </View>
        )}
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
    bottomRightIconPosition: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    button: {
      position: 'absolute',
      height: 30,
      width: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.normal,
    },
  });
