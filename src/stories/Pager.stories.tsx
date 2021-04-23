import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';

import Pager, { PagerProps } from '#components/Pager';

export default {
    title: 'Input/Pager',
    component: Pager,
    argTypes: {},
    decorators: [withDesign],
};

const Template: Story<PagerProps> = (args) => {
    const [{ activePage, maxItemsPerPage }, handleArgsChange] = useArgs();

    const setActivePage = (e: number) => {
        handleArgsChange({ activePage: e });
    };

    return (
        <Pager
            {...args}
            itemsPerPageControlHidden
            onItemsPerPageChange={undefined}
            onActivePageChange={setActivePage}
            maxItemsPerPage={maxItemsPerPage}
            activePage={activePage}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    activePage: 2,
    maxItemsPerPage: 10,
    itemsCount: 100,
    infoHidden: true,
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=4925%3A3559',
    },
};
export const PreviousNext = Template.bind({});
PreviousNext.args = {
    showLabel: true,
    showPages: false,
    activePage: 1,
    maxItemsPerPage: 10,
    itemsCount: 100,
    infoHidden: true,
};
PreviousNext.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=4925%3A3559',
    },
};
