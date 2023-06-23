import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
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

enum BottomSheetIndex {
  INIT = 0,
  PARTIAL = 1,
  EXPAND = 2,
}

const ANIMATED_SNAP_POINTS = [1, 2];
// Init to 1 to render but not show BottomSheet
const INITIAL_SNAP_POINTS = [1];
// Values of BottomSheet heights for other 2 indexes
const PARTIAL_DIFF = 180;
const EXPAND_DIFF = 475;

export const QuaiPayContactBottomSheet: React.FC = () => {
  const sender = useUsername();
  const { isDarkMode } = useTheme();
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
        address: contact.address,
        amount: 0,
        receiver: contact.username,
        // wallet,
        wallet: '' as any,
        sender,
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
      setSnapPoints([
        ...INITIAL_SNAP_POINTS,
        partialSnapPoint,
        expandSnapPoint,
      ]);
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

  // ===============
  return contacts ? (
    <BottomSheet
      backgroundStyle={styles.backgroundSurface}
      handleIndicatorStyle={{
        backgroundColor: isDarkMode ? styledColors.light : styledColors.gray,
      }}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose={false}
      index={BottomSheetIndex.INIT}
      animatedIndex={transition}
    >
      <View onLayout={handleLayoutContent}>
        <BottomSheetView style={styles.backgroundSurface}>
          <Animated.View
            style={[
              styles.bottomSheetContainer,
              styles.backgroundSurface,
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
                <DownChevron color={styles.chevron.color} />
              </View>
              <QuaiPayText>View All</QuaiPayText>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            onPress={expandBottomSheet}
            style={styles.searchbarWrapper}
          >
            <QuaiPaySearchbar
              searchValue={searchText}
              onSearchChange={setSearchText}
              placeholder={t('home.send.searchByAddress')}
            />
          </TouchableOpacity>

          <ScrollView
            scrollEnabled={currentBottomSheetIndex === BottomSheetIndex.EXPAND}
            contentContainerStyle={styles.paddingBottom20}
          >
            <Animated.View
              style={[styles.paddingHorizontal16, animatedLongListStyle]}
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
            </Animated.View>
          </ScrollView>
        </BottomSheetView>
      </View>
    </BottomSheet>
  ) : null;
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
      paddingHorizontal: 24,
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
      paddingHorizontal: 27,
      marginTop: 22,
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
    paddingHorizontal16: {
      paddingHorizontal: 16,
    },
    chevron: {
      color: theme.primary,
    },
  });
