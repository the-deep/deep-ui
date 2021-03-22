import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import Actions, { Props as ActionsProps } from '#components/Actions';

export default {
    title: 'View/Private/Actions',
    component: Actions,
    argTypes: {},
};

const Template: Story<ActionsProps> = (args) => (
    <Actions
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    children: (
        <>
            <IoChevronBack />
            <IoChevronForward />
        </>
    ),
};
