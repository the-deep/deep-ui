import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoExitOutline } from 'react-icons/io5';

import DropdownMenu, { Props as DropdownMenuProps } from '../../src/components/DropdownMenu';
import DropdownMenuItem, { Separator } from '../../src/components/DropdownMenuItem';
import styles from './styles.css';

export default {
    title: 'View/DropdownMenu',
    component: DropdownMenu,
    argTypes: {},
};

const handleMenuItemClick = () => {
    console.info('Dropdown menu clicked');
};

const Template: Story<DropdownMenuProps> = (props) => (
    <DropdownMenu
        {...props}
    >
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

export const Persistent = Template.bind({});
Persistent.args = {
    label: 'Persistent',
    persistent: true,
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
                </DropdownMenu>

                <DropdownMenu
                    variant="action"
                    label="action"
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
                </DropdownMenu>

                <DropdownMenu
                    variant="secondary"
                    label="secondary"
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
                </DropdownMenu>

                <DropdownMenu
                    variant="tertiary"
                    label="tertiary"
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
                </DropdownMenu>

                <DropdownMenu
                    variant="transparent"
                    label="transparent"
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
                </DropdownMenu>
                <DropdownMenu
                    variant="general"
                    label="general"
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
                </DropdownMenu>
            </div>
        </section>
    </div>
);
