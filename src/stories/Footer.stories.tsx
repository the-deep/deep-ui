import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoChatboxOutline } from 'react-icons/io5';

import Footer, { Props as FooterProps } from '#components/Footer';

export default {
    title: 'View/Private/Footer',
    component: Footer,
    argTypes: {},
};

const Template: Story<FooterProps> = (args) => (
    <Footer
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    actions: <IoChatboxOutline />,
    children: 'Footer',
};
