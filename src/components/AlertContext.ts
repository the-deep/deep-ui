import React from 'react';

export type AlertVariant = 'success' | 'error' | 'info';

export const DEFAULT_ALERT_DISMISS_DURATION = 3000;

export interface AlertOptions {
    children: React.ReactNode;
    duration: number;
    name: string;
    nonDismissable?: boolean;
    variant: AlertVariant;
}

export interface AlertContextParams {
    alerts: AlertOptions[];
    addAlert: (p: AlertOptions) => void;
    removeAlert: (name: string) => void;
    updateAlertContent: (name: string, children: AlertOptions['children']) => void;
}

const AlertContext = React.createContext<AlertContextParams>({
    alerts: [],
    addAlert: () => { console.warn('addAlert called before it was initialized'); },
    removeAlert: () => { console.warn('removeAlert called before it was initialized'); },
    updateAlertContent: () => { console.warn('updateAlert called before it was initialized'); },
});

export default AlertContext;
