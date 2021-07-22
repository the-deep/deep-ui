import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import ColorInput, { Props as ColorInputProps } from '#components/ColorInput';

export default {
    title: 'Input/ColorInput',
    component: ColorInput,
    argTypes: {},
};

const Template: Story<ColorInputProps<undefined>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <ColorInput
            {...args}
            name={undefined}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
};
