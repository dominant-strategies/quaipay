import { useThemedStyle } from 'src/shared/hooks';
import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsLink, SettingsLinksProps } from './SettingsLink';

import AccountDetails from 'src/shared/assets/accountDetails.svg';
import AccountRecovery from 'src/shared/assets/accountRecovery.svg';
import Bell from 'src/shared/assets/bell.svg';
import Document from 'src/shared/assets/document.svg';
import DollarSign from 'src/shared/assets/dollarSign.svg';
import SpeechBubble from 'src/shared/assets/speechBubble.svg';

import { RootNavigator } from 'src/shared/navigation/utils';

export const SettingsLinks = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.landing',
  });
  const styles = useThemedStyle(themedStyle);

  const links: SettingsLinksProps[] = useMemo(() => {
    return [
      {
        text: t('accountDetails'),
        icon: <AccountDetails />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'AccountDetails' }),
      },
      {
        text: t('accountRecovery'),
        icon: <AccountRecovery />,
        redirect: () =>
          RootNavigator.navigate('ExportStack', { screen: 'ExportLanding' }),
      },
      {
        text: t('notifications'),
        icon: <Bell />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'Notifications' }),
      },
      {
        text: t('feedback'),
        icon: <SpeechBubble />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'Feedback' }),
      },
      {
        text: t('referral'),
        icon: <DollarSign />,
        redirect: () =>
          RootNavigator.navigate('SettingsStack', { screen: 'Referral' }),
      },
      {
        text: t('legal'),
        icon: <Document />,
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

const themedStyle = () =>
  StyleSheet.create({
    wrapper: { paddingHorizontal: 32, paddingVertical: 24 },
  });
