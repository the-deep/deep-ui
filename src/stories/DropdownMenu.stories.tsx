import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DropdownMenu, { Props as DropdownMenuProps } from '#components/DropdownMenu';

export default {
    title: 'View/DropdownMenu',
    component: DropdownMenu,
    argTypes: {},
};

const Template: Story<DropdownMenuProps> = (args) => (
    <DropdownMenu
        {...args}
    />
);

export const Default = Template.bind({});

Default.args = {
    label: 'Click me',
    children: 'Okay',
};

export const WithoutDropdownIcon = Template.bind({});
