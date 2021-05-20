import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Card from '#components/Card';
import ExpandableContainer, { Props as ExpandableContainerProps } from '#components/ExpandableContainer';

export default {
    title: 'View/ExpandableContainer',
    component: ExpandableContainer,
    argTypes: {},
};

const Template: Story<ExpandableContainerProps> = (args) => (
    <ExpandableContainer
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    heading: 'Step 1',
    description: 'Select',
    children: (<Card> I am a card</Card>),
};

export const VisibleByDefault = Template.bind({});
VisibleByDefault.args = {
    heading: 'Extended Matrixes',
    defaultVisibility: true,
    children: (<Card>I should be visible by default</Card>),
};