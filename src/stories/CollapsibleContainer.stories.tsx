import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import CollapsibleContainer, { Props as CollapsibleContainerProps } from '#components/CollapsibleContainer';

export default {
    title: 'View/CollapsibleContainer',
    component: CollapsibleContainer,
    argTypes: {},
};

const Template: Story<CollapsibleContainerProps> = (args) => (
    <CollapsibleContainer
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    heading: 'Collapsible container',
    children: 'This container is collapsible',
};
