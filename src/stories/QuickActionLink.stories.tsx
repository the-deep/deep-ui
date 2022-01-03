import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag } from 'react-icons/io5';

import QuickActionLink, { Props as QuickActionLinkProps } from '../components/QuickActionLink';

export default {
    title: 'Action/QuickActionLink',
    component: QuickActionLink,
    argTypes: {},
};

const Template: Story<QuickActionLinkProps> = (args) => (
    <QuickActionLink
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    to: 'https://wikipedia.org',
    children: <IoFlag />,
};
