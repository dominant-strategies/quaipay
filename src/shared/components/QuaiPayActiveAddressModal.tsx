import React, { forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { QuaiPayBottomSheetModal } from 'src/shared/components/QuaiPayBottomSheetModal';
import { QuaiPayText } from 'src/shared/components/index';

export const QuaiPayActiveAddressModal = forwardRef<BottomSheetModal>(
  ({}, ref) => {
    return (
      <QuaiPayBottomSheetModal ref={ref}>
        <QuaiPayText>Choose Active Address</QuaiPayText>
      </QuaiPayBottomSheetModal>
    );
  },
);
