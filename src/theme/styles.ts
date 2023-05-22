// import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StyleSheet } from 'react-native';

export const fontStyle = StyleSheet.create({
  fontH: {
    fontFamily: 'Clash Display Variable',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 64.8,
  },
  fontH1: {
    fontFamily: 'Clash Display Variable',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 36,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
  fontH2: {
    fontFamily: 'Satoshi Variable',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32.5,
    letterSpacing: 0,
    textAlign: 'center',
  },
  fontH3: {
    fontFamily: 'Satoshi Variable',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
  },
  fontParagraph: {
    fontFamily: 'Satoshi Variable',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
  },
  fontSmallText: {
    fontFamily: 'Satoshi Variable',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
  },
  fontSmallTextBold: {
    fontFamily: 'Satoshi Variable',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'left',
  },
});

export const styledColors = {
  normal: '#0066FF',
  black: '#000000',
  darkGray: '#303030',
  gray: '#808080',
  lightGray: '#D4D4D4',
  light: '#EFEFEF',
  white: '#FFFFFF',
};

export const buttonStyle = StyleSheet.create({
  normal: {
    backgroundColor: '#0066FF',
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 13,
  },
  white: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: 13,
  },
  black: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: 13,
  },
  gray: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: 13,
  },
});
