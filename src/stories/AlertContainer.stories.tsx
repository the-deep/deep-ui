import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import AlertContainer, { Props as AlertContainerProps } from '#components/AlertContainer';
import { AlertVariant } from '#components/AlertContext';
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
    <>
        You should visit
        &nbsp;
        <a
            href="https://togglecorp.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            our website
        </a>
    </>,
    'Such alert, much wow!',
    <div>
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

const Container = ({ children } : {
    children?: React.ReactNode;
}) => (
    <div
        style={{
            margin: '10px',
        }}
    >
        { children }
    </div>
);

const Template: Story<AlertContainerProps> = () => {
    const alert = useAlert();
    const [{ variant }, updateArgs] = useArgs();

    const handleVariantChange = (newVariant: AlertVariant) => {
        updateArgs({ variant: newVariant });
    };

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
                    onChange={handleVariantChange}
                    segmentKeySelector={(d) => d.key}
                    segmentLabelSelector={(d) => d.label}
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
};

export const Default = Template.bind({});
Default.args = {
};
