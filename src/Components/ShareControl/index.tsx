import {
  TouchableOpacity,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import { styledColors } from '../../theme/styles';
import ChatIcon from '../../../assets/icons/chat.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import PrinterIcon from '../../../assets/icons/printer.svg';
import ChatWhiteIcon from '../../../assets/icons/chat_white.svg';
import UploadWhiteIcon from '../../../assets/icons/upload_white.svg';
import EmailWhiteIcon from '../../../assets/icons/email_white.svg';
import PrinterWhiteIcon from '../../../assets/icons/printer_white.svg';

export default function ShareControl() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity>
          {isDarkMode ? (
            <PrinterWhiteIcon width={32} height={32} />
            
          ) : (
            <PrinterIcon width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          {isDarkMode ? (
            <EmailWhiteIcon width={32} height={32} />
          ) : (
            <EmailIcon width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          {isDarkMode ? (
            <ChatWhiteIcon width={32} height={32} />
          ) : (
            <ChatIcon width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          {isDarkMode ? (
            <UploadWhiteIcon width={32} height={32} />
          ) : (
            <UploadIcon width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    width: 32,
    height: 32,
    borderColor: styledColors.gray,
    borderRadius: 16,
    paddingLeft: 'auto',
    paddingRight: 'auto',
    paddingTop: 6,
    marginLeft: 8,
    marginRight: 8,
    alignItems: 'center',
    verticalAlign: 'middle',
    alignContent: 'center',
    paddingVertical: 'auto',
    lineHeight: 32,
  },
});
