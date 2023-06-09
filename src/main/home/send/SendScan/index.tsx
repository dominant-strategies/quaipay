import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import AntIcon from 'react-native-vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { useCameraDevices } from 'react-native-vision-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Camera } from 'react-native-vision-camera';
import { quais } from 'quais';
import { t } from 'i18next';
import { SendStackParamList } from '../SendStack';
import { styledColors } from 'src/shared/styles';

type SendScanScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendScan'
>;

function SendScanScreen({ navigation }: SendScanScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '70%'], []);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    if (barcodes.length > 0 && barcodes[0].content.data) {
      const { address, amount, username } = JSON.parse(
        barcodes[0].content.data as string,
      );
      if (quais.utils.isAddress(address)) {
        // @ts-ignore
        navigation.navigate('SendStack', {
          screen: 'SendAmount',
          params: {
            address,
            amount,
            username,
          },
        });
      }
    }
  }, [barcodes]);

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
      }}
    >
      <View
        style={[
          styles.cameraContainer,
          {
            backgroundColor: isDarkMode
              ? styledColors.black
              : styledColors.light,
          },
        ]}
      >
        {device != null && hasPermission && (
          <>
            <Camera
              style={[StyleSheet.absoluteFill]}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
            />
            <RNHoleView
              style={[
                styles.holeView,
                {
                  backgroundColor: styledColors.black,
                },
              ]}
              holes={[
                {
                  x: 90,
                  y: 160,
                  width: 240,
                  height: 240,
                  borderRadius: 10,
                },
              ]}
            />
          </>
        )}
      </View>
      <BottomSheet
        backgroundStyle={{
          backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkMode ? styledColors.light : styledColors.gray,
        }}
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        style={{
          backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
        }}
      >
        <BottomSheetView
          style={{
            backgroundColor: isDarkMode
              ? styledColors.black
              : styledColors.light,
          }}
        >
          <View
            style={[
              styles.bottomSheetContainer,
              {
                backgroundColor: isDarkMode
                  ? styledColors.black
                  : styledColors.light,
              },
            ]}
          >
            {['P', 'P', 'P', 'P', 'P', 'P', 'View All'].map((item, index) => {
              // TODO: create a component for this
              return (
                <TouchableOpacity key={index}>
                  <View key={index} style={styles.contact}>
                    {item === 'View All' ? (
                      <AntIcon
                        color={
                          isDarkMode ? styledColors.white : styledColors.black
                        }
                        name="down"
                        size={24}
                      />
                    ) : (
                      <Text
                        style={{
                          color: isDarkMode
                            ? styledColors.white
                            : styledColors.black,
                        }}
                      >
                        {item}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.contactText,
                      {
                        color: isDarkMode
                          ? styledColors.white
                          : styledColors.black,
                      },
                    ]}
                  >
                    {item === 'View All' ? 'View All' : 'Phone'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.contactSearch}>
            <AntIcon
              name="search1"
              size={20}
              color="#808080"
              style={styles.searchIcon}
            />
            <TextInput
              onFocus={() => {
                handleSnapPress(1);
              }}
              placeholder={t('home.send.searchByAddress') as string}
              placeholderTextColor="#808080"
              style={styles.searchInput}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  holeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
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
    borderColor: '#D5D5D5',
    borderWidth: 1,
    alignSelf: 'flex-start',
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  contactText: {
    fontFamily: 'Satoshi Variable',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  contactSearch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: -1,
    alignSelf: 'center',
  },
  searchInput: {
    height: 40,
    width: '96%',
    paddingLeft: 36,
    borderRadius: 4,
    borderColor: '#0066FF',
    borderWidth: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
  },
});

export default SendScanScreen;
