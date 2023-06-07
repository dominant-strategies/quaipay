import { StyleSheet, TextStyle } from 'react-native';
import { Typography } from '../types';

export const fontStyle = StyleSheet.create({
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

export const typography: Record<Typography, TextStyle> = {
  H1: {
    fontFamily: 'Clash Display Variable',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
  H2: {
    fontFamily: 'Satoshi Variable',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: 0.05,
    textAlign: 'center',
  },
  H3: {
    fontFamily: 'Satoshi Variable',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
  },
  paragraph: {
    fontFamily: 'Satoshi Variable',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
  },
  default: {
    fontFamily: 'Satoshi Variable',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
  },
  bold: {
    fontFamily: 'Satoshi Variable',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'left',
  },
};
