import { keychainKeys } from '../constants/keychainKeys';
import { Contact } from '../types/Contact';
import { retrieveStoredItem, storeItem } from '../services/keychain';
import { useEffect, useState } from 'react';

export const useContacts = (): Contact[] | undefined => {
  const [retrieved, setRetrieved] = useState<any>();
  useEffect(() => {
    (async () => {
      const retrievedItem = await retrieveStoredItem(keychainKeys.contacts);
      setRetrieved(parseIfParsable(retrievedItem));
    })();
  }, [keychainKeys.contacts]);
  return retrieved;
};

export const addContact = async (contact: Contact) => {
  const contacts = (await retrieveStoredItem(keychainKeys.contacts)) || '[]';
  const parsedContacts = JSON.parse(contacts);
  const updatedContacts = [...parsedContacts, contact];
  const stringifiedContacts = JSON.stringify(updatedContacts);
  await storeItem({ key: keychainKeys.contacts, value: stringifiedContacts });
};

const parseIfParsable = (value: string | false) => {
  try {
    return JSON.parse(value as any);
  } catch (_) {
    return value;
  }
};
