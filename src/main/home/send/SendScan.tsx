/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import AntIcon from 'react-native-vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { styledColors } from '../../../styles';

type SendScanScreenProps = {
  navigation: any;
};

function SendScanScreen({}: SendScanScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '50%'], []);

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
    console.log('barcodes', barcodes);
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
      console.log('status', status);
      console.log('hasPermission', hasPermission);
      console.log(device?.id);
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
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
        }}
      >
        {device != null && hasPermission && (
          <>
            <Camera
              style={[
                StyleSheet.absoluteFill,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                },
              ]}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
            />
            <RNHoleView
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: styledColors.black,
                opacity: 0.6,
              }}
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
            paddingHorizontal: 24,
            backgroundColor: isDarkMode
              ? styledColors.black
              : styledColors.light,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: isDarkMode
                ? styledColors.black
                : styledColors.light,
            }}
          >
            {['P', 'P', 'P', 'P', 'P', 'P', 'View All'].map((item, index) => {
              return (
                <View>
                  <View
                    key={index}
                    style={{
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
                    }}
                  >
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
                    style={{
                      fontFamily: 'Satoshi Variable',
                      fontSize: 10,
                      fontWeight: '500',
                      textAlign: 'center',
                      color: isDarkMode
                        ? styledColors.white
                        : styledColors.black,
                    }}
                  >
                    {item === 'View All' ? 'View All' : 'Phone'}
                  </Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              marginTop: 24,
            }}
          >
            <AntIcon
              name="search1"
              size={20}
              color="#808080"
              style={{
                position: 'absolute',
                left: 16,
                top: -1,
                alignSelf: 'center',
              }}
            />
            <TextInput
              onFocus={() => {
                console.log('onFocus');
                handleSnapPress(1);
              }}
              placeholder="Search by address"
              placeholderTextColor="#808080"
              style={{
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
              }}
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
});

export default SendScanScreen;
