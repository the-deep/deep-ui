import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import {
    IoFlag,
    IoChatboxOutline,
    IoArrowBack,
} from 'react-icons/io5';

import Button from '#components/Button';
import QuickActionButton from '#components/QuickActionButton';
import Container, { Props as ContainerProps } from '#components/Container';

export default {
    title: 'View/Container',
    component: Container,
    argTypes: {},
};

const Template: Story<ContainerProps> = (args) => (
    <Container
        {...args}
        horizontallyCompactContent
    >
        <Container
            {...args}
            sub
            horizontallyCompactContent
        >
            <Container
                {...args}
                sub
            />
        </Container>
        <Container
            {...args}
            sub
        />
        <Container
            {...args}
            sub
        />
        <Container
            {...args}
            sub
            autoFocus
        />
    </Container>
);

export const Default = Template.bind({});
Default.args = {
    heading: 'Heading',
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
};
