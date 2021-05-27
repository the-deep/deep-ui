import React from 'react';
import { _cs } from '@togglecorp/fujs';

import AlertContext, {
    DEFAULT_ALERT_DISMISS_DURATION,
} from '../AlertContext';

import Alert from '../Alert';
import { genericMemo } from '../../utils';

import styles from './styles.css';

export interface Props {
    className?: string;
    children?: React.ReactNode;
    maxAlerts?: number;
}

function AlertContainer(props: Props) {
    const {
        className,
        children,
        maxAlerts = 5,
    } = props;

    const {
        alerts,
        removeAlert,
    } = React.useContext(AlertContext);

    const [numExtra, setNumExtra] = React.useState(0);

    const handleAlertCloseButtonClick = React.useCallback((name: string, removalDelay: number) => {
        setNumExtra((prev) => prev + 1);
        window.setTimeout(() => {
            removeAlert(name);
            setNumExtra((prev) => prev - 1);
        }, removalDelay);
    }, [removeAlert]);

    const handleAlertTimeout = React.useCallback((name: string, removalDelay: number) => {
        setNumExtra((prev) => prev + 1);
        window.setTimeout(() => {
            removeAlert(name);
            setNumExtra((prev) => prev - 1);
        }, removalDelay);
    }, [removeAlert]);

    const numVisibleAlerts = maxAlerts + numExtra;
    const displayAlerts = alerts.slice(0, numVisibleAlerts);
    const numHiddenAlerts = alerts.length - maxAlerts;

    return (
        <div className={_cs(styles.alertContainer, className)}>
            {displayAlerts.map((alert) => (
                <Alert
                    name={alert.name}
                    className={styles.alert}
                    key={alert.name}
                    nonDismissable={alert.nonDismissable}
                    variant={alert.variant}
                    onCloseButtonClick={handleAlertCloseButtonClick}
                    duration={alert.duration ?? DEFAULT_ALERT_DISMISS_DURATION}
                    onTimeout={handleAlertTimeout}
                >
                    { alert.children }
                </Alert>
            ))}
            {numHiddenAlerts > 0 && (
                <Alert
                    name="$__and_n_more"
                    className={styles.alert}
                    nonDismissable
                    variant="info"
                    hideIcon
                >
                    {`...and ${numHiddenAlerts} more`}
                </Alert>
            )}
            { children }
        </div>
    );
}

export default genericMemo(AlertContainer);
