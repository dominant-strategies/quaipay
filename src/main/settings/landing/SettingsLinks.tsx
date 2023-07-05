import { useThemedStyle } from 'src/shared/hooks';
import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsLink, SettingsLinksProps } from './SettingsLink';

import AccountDetails from 'src/shared/assets/accountDetails.svg';
import AccountRecovery from 'src/shared/assets/accountRecovery.svg';
import Bell from 'src/shared/assets/bell.svg';
import Document from 'src/shared/assets/document.svg';
import DollarSign from 'src/shared/assets/dollarSign.svg';
import SpeechBubble from 'src/shared/assets/speechBubble.svg';
import AccountDetailsWhite from 'src/shared/assets/accountDetailsWhite.svg';
import AccountRecoveryWhite from 'src/shared/assets/accountRecoveryWhite.svg';
import BellWhite from 'src/shared/assets/bellWhite.svg';
import DocumentWhite from 'src/shared/assets/documentWhite.svg';
import DollarSignWhite from 'src/shared/assets/dollarSignWhite.svg';
import SpeechBubbleWhite from 'src/shared/assets/speechBubbleWhite.svg';

import { RootNavigator } from 'src/shared/navigation/utils';
import { Theme } from 'src/shared/types';
import { useTheme } from 'src/shared/context/themeContext';

export const SettingsLinks = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.landing',
  });
  const styles = useThemedStyle(themedStyle);
  const { isDarkMode } = useTheme();

  const links: SettingsLinksProps[] = useMemo(() => {
    return [
      {
        text: t('accountDetails'),
        icon: isDarkMode ? <AccountDetailsWhite /> : <AccountDetails />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'AccountDetails' }),
      },
      {
        text: t('accountRecovery'),
        icon: isDarkMode ? <AccountRecoveryWhite /> : <AccountRecovery />,
        redirect: () =>
          RootNavigator.navigate('ExportStack', { screen: 'ExportLanding' }),
      },
      {
        text: t('notifications'),
        icon: isDarkMode ? <BellWhite /> : <Bell />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'Notifications' }),
      },
      {
        text: t('feedback'),
        icon: isDarkMode ? <SpeechBubbleWhite /> : <SpeechBubble />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'Feedback' }),
      },
      {
        text: t('referral'),
        icon: isDarkMode ? <DollarSignWhite /> : <DollarSign />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'Referral' }),
      },
      {
        text: t('legal'),
        icon: isDarkMode ? <DocumentWhite /> : <Document />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'Legal' }),
      },
    ];
  }, []);

  return (
    <View style={styles.wrapper}>
      {links.map(link => (
        <SettingsLink
          key={link.text}
          text={link.text}
          icon={link.icon}
          redirect={link.redirect}
        />
      ))}
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 32,
      paddingVertical: 24,
      backgroundColor: theme.surface,
      height: Dimensions.get('window').height * 0.5,
    },
  });
