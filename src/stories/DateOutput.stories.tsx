import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DateOutput, { Props as DateOutputProps } from '#components/DateOutput';

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

export const NoValue = Template.bind({});
NoValue.args = {
    value: undefined,
};
