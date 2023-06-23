import { useEffect, useState } from 'react';

import { useContacts } from 'src/shared/hooks';
import { Contact } from 'src/shared/types';

export const useFilteredContacts = (searchText?: string) => {
  const contacts = useContacts();

  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(
    contacts ?? [],
  );

  useEffect(() => {
    if (contacts) {
      setFilteredContacts(
        searchText
          ? contacts.filter(contact => {
              return contact.username
                ?.toLowerCase()
                ?.includes(searchText.toLowerCase());
            })
          : contacts,
      );
    }
  }, [contacts, searchText]);

  return { contacts, filteredContacts };
};
