import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import DateRangeInput, { Props as DateRangeInputProps } from '#components/DateRangeInput';

export default {
    title: 'Input/DateRangeInput',
    component: DateRangeInput,
    argTypes: {},
};

const Template: Story<DateRangeInputProps<any>> = (args) => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (e: any) => {
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
    value: undefined,
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: undefined,
    readOnly: true,
};
