import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import DownChevron from 'src/shared/assets/downChevron.svg';
import { QuaiPayListItem, QuaiPaySearchbar, QuaiPayText } from '.';

import { RootNavigator } from '../navigation/utils';
import { styledColors } from '../styles';
import { Contact, Theme } from '../types';
import { useContacts, useThemedStyle, useUsername } from '../hooks';
import { useTheme } from '../context/themeContext';

export const QuaiPayContactBottomSheet: React.FC = () => {
  const contacts = useContacts();
  const sender = useUsername();
  const { isDarkMode } = useTheme();
  const styles = useThemedStyle(themedStyle);

  // search
  const [searchText, setSearchText] = useState<string>();
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  // bottomsheet
  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const [bottomSheetUp, setBottomSheetUp] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    setBottomSheetUp(!!index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    setBottomSheetUp(!!index);
    sheetRef.current?.snapToIndex(index);
  }, []);
  const expandBottomSheet = () => handleSnapPress(1);

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

  useEffect(() => {
    if (contacts) {
      setFilteredContacts(
        searchText
          ? contacts.filter(contact => {
              return contact.username
                ?.toLowerCase()
                ?.includes(searchText.toLowerCase());
            })
          : contacts,
      );
    }
  }, [contacts, searchText]);

  return contacts ? (
    <BottomSheet
      backgroundStyle={styles.backgroundSurface}
      handleIndicatorStyle={{
        backgroundColor: isDarkMode ? styledColors.light : styledColors.gray,
      }}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
    >
      <BottomSheetView style={styles.backgroundSurface}>
        <ScrollView
          scrollEnabled={bottomSheetUp}
          contentContainerStyle={styles.paddingBottom20}
        >
          {bottomSheetUp ? (
            <View style={styles.paddingHorizontal16}>
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
            </View>
          ) : (
            <View
              style={[styles.bottomSheetContainer, styles.backgroundSurface]}
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
            </View>
          )}
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
        </ScrollView>
      </BottomSheetView>
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
