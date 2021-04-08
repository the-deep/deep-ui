import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import CircularProgressBar, { Props as CircularProgressBarProps } from '#components/CircularProgressBar';

import documentSvg from './resources/document.svg';

export default {
    title: 'View/CircularProgressBar',
    component: CircularProgressBar,
    argTypes: {},
};

const Template: Story<CircularProgressBarProps> = (args) => (
    <CircularProgressBar
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    width: 100,
    arcWidth: 5,
    value: 29,
    imagePadding: 10,
    src: `${documentSvg}#document`,
};
