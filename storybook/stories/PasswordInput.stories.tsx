import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';
import { IoText } from 'react-icons/io5';

import PasswordInput, { Props as PasswordInputProps } from '../../src/components/PasswordInput';

export default {
    title: 'Input/PasswordInput',
    component: PasswordInput,
    argTypes: {},
    decorators: [withDesign],
};

const Template: Story<PasswordInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <PasswordInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Password',
};

Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=4791%3A345',
    },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    icons: <IoText />,
    label: 'Password',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Password',
    value: 'password',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Password',
    value: 'password',
    readOnly: true,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    label: 'Password',
    placeholder: 'Enter your password',
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'Password',
    error: 'This field is required',
};
