import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DraggableContent from '#components/DraggableContent';
import DropContainer from '#components/DropContainer';

import styles from './styles.css';

export default {
    title: 'View/DragAndDrop',
    argTypes: {},
};

const Template: Story = () => (
    <div className={styles.dragAndDrop}>
        <DraggableContent className={styles.dragContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nulla sed convallis quam, quis molestie nisi.
            Integer fringilla maximus tellus at aliquam.
            Nunc ac turpis non elit placerat luctus.
            Mauris vehicula, dui vitae feugiat malesuada,
            diam elit porttitor tellus, ut ultricies nibh est at ante.
            Maecenas congue congue nulla quis feugiat.
            Etiam porta volutpat mollis.
        </DraggableContent>
        <DropContainer className={styles.dropContainer}>
            Drop container
        </DropContainer>
    </div>
);

export const Default = Template.bind({});
Default.args = {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed convallis quam, quis molestie nisi. Integer fringilla maximus tellus at aliquam. Nunc ac turpis non elit placerat luctus. Mauris vehicula, dui vitae feugiat malesuada, diam elit porttitor tellus, ut ultricies nibh est at ante. Maecenas congue congue nulla quis feugiat. Etiam porta volutpat mollis.',
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=5569%3A33',
    },
};
