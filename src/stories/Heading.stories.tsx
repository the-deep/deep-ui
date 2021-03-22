import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Heading, { Props as HeadingProps } from '#components/Heading';

export default {
    title: 'View/Heading',
    component: Heading,
    argTypes: {},
};

const Template: Story<HeadingProps> = (args) => (
    <Heading
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Heading',
};

export const Sizes = () => (
    <>
        <Heading size="large">
            Heading
        </Heading>
        <Heading>
            Heading
        </Heading>
        <Heading size="small">
            Heading
        </Heading>
        <Heading size="extraSmall">
            Heading
        </Heading>
    </>
);
