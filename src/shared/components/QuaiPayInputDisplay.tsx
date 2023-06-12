import React from 'react';
import { QuaiPayText } from './QuaiPayText';
import { TextProps } from 'react-native';

interface QuaiPayInputDisplayProps extends TextProps {
  prefix?: string;
  suffix?: string;
  value: string;
}

// TODO: Tweak L&F to follow design
export const QuaiPayInputDisplay: React.FC<QuaiPayInputDisplayProps> = ({
  prefix,
  value,
  suffix,
  style,
}) => {
  return (
    <QuaiPayText type="H1" allowFontScaling style={style}>
      {prefix}
      {value}
      {suffix}
    </QuaiPayText>
  );
};
