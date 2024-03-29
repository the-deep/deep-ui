import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Calendar, { Props as CalendarProps } from '../../src/components/Calendar';
import { Props as CalendarDateProps } from '../../src/components/Calendar/CalendarDate';

export default {
    title: 'View/Private/Calendar',
    component: Calendar,
    argTypes: {},
};

const Template: Story<CalendarProps<CalendarDateProps>> = (args) => (
    <Calendar {...args} />
);

export const Default = Template.bind({});
Default.args = {
    initialDate: '2020-10-12',
};
