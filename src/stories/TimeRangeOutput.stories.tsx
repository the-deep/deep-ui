import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import TimeRangeOutput, { Props as TimeRangeOutputProps } from '#components/TimeRangeOutput';

export default {
    title: 'View/TimeRangeOutput',
    component: TimeRangeOutput,
    argTypes: {},
};

const Template: Story<TimeRangeOutputProps> = (args) => (
    <TimeRangeOutput
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    startTime: '02:30',
    endTime: '14:40',
};
