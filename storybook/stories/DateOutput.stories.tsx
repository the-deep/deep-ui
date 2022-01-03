import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DateOutput, { Props as DateOutputProps } from '../../src/components/DateOutput';

export default {
    title: 'View/DateOutput',
    component: DateOutput,
    argTypes: {},
};

const Template: Story<DateOutputProps> = (args) => (
    <DateOutput
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    value: '1992-12-20',
};

export const DateWithTime = Template.bind({});
DateWithTime.args = {
    value: '1992-12-20 14:40',
    format: 'yyyy-MM-dd hh:mm aaa',
};

export const NoValue = Template.bind({});
NoValue.args = {
    value: undefined,
};
