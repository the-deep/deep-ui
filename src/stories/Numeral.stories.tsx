import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Numeral, { Props as NumeralProps } from '#components/Numeral';

export default {
    title: 'View/Numeral',
    component: Numeral,
    argTypes: {},
};

const Template: Story<NumeralProps> = (args) => (
    <Numeral
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    value: 1920,
};

export const WithoutSeparator = Template.bind({});
WithoutSeparator.args = {
    separator: null,
    value: 1920,
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
    value: 56.4,
    suffix: '%',
};

export const Normalized = Template.bind({});
Normalized.args = {
    value: 299792458,
    normal: true,
};

export const NormalizedWithAutoPrecision = Template.bind({});
NormalizedWithAutoPrecision.args = {
    value: 299792458,
    normal: true,
    precision: 'auto',
};
