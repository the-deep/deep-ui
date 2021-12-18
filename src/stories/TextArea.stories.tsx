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

export const WithValue = Template.bind({});
WithValue.args = {
    label: 'Name',
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada ut enim nec vehicula. Vestibulum sed laoreet felis. Aenean congue imperdiet felis vitae molestie. Sed tincidunt lacus a lectus volutpat, sit amet efficitur risus posuere. Vestibulum scelerisque commodo varius. Duis vitae orci turpis.',
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
