import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import SegmentInput, { Props as SegmentInputProps } from '#components/SegmentInput';

export default {
    title: 'Input/SegmentInput',
    component: SegmentInput,
    argTypes: {},
};

interface Option {
    key: string;
    label: string;
}

const options: Option[] = [
    { key: '1', label: 'Apple' },
    { key: '2', label: 'Banana' },
    { key: '3', label: 'Grapes' },
    { key: '4', label: 'Avocado' },
    { key: '5', label: 'Pear' },
];

// eslint-disable-next-line max-len
const Template: Story<SegmentInputProps<Option['key'], Option>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string | number) => {
        updateArgs({ value: e });
    };

    return (
        <SegmentInput
            label="Fruit"
            {...props}
            value={value}
            options={options}
            radioKeySelector={(d: Option) => d.key}
            radioLabelSelector={(d: Option) => d.label}
            onChange={setValue}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    name: 'test',
    value: '1',
};
