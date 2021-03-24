import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag, IoClose } from 'react-icons/io5';

import InputContainer, { Props as InputContainerProps } from '#components/InputContainer';

export default {
    title: 'Input/Private/InputContainer',
    component: InputContainer,
    argTypes: {},
};

const Template: Story<InputContainerProps> = (args) => (
    <InputContainer
        {...args}
    />
);

export const Default = Template.bind({});
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=4791%3A345',
    },
};
Default.args = {
    icons: <IoFlag />,
    actions: <IoClose />,
    input: <div>input</div>,
    label: 'Input',
    error: 'Some error occurred',
};
