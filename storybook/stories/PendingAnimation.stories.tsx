import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import PendingAnimation, { Props as PendingAnimationProps } from '../../src/components/PendingAnimation';

export default {
    title: 'View/Private/PendingAnimation',
    component: PendingAnimation,
    argTypes: {},
};

const Template: Story<PendingAnimationProps> = (args) => (
    <PendingAnimation {...args} />
);

export const Default = Template.bind({});
Default.args = {
};
