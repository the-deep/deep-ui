import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoExitOutline } from 'react-icons/io5';

import QuickActionDropdownMenu, {
    Props as QuickActionDropdownMenuProps,
} from '../components/QuickActionDropdownMenu';
import DropdownMenuItem, { Separator } from '../components/DropdownMenuItem';

export default {
    title: 'View/QuickActionDropdownMenu',
    component: QuickActionDropdownMenu,
    argTypes: {},
};

const handleMenuItemClick = () => {
    console.info('Dropdown menu clicked');
};

const Template: Story<QuickActionDropdownMenuProps> = (args) => (
    <QuickActionDropdownMenu
        {...args}
    >
        <DropdownMenuItem name={undefined} onClick={handleMenuItemClick}>
            Home
        </DropdownMenuItem>
        <DropdownMenuItem name={undefined} onClick={handleMenuItemClick}>
            Profile
        </DropdownMenuItem>
        <DropdownMenuItem name={undefined} onClick={handleMenuItemClick}>
            Projects
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem name={undefined} onClick={handleMenuItemClick}>
            Logout
        </DropdownMenuItem>
        <DropdownMenuItem
            href="https://togglecorp.com"
            actions={<IoExitOutline />}
        >
            Goto Togglecorp
        </DropdownMenuItem>
    </QuickActionDropdownMenu>
);

export const Default = Template.bind({});

Default.args = {
    label: <IoExitOutline />,
};

export const PrimaryButtonLike = Template.bind({});
PrimaryButtonLike.args = {
    label: <IoExitOutline />,
    variant: 'primary',
};
