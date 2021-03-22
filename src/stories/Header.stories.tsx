import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag, IoClose } from 'react-icons/io5';

import Header, { Props as HeaderProps } from '#components/Header';

export default {
    title: 'View/Private/Header',
    component: Header,
    argTypes: {},
};

const Template: Story<HeaderProps> = (args) => (
    <Header
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    heading: 'Heading',
    icons: <IoFlag />,
    actions: <IoClose />,
    description: 'Header Description',
};
