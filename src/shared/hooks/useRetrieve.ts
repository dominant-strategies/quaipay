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
      setRetrieved(parseIfParsable(retrievedItem));
    })();
  }, [key]);
  return retrieved;
};

const parseIfParsable = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (_) {
    return value;
  }
};
