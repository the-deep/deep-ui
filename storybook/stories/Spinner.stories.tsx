import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Spinner, { Props as SpinnerProps } from '../../src/components/Spinner';

export default {
    title: 'View/Private/Spinner',
    component: Spinner,
    argTypes: {},
};

const Template: Story<SpinnerProps> = (args) => (
    <Spinner {...args} />
);

export const Default = Template.bind({});
Default.args = {};
