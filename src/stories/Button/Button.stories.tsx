import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoAccessibility, IoShuffle } from 'react-icons/io5';

import Button, { Props as ButtonProps } from '#components/Button';

import styles from './styles.css';

export default {
    title: 'Action/Button',
    component: Button,
    argTypes: {},
};

const Template: Story<ButtonProps<string>> = (args) => (
    <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Click me!',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    children: 'Click me!',
    icons: <IoAccessibility />,
};

export const WithActions = Template.bind({});
WithActions.args = {
    children: 'Click me!',
    actions: <IoShuffle />,
};

export const WithIconsAndActions = Template.bind({});
WithIconsAndActions.args = {
    children: 'Click me!',
    icons: <IoAccessibility />,
    actions: <IoShuffle />,
};

export const Variants = () => (
    <div className={styles.buttonVariants}>
        <section>
            <h3>Normal</h3>
            <div className={styles.content}>
                <Button name={undefined}>
                    Default
                </Button>
                <Button variant="primary" name={undefined}>
                    Primary
                </Button>
                <Button variant="secondary" name={undefined}>
                    Secondary
                </Button>
                <Button variant="tertiary" name={undefined}>
                    Tertiary
                </Button>
                <Button variant="inverted" name={undefined}>
                    Inverted
                </Button>
            </div>
        </section>
        <section>
            <h3>Disabled</h3>
            <div className={styles.content}>
                <Button disabled name={undefined}>
                    Default
                </Button>
                <Button
                    variant="primary"
                    disabled
                    name={undefined}
                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    disabled
                    name={undefined}
                >
                    Secondary
                </Button>
                <Button
                    variant="tertiary"
                    disabled
                    name={undefined}
                >
                    Tertiary
                </Button>
                <Button
                    variant="inverted"
                    disabled
                    name={undefined}
                >
                    Inverted
                </Button>
            </div>
        </section>
        <section>
            <h3>Big</h3>
            <div className={styles.content}>
                <Button big name={undefined}>
                    Default
                </Button>
                <Button
                    variant="primary"
                    big
                    name={undefined}
                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    big
                    name={undefined}
                >
                    Secondary
                </Button>
                <Button
                    variant="tertiary"
                    big
                    name={undefined}
                >
                    Tertiary
                </Button>
                <Button
                    variant="inverted"
                    big
                    name={undefined}
                >
                    Inverted
                </Button>
            </div>
        </section>
    </div>
);
