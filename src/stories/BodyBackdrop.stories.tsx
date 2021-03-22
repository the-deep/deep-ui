import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import BodyBackdrop, { Props as BodyBackdropProps } from '#components/BodyBackdrop';

export default {
    title: 'View/BodyBackdrop',
    component: BodyBackdrop,
    argTypes: {},
};

const Template: Story<BodyBackdropProps> = (args) => (
    <BodyBackdrop
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    children: 'backdrop',
};
