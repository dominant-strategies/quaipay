import { useRetrieve } from './useRetrieve';
import { keychainKeys } from '../constants/keychainKeys';
import { Contact } from '../types/Contact';
import { retrieveStoredItem, storeItem } from '../services/keychain';

export const useContacts = () => {
  return useRetrieve(keychainKeys.contacts);
};

export const addContact = async (contact: Contact) => {
  const contacts = (await retrieveStoredItem(keychainKeys.contacts)) || '[]';
  const parsedContacts = JSON.parse(contacts);
  const updatedContacts = [...parsedContacts, contact];
  const stringifiedContacts = JSON.stringify(updatedContacts);
  await storeItem({ key: keychainKeys.contacts, value: stringifiedContacts });
};
