import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Alert, { Props as AlertProps } from '#components/Alert';

export default {
    title: 'View/Alert',
    component: Alert,
    argTypes: {},
};

const Template: Story<AlertProps<string>> = (args) => (
    <Alert
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Hello there',
};
