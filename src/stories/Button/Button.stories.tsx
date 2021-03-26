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
                <Button>
                    Default
                </Button>
                <Button variant="primary">
                    Primary
                </Button>
                <Button variant="secondary">
                    Secondary
                </Button>
                <Button variant="tertiary">
                    Tertiary
                </Button>
                <Button variant="inverted">
                    Inverted
                </Button>
                <Button variant="action">
                    Action
                </Button>
            </div>
        </section>
        <section>
            <h3>Disabled</h3>
            <div className={styles.content}>
                <Button disabled>
                    Default
                </Button>
                <Button
                    variant="primary"
                    disabled

                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    disabled
                >
                    Secondary
                </Button>
                <Button
                    variant="tertiary"
                    disabled
                >
                    Tertiary
                </Button>
                <Button
                    variant="inverted"
                    disabled
                >
                    Inverted
                </Button>
                <Button
                    variant="action"
                    disabled
                >
                    Action
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
                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    big
                >
                    Secondary
                </Button>
                <Button
                    variant="tertiary"
                    big
                >
                    Tertiary
                </Button>
                <Button
                    variant="inverted"
                    big
                >
                    Inverted
                </Button>
                <Button
                    variant="action"
                    big
                >
                    Action
                </Button>
            </div>
        </section>
    </div>
);
