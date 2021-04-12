import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';

import Pager, { PagerProps } from '#components/Pager';

export default {
    title: 'Input/Pager',
    component: Pager,
    argTypes: {},
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
export const PreviousNext = Template.bind({});
PreviousNext.args = {
    showLabel: true,
    showPages: false,
    activePage: 1,
    maxItemsPerPage: 10,
    itemsCount: 100,
    infoHidden: true,
};
