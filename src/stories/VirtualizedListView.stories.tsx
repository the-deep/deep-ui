import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import VirtualizedListView, { Props as VirtualizedListViewProps } from '../components/VirtualizedListView';
import Checkbox from '../components/Checkbox';

import styles from './styles.css';

export default {
    title: 'View/VirtualizedListView',
    component: VirtualizedListView,
    argTypes: {},
};

interface OptionFields {
    key: string;
    label: string;
    group: string;
}

interface OptionProps {
    children: React.ReactNode
}

const options: OptionFields[] = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
    { key: '6', label: 'Ant-Man', group: 'Land' },
    { key: '7', label: 'Aquaman', group: 'Water' },
    { key: '8', label: 'Black Panther', group: 'Land' },
    { key: '9', label: 'Iron Man', group: 'Air' },
    { key: '10', label: 'Spider Man', group: 'Air' },
    { key: '11', label: 'Wolverine', group: 'Land' },
    { key: '12', label: 'Thor', group: 'Air' },
    { key: '13', label: 'Hulk', group: 'Land' },
    { key: '14', label: 'Doctor Strange', group: 'Air' },
    { key: '15', label: 'Quick Silver', group: 'Land' },
    { key: '16', label: 'Doctor Manhattan', group: 'Air' },
    { key: '17', label: 'Robocop', group: 'Land' },
    { key: '18', label: 'Drax', group: 'Land' },
    { key: '19', label: 'Mystique', group: 'Land' },
    { key: '20', label: 'Rorsharch', group: 'Land' },
    { key: '21', label: 'Professor X', group: 'Land' },
    { key: '22', label: 'Groot', group: 'Land' },
    { key: '23', label: 'Black Widow', group: 'Land' },
    { key: '24', label: 'Hawkeye', group: 'Land' },
    { key: '25', label: 'Deadpool', group: 'Land' },
];

const ITEM_HEIGHT = 40;

const Option = ({ children }: OptionProps) => (
    <div
        className={styles.virtualizedListItem}
        style={{ height: `${ITEM_HEIGHT}px` }}
    >
        { children }
    </div>
);

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
    scrollToItemKey: '10',
    itemHeight: ITEM_HEIGHT,
};
