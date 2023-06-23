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

import DownChevronBlack from 'src/shared/assets/downChevronBlack.svg';
import DownChevronWhite from 'src/shared/assets/downChevronWhite.svg';
import { QuaiPayListItem, QuaiPaySearchbar, QuaiPayText } from '.';

import { RootNavigator } from '../navigation/utils';
import { styledColors } from '../styles';
import { Contact, Theme } from '../types';
import { useContacts, useThemedStyle, useUsername } from '../hooks';
import { useTheme } from '../context/themeContext';

interface QuaiPayContactBottomSheetProps {}

export const QuaiPayContactBottomSheet: React.FC<
  QuaiPayContactBottomSheetProps
> = ({}) => {
  const contacts = useContacts();
  const sender = useUsername();
  const { isDarkMode } = useTheme();
  const styles = useThemedStyle(themedStyle);

  // variables
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (searchText === '' && contacts) {
      setFilteredContacts(contacts);
    } else if (contacts) {
      setFilteredContacts(
        contacts.filter(contact => {
          console.log({ contact, searchText });
          return contact.username
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase());
        }),
      );
    }
  }, [contacts, searchText]);

  return (
    <>
      {contacts ? (
        <BottomSheet
          backgroundStyle={styles.backgroundSurface}
          handleIndicatorStyle={{
            backgroundColor: isDarkMode
              ? styledColors.light
              : styledColors.gray,
          }}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          style={{
            backgroundColor: isDarkMode
              ? styledColors.black
              : styledColors.white,
          }}
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
                      onPress={() => {
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
                      }}
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
                  style={[
                    styles.bottomSheetContainer,
                    styles.backgroundSurface,
                  ]}
                >
                  {filteredContacts
                    .slice(0, 5)
                    .map((contact: Contact, index: number) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
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
                        }}
                      >
                        <View key={index} style={styles.contact}>
                          <Image
                            source={{ uri: contact.profilePicture }}
                            style={styles.image}
                          />
                        </View>
                        <QuaiPayText
                          type="default"
                          style={styles.truncated}
                          numberOfLines={1}
                        >
                          {contact.username}
                        </QuaiPayText>
                      </TouchableOpacity>
                    ))}
                  <TouchableOpacity onPress={() => handleSnapPress(1)}>
                    <View style={styles.contact}>
                      {isDarkMode ? <DownChevronWhite /> : <DownChevronBlack />}
                    </View>
                    <QuaiPayText type="default">View All</QuaiPayText>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  handleSnapPress(1);
                }}
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
      ) : null}
    </>
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
  });
