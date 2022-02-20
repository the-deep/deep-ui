import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import Switch, { Props as SwitchProps } from '../../src/components/Switch';

export default {
    title: 'Input/Switch',
    component: Switch,
    argTypes: {},
};

const Template: Story<SwitchProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: boolean | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <Switch
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'This is awesome or what?',
    value: false,
};
