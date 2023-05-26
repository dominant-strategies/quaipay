import { useEffect, useState } from 'react';
import { retrieveStoredItem } from '../services/keychain';

export const useRetrieve = <T>(key: string) => {
  const [retrieved, setRetrieved] = useState<any>();
  useEffect(() => {
    const retrieve = async () => {
      const retrievedItem = await retrieveStoredItem(key);
      if (!retrievedItem) {
        throw new Error(`No ${key} found`);
      }
      setRetrieved(retrievedItem);
    };
    retrieve();
  }, [key]);
  return retrieved;
};
