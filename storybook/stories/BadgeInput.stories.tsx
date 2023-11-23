import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoBugOutline } from 'react-icons/io5';
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
            title: 'Meow!',
            icon: undefined,
        },
        {
            key: 'dogs',
            label: 'Dogs',
            title: 'Bhow Bhow!',
            icon: undefined,
        },
        {
            key: 'monkeys',
            label: 'Monkeys',
            icon: (<IoBugOutline />),
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
            titleSelector={(s) => s.title}
            iconSelector={(s) => s.icon}
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
