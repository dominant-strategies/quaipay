import * as Keychain from 'react-native-keychain';
import { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE, SECURITY_LEVEL, STORAGE_TYPE } from 'react-native-keychain';

type KeychainItem = { key: string; value: string };
export const storeItem = async ({ key, value }: KeychainItem) => {
    await Keychain.setGenericPassword('Quaipay', value, {
        accessControl: ACCESS_CONTROL.DEVICE_PASSCODE,
        // ios only
        accessible: ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
        // ios only
        authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
        // android only
        securityLevel: SECURITY_LEVEL.SECURE_HARDWARE,
        service: key,
        // android only
        storage: STORAGE_TYPE.AES
    })

    const retrievedValue = await retrieveStoredItem(key);
    if (value !== retrievedValue) {
        throw new Error("Stored item doesn't match passed item");
    }
}

export const retrieveStoredItem = async (key: string) => {
    const credentials = await Keychain.getGenericPassword({
        authenticationPrompt: {
            title: 'Authenticate to retrieve your mnemonic',
            subtitle: 'Please use your device credentials',
            description: 'This is needed to decrypt your mnemonic',
            cancel: 'Cancel'
        },
        authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
        securityLevel: SECURITY_LEVEL.SECURE_HARDWARE,
        service: key,
        storage: STORAGE_TYPE.AES
    });
    if (credentials) {
        return credentials.password;
    }
    return null;
}
