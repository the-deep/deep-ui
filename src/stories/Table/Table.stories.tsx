import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Table, {
    Props as TableProps,
    Column,
} from '#components/Table';
import useRowExpansion, { RowExpansionContext } from '#components/Table/useRowExpansion';
import {
    createStringColumn,
    createNumberColumn,
    createExpandColumn,
} from '#components/Table/predefinedColumns';

import styles from './styles.css';

export default {
    title: 'View/Table',
    component: Table,
    argTypes: {},
};

interface Program {
    id: number;
    name: string;
    budget: number | undefined;
    date: string;
}
const data: Program[] = [
    {
        id: 1,
        name: 'Program A : 150 Somali migrants return home after detention in Libya and one reallyreallyreallyreallyreallyreallyreallylongsinglewordwhichshouldbreakthetable',
        budget: 123123,
        date: '2012-10-12T12:00:00',
    },
    {
        id: 2,
        name: 'Program B',
        budget: 100,
        date: '2010-11-02T10:12:10',
    },
    {
        id: 3,
        name: 'Program C',
        budget: 10000,
        date: '1994-04-17T01:04:12',
    },
    {
        id: 4,
        name: 'Program D',
        budget: undefined,
        date: '2021-08-23T06:01:18',
    },
];

const columns = [
    createNumberColumn<Program, number>(
        'id',
        'ID',
        (item) => item.id,
        { columnWidth: 'var(--dui-spacing-super-large)' },
    ),
    createStringColumn<Program, number>(
        'name',
        'Name',
        (item) => item.name,
        { columnClassName: styles.name },
    ),
    createNumberColumn<Program, number>(
        'budget',
        'Budget',
        (item) => item.budget,
    ),
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<TableProps<Program, number, Column<Program, number, any, any>>> = (args) => (
    <Table
        {...args}
        columns={columns}
        data={data}
        className={styles.table}
    />
);

export const Default = Template.bind({});
Default.args = {
    keySelector: (d) => d.id,
};

export const Small = Template.bind({});
Small.args = {
    keySelector: (d) => d.id,
    variant: 'small',
};

export const Large = Template.bind({});
Large.args = {
    keySelector: (d) => d.id,
    variant: 'large',
};

const programKeySelector = (d: Program) => d.id;
export const Expandable: Story<
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    TableProps<Program, number, Column<Program, number, any, any>>
> = (args) => {
    const [
        rowModifier,
        expandedRowKey,
        setExpandedRowKey,
    ] = useRowExpansion<Program, number>(
        ({ datum }) => (
            <div className={styles.expandedRow}>
                {datum.name}
            </div>
        ),
        {
            expandedRowClassName: styles.expandedRow,
            expandedCellClassName: styles.expandedCell,
            expansionCellClassName: styles.expansionCell,
            expansionRowClassName: styles.expansionRow,
        },
        true,
    );

    return (
        <RowExpansionContext.Provider
            value={{ expandedRowKey, setExpandedRowKey }}
        >
            <Table
                {...args}
                columns={columns}
                data={data}
                className={styles.table}
                keySelector={programKeySelector}
                rowModifier={rowModifier}
            />
        </RowExpansionContext.Provider>
    );
};

export const ManualRowExpansion = () => {
    const [
        rowModifier,
        expandedRowKey,
        setExpandedRowKey,
    ] = useRowExpansion<Program, number>(
        ({ datum }) => (
            <div key={`expanded-${datum.id}`}>
                {datum.name}
            </div>
        ),
        {
            expandedRowClassName: styles.expandedRow,
            expandedCellClassName: styles.expandedCell,
            expansionCellClassName: styles.expansionCell,
            expansionRowClassName: styles.expansionRow,
        },
    );

    const columnsWithAction = [
        createExpandColumn<Program, number>(
            'expand-button',
            '',
        ),
        ...columns,
    ];

    return (
        <RowExpansionContext.Provider
            value={{ expandedRowKey, setExpandedRowKey }}
        >
            <Table
                className={styles.table}
                keySelector={programKeySelector}
                columns={columnsWithAction}
                data={data}
                rowModifier={rowModifier}
                variant="large"
            />
        </RowExpansionContext.Provider>
    );
};
