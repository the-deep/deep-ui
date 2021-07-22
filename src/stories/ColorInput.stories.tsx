import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import ColorInput, { Props as ColorInputProps } from '#components/ColorInput';

export default {
    title: 'Input/ColorInput',
    component: ColorInput,
    argTypes: {},
};

const Template: Story<ColorInputProps> = (args) => (
    <ColorInput
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
};
