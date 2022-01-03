import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { unique } from '@togglecorp/fujs';

import AlertContainer, { Props as AlertContainerProps } from '#components/AlertContainer';
import AlertContext, { AlertOptions, AlertVariant } from '#components/AlertContext';
import Button from '#components/Button';
import SegmentInput from '#components/SegmentInput';
import useAlert from '#hooks/useAlert';

export default {
    title: 'View/AlertContainer',
    component: AlertContainer,
    argTypes: {},
};

const messages: React.ReactNode[] = [
    'It is what it is',
    'You\'ve done it now',
    'Ok! Ok! Ok! Calm down!',
    'Doesn\'t look very good',
    'Task failed not be successful',
    'Uh oh, looks like somebody is in trouble',
    <React.Fragment key="link">
        You should visit
        &nbsp;
        <a
            style={{ color: 'inherit' }}
            href="https://togglecorp.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            our website
        </a>
    </React.Fragment>,
    'Such alert, much wow!',
    <div key="message">
        <div>
            Just look at it
        </div>
        <div>
            Is it awesome or what?
        </div>
    </div>,
];

const alertVariantOptions: {
    key: AlertVariant,
    label: string;
}[] = [
    { key: 'info', label: 'Info' },
    { key: 'error', label: 'Error' },
    { key: 'success', label: 'Success' },
];

function Container({ children } : {
    children?: React.ReactNode;
}) {
    return (
        <div
            style={{
                margin: '10px',
            }}
        >
            { children }
        </div>
    );
}

interface Props {
    variant: AlertVariant;
    onVariantChange: (newVaraint: AlertVariant) => void;
}

function AlertControls(props: Props) {
    const {
        variant,
        onVariantChange,
    } = props;
    const alert = useAlert();

    const handleShowAlertButtonClick = React.useCallback(() => {
        const i = Math.floor(Math.random() * messages.length);
        alert.show(messages[i], {
            variant,
            duration: Infinity,
        });
    }, [alert, variant]);

    return (
        <>
            <Container>
                <SegmentInput
                    name=""
                    options={alertVariantOptions}
                    value={variant}
                    onChange={onVariantChange}
                    keySelector={(d) => d.key}
                    labelSelector={(d) => d.label}
                />
            </Container>
            <Container>
                <Button
                    name={undefined}
                    onClick={handleShowAlertButtonClick}
                >
                    Generate alert
                </Button>
            </Container>
        </>
    );
}

const Template: Story<AlertContainerProps> = () => {
    const [alerts, setAlerts] = React.useState<AlertOptions[]>([]);

    const addAlert = React.useCallback((alert) => {
        setAlerts((prevAlerts) => unique(
            [...prevAlerts, alert],
            (a) => a.name,
        ) ?? prevAlerts);
    }, [setAlerts]);

    const removeAlert = React.useCallback((name) => {
        setAlerts((prevAlerts) => {
            const i = prevAlerts.findIndex((a) => a.name === name);
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
            const i = prevAlerts.findIndex((a) => a.name === name);
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
    const [{ variant }, updateArgs] = useArgs();

    const handleVariantChange = (newVariant: AlertVariant) => {
        updateArgs({ variant: newVariant });
    };

    return (
        <AlertContext.Provider value={alertContextValue}>
            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    right: '1px',
                    width: '320px',
                    zIndex: 11,
                }}
            >
                <AlertContainer />
            </div>
            <AlertControls
                variant={variant}
                onVariantChange={handleVariantChange}
            />
        </AlertContext.Provider>
    );
};

export const Default = Template.bind({});
Default.args = {
};
