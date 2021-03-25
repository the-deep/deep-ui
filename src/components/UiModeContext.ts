import React from 'react';

const noOp = () => {
    console.warn('setUiMode called before it was assigned');
};

export type UiMode = 'light' | 'dark';

export interface UiModeContextProps {
    uiMode: UiMode;
    setUiMode: (newMode: UiMode) => void;
}

const UiModeContext = React.createContext<UiModeContextProps>({
    uiMode: 'light',
    setUiMode: noOp,
});

export default UiModeContext;
