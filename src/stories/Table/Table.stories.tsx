import React from 'react';

import { Story } from '@storybook/react/types-6-0';
import Table, {
    Props as TableProps,
    Column,
} from '#components/Table';
import useRowExpansion from '#components/Table/useRowExpansion';
import {
    createStringColumn,
    createNumberColumn,
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
        name: 'Program A : 150 Somali migrants return home after detention in Libya',
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
        // { sortable: true },
    ),
    createStringColumn<Program, number>(
        'name',
        'Name',
        (item) => item.name,
        // { sortable: true, filterType: FilterType.string, cellAsHeader: true },
    ),
    createNumberColumn<Program, number>(
        'budget',
        'Budget',
        (item) => item.budget,
        // { sortable: true, filterType: FilterType.number },
    ),
    /*
    createDateColumn<Program, number>(
        'date',
        'Date',
        (item) => item.date,
        { sortable: true, orderable: true },
    ),
    createDateTimeColumn<Program, number>(
        'datetime',
        'Date Time',
        (item) => item.date,
        { sortable: true, orderable: true },
    ),
    createYesNoColumn<Program, number>(
        'aboveBudget',
        'Above Budget',
        (item) => isDefined(item.budget) && item.budget > 100,
        { sortable: true, orderable: true },
    ),
     */
];

/*
const staticColumnOrdering = [
    { name: 'id' },
    { name: 'name' },
    { name: 'budget' },
    { name: 'date' },
    { name: 'datetime' },
    { name: 'aboveBudget' },
];
 */

const Template: Story<TableProps<Program, number, Column<Program, number, any, any>>> = (args) => (
    /*
    const sortState = useSortState();
    const { sorting } = sortState;

    const filterState = useFilterState();
    const { filtering } = filterState;

    const orderState = useOrderState(staticColumnOrdering);
    const { ordering } = orderState;

    const orderedColumns = useOrdering(columns, ordering);
    const filteredData = useFiltering(filtering, orderedColumns, data);
    const sortedData = useSorting(sorting, orderedColumns, filteredData);
     */

    /*
        <SortContext.Provider value={sortState}>
            <FilterContext.Provider value={filterState}>
                <OrderContext.Provider value={orderState}>
                    <Table
                        {...args}
                        columns={orderedColumns}
                        data={sortedData}
                        className={styles.table}
                    />
                </OrderContext.Provider>
            </FilterContext.Provider>
        </SortContext.Provider>
     */

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

export const Expandable: Story<
    TableProps<Program, number, Column<Program, number, any, any>>
> = (args) => {
    const keySelector = (d: Program) => d.id;

    const [rowModifier] = useRowExpansion<Program, number>(
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
    );

    return (
        <Table
            {...args}
            columns={columns}
            data={data}
            className={styles.table}
            keySelector={keySelector}
            rowModifier={rowModifier}
        />
    );
};
