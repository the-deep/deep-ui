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

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Click me!',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    children: 'Click me!',
    readOnly: true,
};

export const Variants = () => (
    <div className={styles.buttonVariants}>
        <section>
            <h3>Normal</h3>
            <div className={styles.content}>
                <Button
                    name="default"
                >
                    Default
                </Button>
                <Button
                    variant="primary"
                    name="primary"
                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    name="secondary"
                >
                    Secondary
                </Button>
                <Button
                    variant="tertiary"
                    name="tertiary"
                >
                    Tertiary
                </Button>
                <Button
                    variant="inverted"
                    name="inverted"
                >
                    Inverted
                </Button>
                <Button
                    variant="action"
                    name="action"
                >
                    Action
                </Button>
            </div>
        </section>
        <section>
            <h3>Disabled</h3>
            <div className={styles.content}>
                <Button
                    disabled
                    name="disabled-button"
                >
                    Default
                </Button>
                <Button
                    variant="primary"
                    name="disabled-primary-button"
                    disabled

                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    name="disabled-secondary-button"
                    disabled
                >
                    Secondary
                </Button>
                <Button
                    variant="tertiary"
                    name="disabled-tertiary-button"
                    disabled
                >
                    Tertiary
                </Button>
                <Button
                    variant="inverted"
                    name="disabled-inverted-button"
                    disabled
                >
                    Inverted
                </Button>
                <Button
                    variant="action"
                    name="disabled-action-button"
                    disabled
                >
                    Action
                </Button>
            </div>
        </section>
        <section>
            <h3>Read Only</h3>
            <div className={styles.content}>
                <Button
                    readOnly
                    name="readOnly-button"
                >
                    Default
                </Button>
                <Button
                    variant="primary"
                    name="readOnly-primary-button"
                    readOnly

                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    name="readOnly-secondary-button"
                    readOnly
                >
                    Secondary
                </Button>
                <Button
                    variant="tertiary"
                    name="readOnly-tertiary-button"
                    readOnly
                >
                    Tertiary
                </Button>
                <Button
                    variant="inverted"
                    name="readOnly-inverted-button"
                    readOnly
                >
                    Inverted
                </Button>
                <Button
                    variant="action"
                    name="readOnly-action-button"
                    readOnly
                >
                    Action
                </Button>
            </div>
        </section>
        <section>
            <h3>Big</h3>
            <div className={styles.content}>
                <Button
                    big
                    name="big-button"
                >
                    Default
                </Button>
                <Button
                    variant="primary"
                    name="big-primary-button"
                    big
                >
                    Primary
                </Button>
                <Button
                    variant="secondary"
                    name="big-secondary-button"
                    big
                >
                    Secondary
                </Button>
                <Button
                    variant="tertiary"
                    name="big-tertiary-button"
                    big
                >
                    Tertiary
                </Button>
                <Button
                    variant="inverted"
                    name="big-inverted-button"
                    big
                >
                    Inverted
                </Button>
                <Button
                    variant="action"
                    name="big-action-button"
                    big
                >
                    Action
                </Button>
            </div>
        </section>
    </div>
);
