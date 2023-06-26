import React, { useState } from 'react';

import { createCtx } from '.';

export interface SnackBarInfo {
  message: string;
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
  },
};

const [useContext, SnackBarContextProvider] =
  createCtx<SnackBarContext>('snackBarContext');

export const SnackBarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<SnackBarContextState>(INITIAL_STATE);

  const closeSnackBar = () =>
    setState({ isOpen: false, snackBar: { message: '' } });

  const showSnackBar = (newInfo: SnackBarInfo) =>
    setState({ isOpen: true, snackBar: newInfo });

  return (
    <SnackBarContextProvider value={{ ...state, closeSnackBar, showSnackBar }}>
      {children}
    </SnackBarContextProvider>
  );
};

export const useSnackBar = useContext;
