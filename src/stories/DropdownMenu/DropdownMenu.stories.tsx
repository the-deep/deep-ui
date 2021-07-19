import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoExitOutline } from 'react-icons/io5';

import DropdownMenu, { Props as DropdownMenuProps } from '#components/DropdownMenu';
import DropdownMenuItem, { Separator } from '#components/DropdownMenuItem';
import styles from './styles.css';

export default {
    title: 'View/DropdownMenu',
    component: DropdownMenu,
    argTypes: {},
};

const handleMenuItemClick = () => {
    console.info('Dropdown menu clicked');
};

const Template: Story<DropdownMenuProps> = (args) => (
    <DropdownMenu
        {...args}
    >
        <DropdownMenuItem onClick={handleMenuItemClick}>
            Home
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMenuItemClick}>
            Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMenuItemClick}>
            Projects
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={handleMenuItemClick}>
            Logout
        </DropdownMenuItem>
        <DropdownMenuItem
            href="https://togglecorp.com"
            actions={<IoExitOutline />}
        >
            Goto Togglecorp
        </DropdownMenuItem>
    </DropdownMenu>
);

export const Default = Template.bind({});

Default.args = {
    label: 'Click me',
};

export const WithoutDropdownIcon = Template.bind({});
WithoutDropdownIcon.args = {
    label: 'See, no dropdown icon',
    hideDropdownIcon: true,
};

export const PrimaryButtonLike = Template.bind({});
PrimaryButtonLike.args = {
    label: 'Looks like button',
    variant: 'primary',
};

export const Variants: Story = () => (
    <div className={styles.dropdownMenu}>
        <section>
            <h3>Variants</h3>
            <div className={styles.content}>
                <DropdownMenu
                    variant="primary"
                    label="primary"
                >
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Projects
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        href="https://togglecorp.com"
                        actions={<IoExitOutline />}
                    >
                        Goto Togglecorp
                    </DropdownMenuItem>
                </DropdownMenu>

                <DropdownMenu
                    variant="action"
                    label="action"
                >
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Projects
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        href="https://togglecorp.com"
                        actions={<IoExitOutline />}
                    >
                        Goto Togglecorp
                    </DropdownMenuItem>
                </DropdownMenu>

                <DropdownMenu
                    variant="secondary"
                    label="secondary"
                >
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Projects
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        href="https://togglecorp.com"
                        actions={<IoExitOutline />}
                    >
                        Goto Togglecorp
                    </DropdownMenuItem>
                </DropdownMenu>

                <DropdownMenu
                    variant="tertiary"
                    label="tertiary"
                >
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Projects
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        href="https://togglecorp.com"
                        actions={<IoExitOutline />}
                    >
                        Goto Togglecorp
                    </DropdownMenuItem>
                </DropdownMenu>

                <DropdownMenu
                    variant="transparent"
                    label="transparent"
                >
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Projects
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        href="https://togglecorp.com"
                        actions={<IoExitOutline />}
                    >
                        Goto Togglecorp
                    </DropdownMenuItem>
                </DropdownMenu>
                <DropdownMenu
                    variant="general"
                    label="general"
                >
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Projects
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        href="https://togglecorp.com"
                        actions={<IoExitOutline />}
                    >
                        Goto Togglecorp
                    </DropdownMenuItem>
                </DropdownMenu>
            </div>
        </section>
    </div>
);
