import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoLogoAndroid, IoLogoApple } from 'react-icons/io5';

import Icons, { Props as IconsProps } from '../../src/components/Icons';

export default {
    title: 'View/Private/Icons',
    component: Icons,
    argTypes: {},
};

const Template: Story<IconsProps> = (args) => (
    <Icons
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    children: (
        <>
            <IoLogoAndroid />
            <IoLogoApple />
        </>
    ),
};
