import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DraggableContent from '#components/DraggableContent';
import DropContainer from '#components/DropContainer';

import styles from './styles.css';

export default {
    title: 'View/DragAndDrop',
    argTypes: {},
};

const Template: Story = (props) => {
    const { disabled } = props;

    return (
        <div className={styles.dragAndDrop}>
            <DraggableContent
                className={styles.dragContent}
                name="myText"
                value={{ text: 'ok' }}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nulla sed convallis quam, quis molestie nisi.
                Integer fringilla maximus tellus at aliquam.
                Nunc ac turpis non elit placerat luctus.
                Mauris vehicula, dui vitae feugiat malesuada,
                diam elit porttitor tellus, ut ultricies nibh est at ante.
                Maecenas congue congue nulla quis feugiat.
                Etiam porta volutpat mollis.
            </DraggableContent>
            <DropContainer
                className={styles.dropContainer}
                name="myText"
                onDrop={(value) => console.warn('Dropped', value)}
                disabled={disabled}
            >
                Drop here!
            </DropContainer>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
};

export const DisabledDrop = Template.bind({});
DisabledDrop.args = {
    disabled: true,
};
