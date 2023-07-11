import React, { useState } from 'react';
import {
  QuaiPayButton,
  QuaiPaySettingsContent,
  QuaiPayText,
} from 'src/shared/components';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, Switch, View } from 'react-native';
import { useTheme } from 'src/shared/context/themeContext';

export const Notifications = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.notifications',
  });
  const { theme } = useTheme();

  const [bankNotificationsEnabled, setBankNotificationsEnabled] =
    useState(false);
  const toggleBankSwitch = () =>
    setBankNotificationsEnabled(previousState => !previousState);
  const [paymentNotificationsEnabled, setPaymentNotificationsEnabled] =
    useState(false);
  const togglePaymentSwitch = () =>
    setPaymentNotificationsEnabled(previousState => !previousState);

  // TODO: update link
  const goToLearnMoreRecovery = () =>
    Linking.openURL('https://docs.quai.network/use-quai/wallets');

  return (
    <QuaiPaySettingsContent title={t('notifications')}>
      <View style={styles.container}>
        <View>
          <QuaiPayText style={styles.title} type="bold">
            {t('pushNotifications')}
          </QuaiPayText>
          <View style={styles.notificationContainer}>
            <View style={styles.notificationText}>
              <QuaiPayText type="H3">{t('bankTransfer')}</QuaiPayText>
              <QuaiPayText themeColor="secondary">
                {t('bankTransferDescription')}
              </QuaiPayText>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: theme.background, true: theme.background }}
                thumbColor={
                  bankNotificationsEnabled ? theme.normal : theme.secondary
                }
                ios_backgroundColor={theme.background}
                onValueChange={toggleBankSwitch}
                value={bankNotificationsEnabled}
              />
              <QuaiPayText style={styles.switchText}>
                {bankNotificationsEnabled ? t('on') : t('off')}
              </QuaiPayText>
            </View>
          </View>
          <View style={styles.notificationContainer}>
            <View style={styles.notificationText}>
              <QuaiPayText type="H3">{t('paymentReceived')}</QuaiPayText>
              <QuaiPayText themeColor="secondary">
                {t('paymentReceivedDescription')}
              </QuaiPayText>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: theme.background, true: theme.background }}
                thumbColor={
                  paymentNotificationsEnabled ? theme.normal : theme.secondary
                }
                ios_backgroundColor={theme.background}
                onValueChange={togglePaymentSwitch}
                value={paymentNotificationsEnabled}
              />
              <QuaiPayText style={styles.switchText}>
                {paymentNotificationsEnabled ? t('on') : t('off')}
              </QuaiPayText>
            </View>
          </View>
        </View>
        <QuaiPayButton
          underline
          type="secondary"
          titleType="default"
          title={t('learnMore')}
          onPress={goToLearnMoreRecovery}
          style={styles.learnMore}
        />
      </View>
    </QuaiPaySettingsContent>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 16,
    justifyContent: 'space-between',
    height: '100%',
  },
  title: {
    fontSize: 16,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    width: '100%',
  },
  notificationText: {
    alignItems: 'flex-start',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchText: {
    width: 32,
  },
  learnMore: {
    marginHorizontal: 24,
  },
});
