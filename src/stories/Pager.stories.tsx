import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';

import Pager, { Props as PagerProps } from '../components/Pager';

export default {
    title: 'View/Pager',
    component: Pager,
    argTypes: {},
    decorators: [withDesign],
};

const Template: Story<PagerProps> = (args) => {
    const [{ activePage, maxItemsPerPage }, handleArgsChange] = useArgs();

    const setActivePage = (e: number) => {
        handleArgsChange({ activePage: e });
    };

    const onMaxItemsPerPageChange = (e: number) => {
        handleArgsChange({ maxItemsPerPage: e });
    };

    return (
        <Pager
            {...args}
            onItemsPerPageChange={onMaxItemsPerPageChange}
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
    hideInfo: true,
};
Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=4925%3A3559',
    },
};

export const PreviousNextOnly = Template.bind({});
PreviousNextOnly.args = {
    showPrevAndNextLabel: true,
    hidePages: true,
    activePage: 1,
    maxItemsPerPage: 10,
    itemsCount: 100,
    hideInfo: true,
};
PreviousNextOnly.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=4925%3A3559',
    },
};

export const DotsOnly = Template.bind({});
DotsOnly.args = {
    activePage: 1,
    maxItemsPerPage: 10,
    itemsCount: 100,
    hideInfo: true,
    hidePageNumberLabel: true,
    showAllPages: true,
    hidePrevAndNext: true,
};
DotsOnly.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/a83upKqdwvEYFoxXjlwSmv/DEEP_UI_LIBRARY-shared?node-id=4925%3A3559',
    },
};
