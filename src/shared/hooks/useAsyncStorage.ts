import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key: string) => {
  const [retrieved, setRetrieved] = useState<any>();
  useEffect(() => {
    (async () => {
      console.log('key', key);
      const retrievedItem = await AsyncStorage.getItem(key);
      console.log('retrievedItem', retrievedItem);
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
