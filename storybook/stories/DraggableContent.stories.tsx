import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { Story } from '@storybook/react/types-6-0';
import {
    IoCloseCircle,
    IoCheckmarkCircle,
} from 'react-icons/io5';

import DraggableContent, { Props as DraggableContentProps } from '../../src/components/DraggableContent';
import Button from '../../src/components/Button';

export default {
    title: 'View/DraggableContent',
    component: DraggableContent,
    argTypes: {},
    decorators: [withDesign],
};

const Template: Story<DraggableContentProps> = (args) => (
    <div style={{ width: '300px' }}>
        <DraggableContent
            {...args}
        />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    name: 'myText',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed convallis quam, quis molestie nisi. Integer fringilla maximus tellus at aliquam. Nunc ac turpis non elit placerat luctus. Mauris vehicula, dui vitae feugiat malesuada, diam elit porttitor tellus, ut ultricies nibh est at ante. Maecenas congue congue nulla quis feugiat. Etiam porta volutpat mollis.',
    footerQuickActions: (
        <>
            <IoCloseCircle style={{ color: 'tomato' }} />
            <IoCheckmarkCircle style={{ color: 'teal' }} />
        </>
    ),
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=5569%3A33',
    },
};

export const DragByContainer = Template.bind({});
DragByContainer.args = {
    name: 'myText',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed convallis quam, quis molestie nisi. Integer fringilla maximus tellus at aliquam. Nunc ac turpis non elit placerat luctus. Mauris vehicula, dui vitae feugiat malesuada, diam elit porttitor tellus, ut ultricies nibh est at ante. Maecenas congue congue nulla quis feugiat. Etiam porta volutpat mollis.',
    footerQuickActions: (
        <>
            <IoCloseCircle style={{ color: 'tomato' }} />
            <IoCheckmarkCircle style={{ color: 'teal' }} />
            <Button
                name={undefined}
                onClick={() => console.log('I am clicked')}
                variant="nlp-general"
            >
                Click Me
            </Button>
        </>
    ),
    dragByContainer: true,
};
