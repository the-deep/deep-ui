import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag } from 'react-icons/io5';

import InformationCard, { Props as InformationCardProps } from '#components/InformationCard';

export default {
    title: 'View/InformationCard',
    component: InformationCard,
    argTypes: {},
};

const Template: Story<InformationCardProps> = (args) => (
    <InformationCard
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    icon: <IoFlag />,
    value: 120,
};

export const WithColoredBackground = Template.bind({});
WithColoredBackground.args = {
    icon: <IoFlag />,
    value: 320,
    coloredBackground: true,
};
