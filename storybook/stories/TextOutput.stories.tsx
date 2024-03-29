import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import TextOutput, { Props as TextOutputProps } from '../../src/components/TextOutput';

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
    value: 'John Doe',
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
    value: 1624888295037,
};

export const Nested = Template.bind({});
Nested.args = {
    block: true,
    label: 'Recently Active',
    value: (
        <>
            <TextOutput
                value="Max Planck"
                description="April 24, 1947"
            />
            <TextOutput
                value="Albert Einstien"
                description="April 18, 1955"
            />
            <TextOutput
                value="Erwin Schrodinger"
                description="January 4, 1961"
            />
        </>
    ),
};
