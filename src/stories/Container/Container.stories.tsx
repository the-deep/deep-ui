import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import {
    IoFlag,
    IoChatboxOutline,
    IoArrowBack,
    IoPencil,
    IoCopy,
    IoTrash,
    IoCheckmark,
} from 'react-icons/io5';

import Button from '#components/Button';
import Tab from '#components/Tab';
import Tabs from '#components/Tabs';
import TabList from '#components/TabList';
import QuickActionButton from '#components/QuickActionButton';
import Container, { Props as ContainerProps } from '#components/Container';

import styles from './styles.css';

export default {
    title: 'View/Container',
    component: Container,
    argTypes: {},
};

const Template: Story<ContainerProps> = (args) => (
    <Container
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    className: styles.container,
    heading: 'IFRC Master Framework 2020',
    headingSize: 'small',
    headingContainerClassName: styles.headingContainerClassName,
    headingDescription: 'Created on: Feb2, 2021',
    headerClassName: styles.header,
    headerActionsContainerClassName: styles.headerActions,
    borderBelowHeader: true,
    borderBelowHeaderWidth: 'thin',
    headerActions: (
        <Tabs
            value="primary"
            onChange={() => { console.info('noop'); }}
        >
            <TabList className={styles.tabList}>
                <Tab
                    className={styles.tab}
                    name="primary"
                    transparentBorder
                >
                    Primary tagging
                </Tab>
                <Tab
                    className={styles.tab}
                    name="secondary"
                    transparentBorder
                >
                    Secondary tagging
                </Tab>
            </TabList>
            <div className={styles.actions}>
                <Button
                    name={undefined}
                    variant="secondary"
                    icons={<IoCheckmark />}
                >
                    Select Framework
                </Button>
                <QuickActionButton name={undefined}>
                    <IoPencil />
                </QuickActionButton>
                <QuickActionButton name={undefined}>
                    <IoCopy />
                </QuickActionButton>
                <QuickActionButton name={undefined}>
                    <IoTrash />
                </QuickActionButton>
            </div>
        </Tabs>
    ),
    contentClassName: styles.content,
    children: (
        'Nothing to see here'
    ),
};

const NestedTemplate: Story<ContainerProps> = (args) => (
    <Container
        {...args}
    >
        <Container
            {...args}
            headingSize="small"
        >
            <Container
                {...args}
                headingSize="extraSmall"
            />
        </Container>
        <Container
            {...args}
        />
        <Container
            {...args}
        />
        <Container
            {...args}
            // autoFocus
        />
    </Container>
);

export const Nested = NestedTemplate.bind({});
Nested.args = {
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed convallis quam, quis molestie nisi. Integer fringilla maximus tellus at aliquam. Nunc ac turpis non elit placerat luctus. Mauris vehicula, dui vitae feugiat malesuada, diam elit porttitor tellus, ut ultricies nibh est at ante. Maecenas congue congue nulla quis feugiat. Etiam porta volutpat mollis. Morbi libero eros, malesuada nec metus ac, varius cursus purus. Proin metus tellus, fermentum vel tellus et, tristique mattis urna. Nunc sapien sapien, malesuada posuere nulla in, imperdiet placerat orci. Phasellus dapibus magna sit amet neque sollicitudin laoreet.',
    ellipsizeHeading: true,
    headerIcons: (
        <Button
            name={undefined}
            variant="action"
            big
        >
            <IoArrowBack />
        </Button>
    ),
    headerActions: (
        <>
            <QuickActionButton name={undefined}>
                <IoFlag />
            </QuickActionButton>
            <QuickActionButton name={undefined}>
                <IoChatboxOutline />
            </QuickActionButton>
        </>
    ),
    headerDescription: 'Header Description',
    footerContent: 'Footer',
    footerQuickActions: (
        <>
            <QuickActionButton name={undefined}>
                <IoChatboxOutline />
            </QuickActionButton>
            <QuickActionButton name={undefined}>
                <IoFlag />
            </QuickActionButton>
            <QuickActionButton name={undefined}>
                <IoChatboxOutline />
            </QuickActionButton>
        </>
    ),
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed convallis quam, quis molestie nisi. Integer fringilla maximus tellus at aliquam. Nunc ac turpis non elit placerat luctus. Mauris vehicula, dui vitae feugiat malesuada, diam elit porttitor tellus, ut ultricies nibh est at ante. Maecenas congue congue nulla quis feugiat. Etiam porta volutpat mollis. Morbi libero eros, malesuada nec metus ac, varius cursus purus. Proin metus tellus, fermentum vel tellus et, tristique mattis urna. Nunc sapien sapien, malesuada posuere nulla in, imperdiet placerat orci. Phasellus dapibus magna sit amet neque sollicitudin laoreet.',
    headingDescription: 'Heading Description',
};
