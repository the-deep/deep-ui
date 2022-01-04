import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag } from 'react-icons/io5';

import QuickActionButton, { Props as QuickActionButtonProps } from '../../src/components/QuickActionButton';

export default {
    title: 'Action/QuickActionButton',
    component: QuickActionButton,
    argTypes: {},
};

const Template: Story<QuickActionButtonProps<string>> = (args) => (
    <QuickActionButton
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    children: <IoFlag />,
};
