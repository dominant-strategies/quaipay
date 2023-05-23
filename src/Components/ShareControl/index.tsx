import {
  TouchableOpacity,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styledColors } from '../../theme/styles';

export default function ShareControl() {
  const isDarkMode = useColorScheme() === 'dark';
  const color = isDarkMode ? styledColors.white : styledColors.black;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity>
          <Icon name="print" size={16} color={color} />
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          <Icon name="envelope-o" size={16} color={color} />
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          <Icon name="comment-o" size={16} color={color} />
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <TouchableOpacity>
          <Icon name="arrow-up" size={16} color={color} />
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
    borderWidth: 1,
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
