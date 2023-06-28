import React, { useEffect, useState } from 'react';

import { createCtx } from '.';
import { QuaiPaySnackBarType } from '../components/QuaiPaySnackBar';

export interface SnackBarInfo {
  message: string;
  moreInfo?: string;
  type: QuaiPaySnackBarType;
}

// State variables only
interface SnackBarContextState {
  isOpen: boolean;
  snackBar: SnackBarInfo;
}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface SnackBarContext extends SnackBarContextState {
  closeSnackBar: () => void;
  showSnackBar: (info: SnackBarInfo) => void;
}

const INITIAL_STATE: SnackBarContextState = {
  isOpen: false,
  snackBar: {
    message: '',
    type: 'error',
  },
};

const [useContext, SnackBarContextProvider] =
  createCtx<SnackBarContext>('snackBarContext');

export const SnackBarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<SnackBarContextState>(INITIAL_STATE);
  const [shouldResetWithNewInfo, setShouldResetWithNewInfo] = useState<{
    state: boolean;
    info: SnackBarInfo;
  }>({
    state: false,
    info: INITIAL_STATE.snackBar,
  });

  const closeSnackBar = () =>
    setState({ isOpen: false, snackBar: INITIAL_STATE.snackBar });

  const showSnackBar = (newInfo: SnackBarInfo) =>
    setState(({ isOpen }) => {
      // When SnackBar is visible, close it and show new one
      if (isOpen) {
        setShouldResetWithNewInfo({
          state: true,
          info: newInfo,
        });
        return { isOpen: false, snackBar: INITIAL_STATE.snackBar };
      }

      // When not visible, simply show it
      return {
        isOpen: true,
        snackBar: newInfo,
      };
    });

  useEffect(() => {
    if (shouldResetWithNewInfo.state) {
      setState({
        isOpen: true,
        snackBar: shouldResetWithNewInfo.info,
      });
      return () =>
        setShouldResetWithNewInfo({
          state: false,
          info: INITIAL_STATE.snackBar,
        });
    }
  }, [shouldResetWithNewInfo]);

  return (
    <SnackBarContextProvider value={{ ...state, closeSnackBar, showSnackBar }}>
      {children}
    </SnackBarContextProvider>
  );
};

export const useSnackBar = useContext;
