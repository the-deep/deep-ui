import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import {
    IoTrash,
    IoMaleFemale,
    IoCheckmarkDone,
    IoClose,
    IoExpand,
} from 'react-icons/io5';

import QuickActionConfirmButton, { Props as QuickActionConfirmButtonProps } from '../components/QuickActionConfirmButton';

export default {
    title: 'Action/QuickActionConfirmButton',
    component: QuickActionConfirmButton,
    argTypes: {},
};

const Template: Story<QuickActionConfirmButtonProps<string>> = (args) => (
    <QuickActionConfirmButton
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    children: <IoTrash />,
};

export const CustomProperties = Template.bind({});
CustomProperties.args = {
    children: <IoMaleFemale />,
    heading: 'Exit the Matrix?',
    message: 'The decision is yours, please choose wisely',
    confirmButtonContent: 'Blue pill',
    onConfirm: () => { console.warn('here'); },
    confirmButtonActions: <IoCheckmarkDone />,
    denyButtonContent: 'Red pill',
    denyButtonActions: <IoClose />,
};

export const ShowInitially = Template.bind({});
ShowInitially.args = {
    children: <IoExpand />,
    showConfirmationInitially: true,
};
