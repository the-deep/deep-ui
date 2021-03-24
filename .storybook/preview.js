import React from 'react';
import { configureActions } from '@storybook/addon-actions';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';

import '../src/styles.css';
import UiModeContext from '../src/components/UiModeContext';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    darkMode: {
        dark: { ...themes.dark, appBg: '#313131' },
        light: { ...themes.normal, appBg: '#f0f0f0' },
        current: 'light',
    },
}

configureActions({
    depth: 3,
    // Limit the number of items logged into the actions panel
    limit: 20,
});


const withDarkMode = (Story, context) => {
    const isDarkMode = useDarkMode();
    const uiMode = isDarkMode ? 'dark' : 'light';

    return (
        <UiModeContext.Provider value={{ uiMode }}>
            <Story {...context} />
        </UiModeContext.Provider>
    );
}

export const decorators = [withDarkMode];
