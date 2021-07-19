import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { IoText } from 'react-icons/io5';

import TimeRangeInput, {
    Props as TimeRangeInputProps,
    Value,
} from '#components/TimeRangeInput';

export default {
    title: 'Input/TimeRangeInput',
    component: TimeRangeInput,
    argTypes: {},
};

const Template: Story<TimeRangeInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: Value | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <TimeRangeInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Name',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    icons: <IoText />,
    label: 'Name',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Name',
    value: {
        startTime: '10:10',
        endTime: '20:20',
    },
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Name',
    value: {
        startTime: '10:10',
        endTime: '20:20',
    },
    readOnly: true,
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'Name',
    error: 'This field is required',
};
