import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import DateRangeInput, { Props as DateRangeInputProps } from '#components/DateRangeInput';

export default {
    title: 'Input/DateRangeInput',
    component: DateRangeInput,
    argTypes: {},
};

const Template: Story<DateRangeInputProps> = (args) => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <DateRangeInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: '',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: 'This is raw input',
    readOnly: true,
};
