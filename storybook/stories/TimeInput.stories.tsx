import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { IoTimer } from 'react-icons/io5';

import TimeInput, { Props as TimeInputProps } from '../../src/components/TimeInput';

export default {
    title: 'Input/TimeInput',
    component: TimeInput,
    argTypes: {},
};

const Template: Story<TimeInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <TimeInput
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
    icons: <IoTimer />,
    label: 'Name',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Name',
    value: '14:20',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Name',
    value: '10:22',
    readOnly: true,
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'Name',
    error: 'This field is required',
};
