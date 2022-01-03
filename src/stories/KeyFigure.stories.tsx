import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import KeyFigure, { Props as KeyFigureProps } from '../components/KeyFigure';

export default {
    title: 'View/KeyFigure',
    component: KeyFigure,
    argTypes: {},
};

const Template: Story<KeyFigureProps> = (args) => (
    <KeyFigure
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    value: 120,
    label: 'Sources',
};
