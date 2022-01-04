import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag, IoClose } from 'react-icons/io5';

import Element, { Props as ElementProps } from '../../src/components/Element';

export default {
    title: 'View/Element',
    component: Element,
    argTypes: {},
};

const Template: Story<ElementProps> = (args) => (
    <Element
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    icons: <IoFlag />,
    actions: (
        <>
            <IoClose />
            <IoFlag />
        </>
    ),
    children: 'Fragment',
};
