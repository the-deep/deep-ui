import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoAccessibility, IoShuffle } from 'react-icons/io5';

import ButtonLikeLink, { Props as ButtonLikeLinkProps } from '#components/ButtonLikeLink';

import styles from './styles.css';

export default {
    title: 'Action/ButtonLikeLink',
    component: ButtonLikeLink,
    argTypes: {},
};

const Template: Story<ButtonLikeLinkProps> = (args) => (
    <ButtonLikeLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Click me!',
    to: 'https://wikipedia.org',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    children: 'Click me!',
    icons: <IoAccessibility />,
    to: 'https://wikipedia.org',
};

export const WithActions = Template.bind({});
WithActions.args = {
    children: 'Click me!',
    actions: <IoShuffle />,
    to: 'https://wikipedia.org',
};

export const WithIconsAndActions = Template.bind({});
WithIconsAndActions.args = {
    children: 'Click me!',
    icons: <IoAccessibility />,
    actions: <IoShuffle />,
    to: 'https://wikipedia.org',
};
export const Variants = () => (
    <div className={styles.buttonVariants}>
        <section>
            <h3>Normal</h3>
            <div className={styles.content}>
                <ButtonLikeLink to="https://wikipedia.org">
                    Default
                </ButtonLikeLink>
                <ButtonLikeLink variant="primary" to="https://wikipedia.org">
                    Primary
                </ButtonLikeLink>
                <ButtonLikeLink variant="secondary" to="https://wikipedia.org">
                    Secondary
                </ButtonLikeLink>
                <ButtonLikeLink variant="tertiary" to="https://wikipedia.org">
                    Tertiary
                </ButtonLikeLink>
            </div>
        </section>
        <section>
            <h3>Disabled</h3>
            <div className={styles.content}>
                <ButtonLikeLink disabled to="https://wikipedia.org">
                    Default
                </ButtonLikeLink>
                <ButtonLikeLink
                    variant="primary"
                    disabled
                    to="https://wikipedia.org"
                >
                    Primary
                </ButtonLikeLink>
                <ButtonLikeLink
                    variant="secondary"
                    disabled
                    to="https://wikipedia.org"
                >
                    Secondary
                </ButtonLikeLink>
                <ButtonLikeLink
                    variant="tertiary"
                    disabled
                    to="https://wikipedia.org"
                >
                    Tertiary
                </ButtonLikeLink>
            </div>
        </section>
        <section>
            <h3>Big</h3>
            <div className={styles.content}>
                <ButtonLikeLink big to="https://wikipedia.org">
                    Default
                </ButtonLikeLink>
                <ButtonLikeLink
                    variant="primary"
                    big
                    to="https://wikipedia.org"
                >
                    Primary
                </ButtonLikeLink>
                <ButtonLikeLink
                    variant="secondary"
                    big
                    to="https://wikipedia.org"
                >
                    Secondary
                </ButtonLikeLink>
                <ButtonLikeLink
                    variant="tertiary"
                    big
                    to="https://wikipedia.org"
                >
                    Tertiary
                </ButtonLikeLink>
            </div>
        </section>
    </div>
);
