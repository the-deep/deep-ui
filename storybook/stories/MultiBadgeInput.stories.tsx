import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import MultiBadgeInput, { Props as MultiBadgeInputProps } from '../../src/components/MultiBadgeInput';

interface Option {
    key: string;
    label: string;
}

export default {
    title: 'Input/MultiBadgeInput',
    component: MultiBadgeInput,
    argTypes: {},
};

const Template: Story<MultiBadgeInputProps<string, string, string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string[] | undefined) => {
        updateArgs({ value: e });
    };

    const suggestionOptions = [
        {
            key: 'cats',
            label: 'Cats',
        },
        {
            key: 'dogs',
            label: 'Dogs',
        },
        {
            key: 'monkeys',
            label: 'Monkeys',
        },
    ];

    return (
        <MultiBadgeInput
            value={value}
            name={undefined}
            {...args}
            options={suggestionOptions}
            keySelector={(s) => s.key}
            labelSelector={(s) => s.label}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});

Default.args = {
    label: 'Suggestions:',
    selectedValueHidden: true,
};

export const SelectedValueShown = Template.bind({});
SelectedValueShown.args = {
    label: 'Suggestions:',
    selectedValueHidden: false,
};

export const Nlp = Template.bind({});
Nlp.args = {
    label: 'Suggestions:',
    buttonVariant: 'nlp-tertiary',
    selectedButtonVariant: 'nlp-primary',
    selectedValueHidden: false,
};
