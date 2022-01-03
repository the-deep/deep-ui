import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Card, { Props as CardProps } from '../components/Card';

export default {
    title: 'View/Card',
    component: Card,
    argTypes: {},
};

const Template: Story<CardProps> = (args) => (
    <Card
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed convallis quam, quis molestie nisi. Integer fringilla maximus tellus at aliquam. Nunc ac turpis non elit placerat luctus. Mauris vehicula, dui vitae feugiat malesuada, diam elit porttitor tellus, ut ultricies nibh est at ante. Maecenas congue congue nulla quis feugiat. Etiam porta volutpat mollis. Morbi libero eros, malesuada nec metus ac, varius cursus purus. Proin metus tellus, fermentum vel tellus et, tristique mattis urna. Nunc sapien sapien, malesuada posuere nulla in, imperdiet placerat orci. Phasellus dapibus magna sit amet neque sollicitudin laoreet.',
};
