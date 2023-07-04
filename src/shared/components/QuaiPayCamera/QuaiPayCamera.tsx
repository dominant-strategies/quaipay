import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import { Camera, Frame, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { styledColors } from '../../styles';

const windowWidth = Dimensions.get('window').width;
export const squareHoleSize = windowWidth * 0.65;
const squarePaddingRight = (windowWidth - squareHoleSize) / 2;

interface QuaiPayCameraProps {
  frameProcessor: (frame: Frame) => void;
}

export const QuaiPayCamera: React.FC<QuaiPayCameraProps> = ({
  frameProcessor,
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(true);
  const isFocused = useIsFocused();

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    if (isFocused) {
      setIsCameraReady(true);
    } else {
      setIsCameraReady(false);
    }
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    <View style={styles.cameraContainer}>
      {device != null && hasPermission && isCameraReady && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <RNHoleView style={styles.holeView} holes={[styles.squareItem]} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: styledColors.black,
  },
  squareItem: {
    x: squarePaddingRight,
    y: 120,
    width: squareHoleSize,
    height: squareHoleSize,
    borderRadius: 10,
  },
});
