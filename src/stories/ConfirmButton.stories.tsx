import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import ConfirmButton, { Props as ConfirmButtonProps } from '../components/ConfirmButton';

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
    confirmButtonContent: 'Blue pill',
    denyButtonContent: 'Red pill',
    heading: 'Exit the Matrix',
    message: 'Your decision is final.',
    children: 'Exit',
};

export const OpenInitially = Template.bind({});
OpenInitially.args = {
    confirmButtonContent: 'Blue',
    denyButtonContent: 'Red',
    heading: 'Exit the Matrix',
    message: 'Choose one of the pills.',
    showConfirmationInitially: true,
    children: 'Exit',
};
