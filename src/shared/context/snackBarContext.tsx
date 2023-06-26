import React, { useState } from 'react';

import { createCtx } from '.';

// State variables only
interface SnackBarContextState {}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface SnackBarContext extends SnackBarContextState {}

const INITIAL_STATE: SnackBarContextState = {};

const [useContext, SnackBarContextProvider] =
  createCtx<SnackBarContext>('snackBarContext');

export const SnackBarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, _] = useState<SnackBarContextState>(INITIAL_STATE);

  return (
    <SnackBarContextProvider value={{ ...state }}>
      {children}
    </SnackBarContextProvider>
  );
};

export const useSnackBarContext = useContext;
