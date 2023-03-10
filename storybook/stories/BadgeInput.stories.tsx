import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import BadgeInput, { Props as BadgeInputProps } from '../../src/components/BadgeInput';

export default {
    title: 'Input/BadgeInput',
    component: BadgeInput,
    argTypes: {},
};

const Template: Story<BadgeInputProps<string, string, string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
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
        <BadgeInput
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
    value: 'dogs',
};

export const SelectedValueHidden = Template.bind({});
SelectedValueHidden.args = {
    label: 'Suggestions:',
    selectedValueHidden: true,
    value: 'dogs',
};

export const Nlp = Template.bind({});
Nlp.args = {
    label: 'Suggestions:',
    buttonVariant: 'nlp-tertiary',
    selectedButtonVariant: 'nlp-primary',
    value: 'dogs',
};
