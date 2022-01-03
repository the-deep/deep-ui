import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag } from 'react-icons/io5';

import PercentageInformationCard, { Props as PercentageInformationCardProps } from '../components/PercentageInformationCard';

export default {
    title: 'View/PercentageInformationCard',
    component: PercentageInformationCard,
    argTypes: {},
};

const Template: Story<PercentageInformationCardProps> = (args) => (
    <PercentageInformationCard
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    icon: <IoFlag />,
    value: 33.5,
    label: 'Entries tagged',
};

export const WithColoredBackground = Template.bind({});
WithColoredBackground.args = {
    icon: <IoFlag />,
    value: 57.8,
    coloredBackground: true,
    label: 'Entries tagged',
};
