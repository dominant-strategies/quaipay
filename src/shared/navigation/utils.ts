import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamList } from '.';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const goHome = () => navigationRef.current?.navigate('Main');
