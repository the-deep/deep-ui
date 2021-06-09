import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import TextOutput, { Props as TextOutputProps } from '#components/TextOutput';

export default {
    title: 'View/TextOutput',
    component: TextOutput,
    argTypes: {},
};

const Template: Story<TextOutputProps> = (args) => (
    <TextOutput
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    label: 'Name',
    value: 'Ankit Mehta',
};

export const WithoutLabelColon = Template.bind({});
WithoutLabelColon.args = {
    label: 'Year',
    hideLabelColon: true,
    value: 1920,
};

export const NumericValue = Template.bind({});
NumericValue.args = {
    label: 'Total Budget',
    valueType: 'number',
    valueProps: {
        normal: true,
        prefix: '$',
    },
    value: 45000000,
};

export const DateValue = Template.bind({});
DateValue.args = {
    label: 'Today',
    valueType: 'date',
    value: (new Date()).getTime(),
};
