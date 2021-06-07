import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { IoCalculatorOutline } from 'react-icons/io5';

import NumberInput, { Props as NumberInputProps } from '#components/NumberInput';

export default {
    title: 'Input/NumberInput',
    component: NumberInput,
    argTypes: {},
};

const Template: Story<NumberInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: number | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <NumberInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Age',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    icons: <IoCalculatorOutline />,
    label: 'Number',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Figures',
    value: 1123,
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Quantity',
    value: 11,
    readOnly: true,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    label: 'Age',
    placeholder: 'Enter your age',
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'Age',
    error: 'This field is required',
};
