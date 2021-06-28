import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DateRangeOutput, { Props as DateRangeOutputProps } from '#components/DateRangeOutput';

export default {
    title: 'View/DateRangeOutput',
    component: DateRangeOutput,
    argTypes: {},
};

const Template: Story<DateRangeOutputProps> = (args) => (
    <DateRangeOutput
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    startDate: '1992-12-27',
    endDate: '2012-10-12',
};
