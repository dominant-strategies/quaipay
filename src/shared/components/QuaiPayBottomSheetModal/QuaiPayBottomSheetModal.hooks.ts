import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBackHandler } from '@react-native-community/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useBottomSheetModal = () => {
  const ref = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalOpenState = { isOpen, setIsOpen };

  useEffect(() => {
    if (isOpen) {
      ref.current?.present();
    }
  }, [isOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    ref.current?.close();
  }, []);

  useBackHandler(() => {
    if (isOpen) {
      close();
      return true;
    }
    return false;
  });

  return {
    close,
    modalOpenState,
    open,
    ref,
  };
};
