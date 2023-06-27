import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/src/components/bottomSheetBackdrop/types';

type QuaiPayBottomSheetModalProps = {
  children: React.ReactNode;
};
export const QuaiPayBottomSheetModal = forwardRef<
  BottomSheetModal,
  QuaiPayBottomSheetModalProps
>(({ children }, ref) => {
  const snapPoints = useMemo(() => ['85%'], []);
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
    >
      {children}
    </BottomSheetModal>
  );
});
