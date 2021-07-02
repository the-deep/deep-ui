import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import ExpandableContainer, {
    Props as ExpandableContainerProps,
} from '#components/ExpandableContainer';

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
    headingDescription: 'Select',
    children: 'I am a card',
};

export const VisibleByDefault = Template.bind({});
VisibleByDefault.args = {
    heading: 'Extended Matrixes',
    defaultVisibility: true,
    children: 'I should be visible by default',
};

export const ExpandOnArrowClick = Template.bind({});
ExpandOnArrowClick.args = {
    heading: 'Extended Matrixes',
    expansionTriggerArea: 'arrow',
    children: 'I should expand on arrow click and not the whole header.',
};
