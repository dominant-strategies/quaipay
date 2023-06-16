import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamList } from '.';

const ref = createNavigationContainerRef<RootStackParamList>();

const goHome = () => ref.current?.navigate('Main', { screen: 'Home' });

export const RootNavigator = {
  goHome,
  navigate: ref?.navigate,
  ref,
};
