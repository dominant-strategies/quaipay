import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import AntIcon from 'react-native-vector-icons/AntDesign';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { quais } from 'quais';
import { styledColors } from 'src/shared/styles';
import {
  QuaiPayLoader,
  QuaiPaySearchbar,
  QuaiPayText,
} from 'src/shared/components';
import { t } from 'i18next';
import { useUsername, useWallet } from 'src/shared/hooks';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from 'src/shared/navigation';

const windowWidth = Dimensions.get('window').width;
const squareSize = windowWidth * 0.65;
const squarePaddingRight = (windowWidth - squareSize) / 2;

function SendScanScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<RootStackNavigationProps<'Main'>>();
  const wallet = useWallet();
  const sender = useUsername();
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
  const [isCameraReady, setIsCameraReady] = React.useState(true);

  useEffect(() => {
    if (isFocused) {
      setIsCameraReady(true);
    } else {
      setIsCameraReady(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!wallet) {
      return;
    }
    if (barcodes.length > 0 && barcodes[0].content.data) {
      const { address, amount, username } = JSON.parse(
        barcodes[0].content.data as string,
      );
      if (quais.utils.isAddress(address)) {
        navigation.navigate('SendStack', {
          screen: 'SendAmount',
          params: {
            address,
            amount: amount || 0,
            receiver: username,
            wallet,
            sender,
          },
        });
      }
    }
  }, [barcodes, wallet]);

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

  if (!wallet) {
    return <QuaiPayLoader text={t('loading')} />;
  }

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
        {device != null && hasPermission && isCameraReady && (
          <>
            <Camera
              style={StyleSheet.absoluteFill}
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
                  x: squarePaddingRight,
                  y: 160,
                  width: squareSize,
                  height: squareSize,
                  borderRadius: 10,
                },
              ]}
            />
          </>
        )}
      </View>
      <BottomSheet
        backgroundStyle={{
          backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkMode ? styledColors.light : styledColors.gray,
        }}
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        style={{
          backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
        }}
      >
        <BottomSheetView
          style={{
            backgroundColor: isDarkMode
              ? styledColors.black
              : styledColors.white,
          }}
        >
          <View
            style={[
              styles.bottomSheetContainer,
              {
                backgroundColor: isDarkMode
                  ? styledColors.black
                  : styledColors.white,
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
                  <QuaiPayText type="default">
                    {item === 'View All' ? 'View All' : 'Phone'}
                  </QuaiPayText>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => {
              handleSnapPress(1);
            }}
            style={styles.searchbarWrapper}
          >
            <QuaiPaySearchbar placeholder={t('home.send.searchByAddress')} />
          </TouchableOpacity>
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
  searchbarWrapper: {
    paddingHorizontal: 27,
    marginTop: 22,
  },
});

export default SendScanScreen;
