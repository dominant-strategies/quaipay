import { useEffect, useState } from 'react';
import { retrieveStoredItem } from '../services/keychain';

export const useRetrieve = (key: string) => {
  const [retrieved, setRetrieved] = useState<any>();
  useEffect(() => {
    (async () => {
      const retrievedItem = await retrieveStoredItem(key);
      if (!retrievedItem) {
        throw new Error(`No ${key} found`);
      }
      setRetrieved(retrievedItem);
    })();
  }, [key]);
  return retrieved;
};
