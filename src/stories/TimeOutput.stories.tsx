import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import TimeOutput, { Props as TimeOutputProps } from '#components/TimeOutput';

export default {
    title: 'View/TimeOutput',
    component: TimeOutput,
    argTypes: {},
};

const Template: Story<TimeOutputProps> = (args) => (
    <TimeOutput
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    value: '12:30',
};
