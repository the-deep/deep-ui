import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag, IoClose } from 'react-icons/io5';

import ElementFragments, { Props as ElementFragmentsProps } from '#components/ElementFragments';

export default {
    title: 'View/Private/ElementFragments',
    component: ElementFragments,
    argTypes: {},
};

const Template: Story<ElementFragmentsProps> = (args) => (
    <ElementFragments
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    icons: <IoFlag />,
    actions: <IoClose />,
    children: 'Fragment',
};
