import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import PendingMessage, { Props as ContainerProps } from '../components/PendingMessage';

export default {
    title: 'View/PendingMessage',
    component: PendingMessage,
    argTypes: {},
};

const Template: Story<ContainerProps> = (args) => (
    <div
        style={{
            width: '100%',
        }}
    >
        <div
            style={{
                width: '100%',
                height: '10vh',
                backgroundColor: 'tomato',
                marginTop: '500px',
            }}
        />
        <div
            style={{
                width: '100%',
                height: '70vh',
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '50vh',
                    backgroundColor: '#e0e0e0',
                    marginTop: '500px',
                }}
            >
                <PendingMessage
                    {...args}
                />
            </div>
            <div
                style={{
                    width: '100%',
                    height: '60vh',
                    marginTop: '20vh',
                    backgroundColor: '#ffa0f0',
                }}
            />
        </div>
        <div
            style={{
                width: '100%',
                height: '500px',
                marginTop: '20vh',
                backgroundColor: '#ffa0f0',
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    width: 'calc(100% - 100px)',
                    height: '1500px',
                    margin: '50px',
                    backgroundColor: '#a3a0f0',
                }}
            />
        </div>
    </div>
);

export const Default = Template.bind({});
Default.args = {
};
