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

export function Sizes() {
    return (
        <>
            <Heading size="extraLarge">
                Extra large heading
            </Heading>
            <Heading size="large">
                Large heading
            </Heading>
            <Heading size="medium">
                Medium heading
            </Heading>
            <Heading size="small">
                Small heading
            </Heading>
            <Heading size="extraSmall">
                Extra small heading
            </Heading>
        </>
    );
}
