import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoAccessibility, IoShuffle } from 'react-icons/io5';

import Link, { Props as LinkProps } from '#components/Link';

export default {
    title: 'Action/Link',
    component: Link,
    argTypes: {},
};

const Template: Story<LinkProps> = (args) => (
    <Link {...args} />
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
