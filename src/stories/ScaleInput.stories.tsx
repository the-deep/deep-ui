import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import ScaleInput, { Props as ScaleInputProps } from '../components/ScaleInput';

export default {
    title: 'Input/ScaleInput',
    component: ScaleInput,
    argTypes: {},
};

interface Option {
    key: string;
    color: string;
    label: string;
}

const options: Option[] = [
    {
        key: '1',
        color: '#b3effb',
        label: 'Absolutely Not Severe',
    },
    {
        key: '2',
        color: '#80e4f7',
        label: 'Not Severe',
    },
    {
        key: '3',
        color: '#00c9f0',
        label: 'Severe',
    },
    {
        key: '4',
        color: '#00b1d3',
        label: 'Highly Severe',
    },
    {
        key: '5',
        color: '#009ebd',
        label: 'Extreme Highly Severe',
    },
];

// eslint-disable-next-line max-len
const Template: Story<ScaleInputProps<Option['key'], Option, Option['label']>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string) => {
        updateArgs({ value: e });
    };

    return (
        <ScaleInput
            label="Severity"
            {...props}
            value={value}
            options={options}
            keySelector={(d: Option) => d.key}
            labelSelector={(d: Option) => d.label}
            colorSelector={(d: Option) => d.color}
            onChange={setValue}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    name: 'test',
    value: '1',
};

export const Disabled = Template.bind({});
Disabled.args = {
    name: 'test',
    value: '1',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    name: 'test',
    value: '1',
    readOnly: true,
};

export const Error = Template.bind({});
Error.args = {
    name: 'test',
    value: '1',
    error: 'This is wrong',
};
