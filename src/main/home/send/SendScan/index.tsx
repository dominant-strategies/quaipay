/* eslint-disable react-native/no-inline-styles */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { quais } from 'quais';
import { styledColors } from 'src/shared/styles';
import {
  useQuaiPayCamera,
  QuaiPayCamera,
  QuaiPayContent,
  QuaiPayListItem,
  QuaiPayLoader,
  QuaiPaySearchbar,
  QuaiPayText,
  ScannerType,
} from 'src/shared/components';
import { t } from 'i18next';
import {
  useContacts,
  useThemedStyle,
  useUsername,
  useWallet,
} from 'src/shared/hooks';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from 'src/shared/navigation';
import { useTheme } from 'src/shared/context/themeContext';
import { Contact, Theme } from 'src/shared/types';
import DownChevronBlack from 'src/shared/assets/downChevronBlack.svg';
import DownChevronWhite from 'src/shared/assets/downChevronWhite.svg';

function SendScanScreen() {
  const navigation = useNavigation<RootStackNavigationProps<'Main'>>();
  // const wallet = useWallet();
  const sender = useUsername();
  const contacts = useContacts();
  const { isDarkMode, theme } = useTheme();

  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  const { frameProcessor } = useQuaiPayCamera(ScannerType.SEND_AMOUNT)();

  // variables
  const snapPoints = useMemo(() => ['30%', '80%'], []);

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

  const [bottomSheetUp, setBottomSheetUp] = useState(false);
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

  const styles = themedStyle(theme);
  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  if (!wallet) {
    return <QuaiPayLoader text={t('loading')} />;
  }

  return (
    <QuaiPayContent noNavButton hasBackgroundVariant>
      <QuaiPayCamera frameProcessor={frameProcessor} />
      {contacts ? (
        <BottomSheet
          backgroundStyle={{
            backgroundColor: theme.surface,
          }}
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
          <BottomSheetView
            style={{
              backgroundColor: theme.surface,
            }}
          >
            <ScrollView
              scrollEnabled={bottomSheetUp}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {bottomSheetUp ? (
                <View style={{ paddingHorizontal: 16 }}>
                  {filteredContacts.map((contact: Contact, index: number) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate('SendStack', {
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
                    {
                      backgroundColor: theme.surface,
                    },
                  ]}
                >
                  {filteredContacts
                    .slice(0, 5)
                    .map((contact: Contact, index: number) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate('SendStack', {
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
                    <View style={[styles.contact, { paddingTop: 5 }]}>
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
    </QuaiPayContent>
  );
}

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: { width: 40, height: 40, borderRadius: 20 },
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
    },
    searchbarWrapper: {
      paddingHorizontal: 27,
      marginTop: 22,
    },
    truncated: {
      width: 40,
    },
  });

export default SendScanScreen;
