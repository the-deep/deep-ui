import React from 'react';
import { configureActions } from '@storybook/addon-actions';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';
import { unique } from '@togglecorp/fujs';

import '../src/styles.css';
import UiModeContext from '../src/components/UiModeContext';
import AlertContext from '../src/components/AlertContext';
import AlertContainer from '../src/components/AlertContainer';

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

    const contextValue = React.useMemo(() => ({ uiMode }), [uiMode]);
    // Using `Story(context)` instead of `<Story {...context{ />` else the story gets dismounted
    // https://github.com/storybookjs/storybook/issues/12255#issuecomment-697956943
    return (
        <UiModeContext.Provider value={contextValue}>
            {Story(context)}
        </UiModeContext.Provider>
    );
}

const withAlertContext = (Story, context) => {
    const [alerts, setAlerts] = React.useState([]);

    const addAlert = React.useCallback((alert) => {
        setAlerts((prevAlerts) => unique(
            [...prevAlerts, alert],
            a => a.name
        ) ?? prevAlerts);
    }, [setAlerts]);

    const removeAlert = React.useCallback((name) => {
        setAlerts((prevAlerts) => {
            const i = prevAlerts.findIndex(a => a.name === name);
            if (i === -1) {
                return prevAlerts;
            }

            const newAlerts = [...prevAlerts];
            newAlerts.splice(i, 1);

            return newAlerts;
        });
    }, [setAlerts]);

    const updateAlertContent = React.useCallback((name, children) => {
        setAlerts((prevAlerts) => {
            const i = prevAlerts.findIndex(a => a.name === name);
            if (i === -1) {
                return prevAlerts;
            }

            const updatedAlert = {
                ...prevAlerts[i],
                children,
            };

            const newAlerts = [...prevAlerts];
            newAlerts.splice(i, 1, updatedAlert);

            return newAlerts;
        });
    }, [setAlerts]);

    const alertContextValue = React.useMemo(() => ({
        alerts,
        addAlert,
        updateAlertContent,
        removeAlert,
    }), [alerts, addAlert, updateAlertContent, removeAlert]);

    return (
        <AlertContext.Provider value={alertContextValue}>
            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    right: '1px',
                    width: '320px',
                    zIndex: '11',
                }}
            >
                <AlertContainer />
            </div>
            <Story {...context} />
        </AlertContext.Provider>
    );
}

export const decorators = [withDarkMode, withAlertContext];
