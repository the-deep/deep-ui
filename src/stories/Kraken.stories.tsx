import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Kraken, { Props as KrakenProps } from '../components/Kraken';

export default {
    title: 'View/Kraken',
    component: Kraken,
    argTypes: {},
};

const Template: Story<KrakenProps> = (args) => (
    <Kraken {...args} />
);

export const Default = Template.bind({});
Default.args = {
    variant: 'hi',
};
