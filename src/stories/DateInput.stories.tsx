import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import DateInput, { Props as DateInputProps } from '../components/DateInput';

export default {
    title: 'Input/DateInput',
    component: DateInput,
    argTypes: {},
    decorators: [withDesign],
};

const Template: Story<DateInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <DateInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Birthdate',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Birthdate',
    value: '1992-12-27',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Birthdate',
    value: '1992-12-27',
    readOnly: true,
};
