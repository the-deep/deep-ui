import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import ConfirmButton, { Props as ConfirmButtonProps } from '#components/ConfirmButton';

export default {
    title: 'Action/ConfirmButton',
    component: ConfirmButton,
    argTypes: {},
};

const Template: Story<ConfirmButtonProps<string>> = (args) => (
    <ConfirmButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
    confirmLabel: 'Blue pill',
    cancelLabel: 'Red pill',
    confirmationHeader: 'Exit the Matrix',
    confirmationMessage: 'Your decision is final.',
    children: 'Exit',
};

export const OpenInitially = Template.bind({});
OpenInitially.args = {
    confirmLabel: 'Blue',
    cancelLabel: 'Red',
    confirmationHeader: 'Exit the Matrix',
    confirmationMessage: 'Choose one of the pills.',
    children: 'Exit',
    opened: true,
};
