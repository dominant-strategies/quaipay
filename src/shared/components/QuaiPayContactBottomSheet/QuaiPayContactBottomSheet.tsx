import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { quais } from 'quais';

import DownChevron from 'src/shared/assets/downChevron.svg';

import { RootNavigator } from '../../navigation/utils';
import { styledColors } from '../../styles';
import { Contact, Theme } from '../../types';
import { useThemedStyle, useUsername } from '../../hooks';
import { useTheme } from '../../context/themeContext';

import { useFilteredContacts } from './QuaiPayContactBottomSheet.hooks';
import { QuaiPayListItem } from '../QuaiPayListItem';
import { QuaiPaySearchbar } from '../QuaiPaySearchbar';
import { QuaiPayText } from '../QuaiPayText';
import { useSnackBar } from 'src/shared/context/snackBarContext';

enum BottomSheetIndex {
  INIT = 0, // After init, it's removed to avoid swiping it to the bottom
  PARTIAL = 0,
  EXPAND = 1,
}

const ANIMATED_SNAP_POINTS = [0, 1];
// Init to 1 to render but not show BottomSheet
const INITIAL_SNAP_POINTS = [1];
// Values of BottomSheet heights for other 2 indexes
const PARTIAL_DIFF = 220;
const EXPAND_DIFF = 475;

export const QuaiPayContactBottomSheet: React.FC = () => {
  const sender = useUsername();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);

  // ===== Search =====
  const [searchText, setSearchText] = useState<string>();

  // ===== Contacts =====
  const { contacts, filteredContacts } = useFilteredContacts(searchText);

  // ===== Bottomsheet =====
  const sheetRef = useRef<BottomSheet>(null);
  // To control element's heights, dynamically calculate snap points stored here
  const [snapPoints, setSnapPoints] = useState(INITIAL_SNAP_POINTS);
  // Control if BottomSheet ui data is initialized
  const [isBottomSheetInitialized, setIsBottomSheetInitialized] =
    useState(false);
  // Keep track of BottomSheet's index
  const [currentBottomSheetIndex, setCurrentBottomSheetIndex] = useState(
    BottomSheetIndex.INIT,
  );
  const { showSnackBar } = useSnackBar();

  // ===== Layout =====
  const transition = useSharedValue(0);

  const animatedShortHorizontalListStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      transition.value,
      ANIMATED_SNAP_POINTS,
      [1, 0],
      Extrapolate.CLAMP,
    ),
    height: interpolate(
      transition.value,
      ANIMATED_SNAP_POINTS,
      [70, 0],
      Extrapolate.CLAMP,
    ),
    marginTop: interpolate(
      transition.value,
      ANIMATED_SNAP_POINTS,
      [24, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const animatedLongListStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      transition.value,
      ANIMATED_SNAP_POINTS,
      [0, 1],
      Extrapolate.CLAMP,
    ),
    height: interpolate(
      transition.value,
      ANIMATED_SNAP_POINTS,
      [0, 350],
      Extrapolate.CLAMP,
    ),
  }));

  // ===== Callbacks =====
  const handleSheetChange = useCallback((index: number) => {
    setCurrentBottomSheetIndex(index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    setCurrentBottomSheetIndex(index);
    sheetRef.current?.snapToIndex(index);
  }, []);
  const expandBottomSheet = () => handleSnapPress(BottomSheetIndex.EXPAND);

  const handleOnContactPress = (contact: Contact) =>
    RootNavigator.navigate('SendStack', {
      screen: 'SendAmount',
      params: {
        receiverAddress: contact.address,
        receiverUsername: contact.username,
        receiverPFP: contact.profilePicture,
        amount: 0,
        sender: sender!,
      },
    });

  // ===== Layout =====
  const handleLayoutContent = ({
    nativeEvent: {
      layout: { height },
    },
  }: LayoutChangeEvent) => {
    if (snapPoints.length <= 1) {
      const partialSnapPoint = height + PARTIAL_DIFF;
      const expandSnapPoint = height + EXPAND_DIFF;
      setSnapPoints([partialSnapPoint, expandSnapPoint]);
    }
  };

  // First check if snap points are updated
  useEffect(() => {
    if (snapPoints.length > 1 && !isBottomSheetInitialized) {
      setIsBottomSheetInitialized(true);
    }
  }, [snapPoints]);

  // Then show BottomSheet (only runs if scan screen is mounted and not lazy rendered)
  useEffect(() => {
    if (
      isBottomSheetInitialized &&
      currentBottomSheetIndex === BottomSheetIndex.INIT
    ) {
      handleSnapPress(BottomSheetIndex.PARTIAL);
    }
  });

  const navigateToAmount = () => {
    if (searchText && quais.utils.isAddress(searchText)) {
      RootNavigator.navigate('SendStack', {
        screen: 'SendAmount',
        params: {
          receiverAddress: searchText,
          amount: 0,
          sender: sender!,
        },
      });
    } else {
      showSnackBar({
        message: t('home.send.invalidAddress'),
        moreInfo: t('home.send.invalidAddressDescription') as string,
        type: 'error',
      });
    }
  };

  // ===============
  return (
    <BottomSheet
      backgroundStyle={styles.backgroundSurface}
      handleIndicatorStyle={{
        backgroundColor: isDarkMode ? styledColors.light : styledColors.gray,
      }}
      enableHandlePanningGesture={!!contacts}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose={false}
      index={BottomSheetIndex.INIT}
      animatedIndex={transition}
    >
      <View onLayout={handleLayoutContent}>
        <BottomSheetView style={styles.backgroundSurface}>
          {filteredContacts.length > 0 && contacts && (
            <Animated.View
              style={[
                styles.bottomSheetContainer,
                styles.backgroundSurface,
                styles.marginHorizontal20,
                animatedShortHorizontalListStyle,
              ]}
            >
              {filteredContacts
                .slice(0, 5)
                .map((contact: Contact, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleOnContactPress(contact)}
                  >
                    <View key={index} style={styles.contact}>
                      <Image
                        source={{ uri: contact.profilePicture }}
                        style={styles.image}
                      />
                    </View>
                    <QuaiPayText style={styles.truncated} numberOfLines={1}>
                      {contact.username}
                    </QuaiPayText>
                  </TouchableOpacity>
                ))}
              <TouchableOpacity onPress={expandBottomSheet}>
                <View style={styles.contact}>
                  <View style={styles.chevronWrapper}>
                    <DownChevron
                      color={styles.chevron.color}
                      style={styles.chevron}
                    />
                  </View>
                </View>
                <QuaiPayText>{t('home.send.viewAll')}</QuaiPayText>
              </TouchableOpacity>
            </Animated.View>
          )}
          <TouchableOpacity
            onPress={expandBottomSheet}
            style={[styles.searchbarWrapper, styles.marginHorizontal20]}
          >
            <QuaiPaySearchbar
              searchValue={searchText}
              onSearchChange={setSearchText}
              placeholder={t('home.send.searchByAddress')}
              onPress={expandBottomSheet}
              onPressRightIcon={navigateToAmount}
            />
          </TouchableOpacity>

          <Animated.View
            style={[styles.paddingBottom20, animatedLongListStyle]}
          >
            <ScrollView
              scrollEnabled={
                currentBottomSheetIndex === BottomSheetIndex.EXPAND
              }
              contentContainerStyle={styles.marginHorizontal20}
            >
              {filteredContacts.map((contact: Contact, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOnContactPress(contact)}
                >
                  <QuaiPayListItem
                    name={contact.username}
                    picture={contact.profilePicture}
                    address={contact.address}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </BottomSheetView>
      </View>
    </BottomSheet>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    bottomSheetContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contact: {
      height: 40,
      width: 40,
      borderRadius: 20,
      borderColor: theme.border,
      borderWidth: 1,
      margin: 4,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    searchbarWrapper: {
      marginVertical: 24,
    },
    truncated: {
      width: 40,
    },
    backgroundSurface: {
      backgroundColor: theme.surface,
    },
    paddingBottom20: {
      paddingBottom: 20,
    },
    marginHorizontal20: {
      marginHorizontal: 20,
    },
    chevron: {
      color: theme.primary,
    },
    chevronWrapper: {
      transform: [{ rotate: '180deg' }],
      paddingTop: 2,
    },
  });
