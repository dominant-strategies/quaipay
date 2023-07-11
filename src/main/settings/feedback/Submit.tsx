import React, { useState } from 'react';
import { StyleSheet, Switch, TextInput, View } from 'react-native';
import {
  QuaiPayButton,
  QuaiPaySettingsContent,
  QuaiPayText,
} from 'src/shared/components';
import { useTranslation } from 'react-i18next';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';
import { useTheme } from 'src/shared/context/themeContext';

export const Submit = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.feedback.submit',
  });
  const styles = useThemedStyle(themedStyle);
  const { theme } = useTheme();

  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sendLogsEnabled, setSendLogsEnabled] = useState(false);
  const toggleSendLogs = () =>
    setSendLogsEnabled(previousState => !previousState);
  return (
    <QuaiPaySettingsContent
      containerStyle={styles.container}
      title={t('submitFeedback')}
    >
      <QuaiPayText style={styles.titleText} type="H3">
        {t('message')}
      </QuaiPayText>
      <TextInput
        multiline={true}
        onChangeText={setMessage}
        placeholder={t('messagePlaceholder') as string}
        placeholderTextColor={theme.secondary}
        style={[styles.messageInput, styles.multilineInput]}
        value={message}
      />
      <QuaiPayText style={styles.titleText} type="H3">
        {t('name')}
      </QuaiPayText>
      <TextInput
        onChangeText={setName}
        placeholder={t('name') as string}
        placeholderTextColor={theme.secondary}
        style={styles.messageInput}
        value={name}
      />
      <QuaiPayText style={styles.titleText} type="H3">
        {t('email')}
      </QuaiPayText>
      <TextInput
        onChangeText={setEmail}
        placeholder={t('email') as string}
        placeholderTextColor={theme.secondary}
        style={styles.messageInput}
        value={email}
      />
      <View style={styles.logSwitch}>
        <Switch
          trackColor={{ false: theme.background, true: theme.background }}
          thumbColor={sendLogsEnabled ? theme.normal : theme.secondary}
          ios_backgroundColor={theme.background}
          onValueChange={toggleSendLogs}
          value={sendLogsEnabled}
        />
        <QuaiPayText style={styles.logText}>{t('attachLogs')}</QuaiPayText>
      </View>
      <QuaiPayText style={styles.logDescription} themeColor="secondary">
        {t('logsExplanation')}
      </QuaiPayText>
      <QuaiPayButton
        style={styles.button}
        title={t('submitFeedback')}
        outlined
      />
    </QuaiPaySettingsContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      width: '100%',
      padding: 16,
    },
    titleText: {
      marginVertical: 8,
    },
    messageInput: {
      borderColor: theme.border,
      borderRadius: 4,
      borderWidth: 1,
      padding: 8,
      width: '100%',
      color: theme.primary,
    },
    multilineInput: {
      height: 182,
    },
    button: { padding: 0, height: 36 },
    logSwitch: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 14,
      marginBottom: 5,
    },
    logText: {
      fontSize: 14,
      marginLeft: 12,
    },
    logDescription: {
      textAlign: 'left',
      marginBottom: 16,
    },
  });
