import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DropContainer, { Props as DropContainerProps } from '../../src/components/DropContainer';

export default {
    title: 'View/DropContainer',
    component: DropContainer,
    argTypes: {},
};

const Template: Story<DropContainerProps> = (args) => (
    <div style={{ width: '300px' }}>
        <DropContainer
            {...args}
        />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    name: 'myText',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed convallis quam, quis molestie nisi. Integer fringilla maximus tellus at aliquam. Nunc ac turpis non elit placerat luctus. Mauris vehicula, dui vitae feugiat malesuada, diam elit porttitor tellus, ut ultricies nibh est at ante. Maecenas congue congue nulla quis feugiat. Etiam porta volutpat mollis.',
};
