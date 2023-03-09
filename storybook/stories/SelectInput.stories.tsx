import React from 'react';
import { compareString } from '@togglecorp/fujs';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import SelectInput, { Props as SelectInputProps } from '../../src/components/SelectInput';

export default {
    title: 'Input/SelectInput',
    component: SelectInput,
    argTypes: {},
};

interface Option {
    key: string;
    label: string;
    parentKey: string;
    parentLabel: string;
}

const options: Option[] = [
    { key: '1', label: 'Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple ', parentKey: '1', parentLabel: 'Red' },
    { key: '2', label: 'Banana', parentKey: '2', parentLabel: 'Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow ' },
    { key: '3', label: 'Grapes', parentKey: '3', parentLabel: 'Green' },
    { key: '4', label: 'Avocado', parentKey: '3', parentLabel: 'Green' },
    { key: '5', label: 'Pear', parentKey: '3', parentLabel: 'Green' },
];

// eslint-disable-next-line max-len
const Template: Story<SelectInputProps<string, never, string, Option, { containerClassName?: string }>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string) => {
        updateArgs({ value: e });
    };

    return (
        <div style={{ width: '320px' }}>
            <SelectInput
                label="Fruit"
                {...props}
                value={value}
                options={options}
                keySelector={(d) => d.key}
                labelSelector={(d) => d.label}
                onChange={setValue}
                nonClearable
            />
        </div>
    );
};

export const NoValue = Template.bind({});
NoValue.args = {
    value: undefined,
};

export const Default = Template.bind({});
Default.args = {
    value: '1',
    ellipsizeOptions: true,
};

export const NormalSorting = Template.bind({});
NormalSorting.args = {
    value: '1',
    selectedOptionsAtTop: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: '1',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: '1',
    readOnly: true,
};

// eslint-disable-next-line max-len
const GroupedTemplate: Story<SelectInputProps<string, string, string, Option, { containerClassName?: string }>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string) => {
        updateArgs({ value: e });
    };

    return (
        <SelectInput
            label="Fruit"
            {...props}
            value={value}
            options={options}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
            onChange={setValue}
            nonClearable
            grouped
            groupKeySelector={(d) => d.parentKey}
            groupLabelSelector={(d) => d.parentLabel}
            optionLabelSelector={(d) => d.label}
        />
    );
};

export const NoValueGrouped = GroupedTemplate.bind({});
NoValueGrouped.args = {
    value: undefined,
    optionLabelSelector: () => 'Hello',
};

export const DefaultGrouped = GroupedTemplate.bind({});
DefaultGrouped.args = {
    value: '1',
};

export const GroupedAndCompared = GroupedTemplate.bind({});
GroupedAndCompared.args = {
    groupComparator: (a, b) => (compareString(b, a)),
};

export const DisabledGrouped = GroupedTemplate.bind({});
DisabledGrouped.args = {
    value: '1',
    disabled: true,
};

export const ReadOnlyGrouped = GroupedTemplate.bind({});
ReadOnlyGrouped.args = {
    value: '1',
    readOnly: true,
};
