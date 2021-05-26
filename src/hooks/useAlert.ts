import React from 'react';
import { randomString } from '@togglecorp/fujs';

import AlertContext, {
    AlertOptions,
    DEFAULT_ALERT_DISMISS_DURATION,
} from '../components/AlertContext';

type AddAlertOption = Partial<Omit<AlertOptions, 'children'>>;

function useAlert() {
    const {
        addAlert,
        removeAlert,
        updateAlertContent,
    } = React.useContext(AlertContext);

    const show = React.useCallback((children: React.ReactNode, options?: AddAlertOption) => {
        const name = options?.name ?? randomString(16);
        addAlert({
            variant: options?.variant ?? 'info',
            duration: options?.duration ?? DEFAULT_ALERT_DISMISS_DURATION,
            name,
            children,
            nonDismissable: options?.nonDismissable ?? false,
        });
    }, [addAlert]);

    const hide = removeAlert;
    const updateContent = updateAlertContent;

    const alert = React.useMemo(() => ({
        show,
        hide,
        updateContent,
    } as const), [show, hide, updateContent]);

    return alert;
}

export default useAlert;
