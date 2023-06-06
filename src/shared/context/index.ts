import { createContext, useContext } from 'react';

export const createCtx = <T>(displayName: string) => {
  const ctx = createContext<T | undefined>(undefined);
  ctx.displayName = displayName;

  const useCtx = () => {
    const c = useContext(ctx);

    if (!c) {
      throw new Error(
        'useContext must be inside a ContextProvider with a value',
      );
    }
    return c;
  };

  return [useCtx, ctx.Provider, ctx] as const;
};
