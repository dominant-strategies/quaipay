import {
  TouchableOpacity,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styledColors } from '../../theme/styles';
import ChatIcon from '../../../assets/icons/chat.svg';
import UploadIcon from '../../../assets/icons/upload.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import PrinterIcon from '../../../assets/icons/printer.svg';

export default function ShareControl() {
  const isDarkMode = useColorScheme() === 'dark';
  const color = isDarkMode ? styledColors.white : styledColors.black;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity>
          <PrinterIcon width={32} height={32}></PrinterIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          <EmailIcon width={32} height={32}></EmailIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          <ChatIcon width={32} height={32}></ChatIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          <UploadIcon width={32} height={32}></UploadIcon>
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
