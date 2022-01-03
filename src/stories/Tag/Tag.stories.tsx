import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoFlag, IoClose } from 'react-icons/io5';

import PendingAnimation from '#components/PendingAnimation';
import Tag, { Props as TagProps } from '#components/Tag';

import styles from './styles.css';

export default {
    title: 'Action/Tag',
    component: Tag,
    argTypes: {},
};

const Template: Story<TagProps> = (args) => (
    <Tag {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Tag',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    icons: <IoFlag />,
    children: 'Tag',
};

export const WithActions = Template.bind({});
WithActions.args = {
    actions: <IoClose />,
    children: 'Tag',
};

export const WithIconsAndActions = Template.bind({});
WithIconsAndActions.args = {
    icons: <IoFlag />,
    actions: <IoClose />,
    children: 'Tag',
};

export function Variants() {
    return (
        <div className={styles.tagVariants}>
            <section>
                <h3>Normal</h3>
                <div className={styles.content}>
                    <Tag>
                        Default
                    </Tag>
                    <Tag variant="accent">
                        Accent
                    </Tag>
                    <Tag variant="complement1">
                        Complement #1
                    </Tag>
                    <Tag
                        variant="complement2"
                        actions={<PendingAnimation inheritColor />}
                    >
                        Complement #2
                    </Tag>
                </div>
            </section>
            <section>
                <h3>Gradients</h3>
                <div className={styles.content}>
                    <Tag variant="gradient1">
                        Gradient 1
                    </Tag>
                    <Tag variant="gradient2">
                        Gradient 2
                    </Tag>
                    <Tag variant="gradient3">
                        Gradient 3
                    </Tag>
                    <Tag variant="gradient4">
                        Gradient 4
                    </Tag>
                </div>
            </section>
        </div>
    );
}
