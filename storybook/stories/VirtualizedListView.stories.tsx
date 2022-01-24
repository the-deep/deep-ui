import React, { useRef } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import Button from '../../src/components/Button';
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

// const totalOptionsCount = 100000;
const totalOptionsCount = 100;
const options: OptionFields[] = Array.from(Array(totalOptionsCount)).map((_, index) => ({
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

const scrollTo = String(Math.floor(totalOptionsCount / 2) + 3);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<VirtualizedListViewProps<OptionFields, OptionProps, string>> = (args) => {
    const [{
        empty,
        pending,
        filtered,
    }, updateArgs] = useArgs();

    interface Component {
        scrollTo: (item: string) => void;
    }

    const componentRef = useRef<Component | null>(null);

    const handleCheckboxChange = React.useCallback((value, name) => {
        updateArgs({ [name]: value });
    }, [updateArgs]);

    const handleScroll = (key: string) => {
        if (componentRef.current) {
            componentRef.current.scrollTo(key);
        }
    };

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
            <Button
                name={scrollTo}
                onClick={handleScroll}
            >
                {`Jump to item ${scrollTo}`}
            </Button>
            <VirtualizedListView
                {...args}
                componentRef={componentRef}
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
