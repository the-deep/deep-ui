import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { IoText } from 'react-icons/io5';

import TextArea, { Props as TextAreaProps } from '#components/TextArea';

export default {
    title: 'Input/TextArea',
    component: TextArea,
    argTypes: {},
};

const Template: Story<TextAreaProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <TextArea
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
    icons: <IoText />,
    label: 'Name',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Name',
    value: 'This is text area',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Name',
    value: 'This is text area',
    readOnly: true,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    label: 'Name',
    placeholder: 'Name',
};
