import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import VirtualizedListView, { Props as VirtualizedListViewProps } from '../../src/components/VirtualizedListView';
import Checkbox from '../../src/components/Checkbox';

import styles from './styles.css';

export default {
    title: 'View/VirtualizedListView',
    component: VirtualizedListView,
    argTypes: {},
};

interface OptionFields {
    key: string;
    label: string;
}

interface OptionProps {
    children: React.ReactNode
}

const options: OptionFields[] = Array.from(Array(100000)).map((_, index) => ({
    key: String(index),
    label: `Item ${index}`,
}));

const ITEM_HEIGHT = 40;

function Option({ children }: OptionProps) {
    return (
        <div
            className={styles.virtualizedListItem}
            style={{ height: `${ITEM_HEIGHT}px` }}
        >
            { children }
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<VirtualizedListViewProps<OptionFields, OptionProps, string>> = (args) => {
    const [{
        empty,
        pending,
        filtered,
    }, updateArgs] = useArgs();

    const handleCheckboxChange = React.useCallback((value, name) => {
        updateArgs({ [name]: value });
    }, [updateArgs]);

    return (
        <div>
            <Checkbox
                name="empty"
                label="Empty"
                value={empty}
                onChange={handleCheckboxChange}
            />
            <Checkbox
                name="filtered"
                label="Filtered"
                value={filtered}
                onChange={handleCheckboxChange}
            />
            <Checkbox
                name="pending"
                label="Pending"
                value={pending}
                onChange={handleCheckboxChange}
            />
            <VirtualizedListView
                {...args}
                className={styles.virtualizedListView}
                pending={pending}
                filtered={filtered}
                // eslint-disable-next-line react/destructuring-assignment
                data={empty ? [] : args.data}
            />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (_, option) => ({ children: option.label }),
    itemHeight: ITEM_HEIGHT,
};
