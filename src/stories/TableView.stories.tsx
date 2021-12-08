import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import TableView, {
    Props as TableViewProps,
} from '../components/TableView';
import { Column } from '#components/Table';
import {
    createStringColumn,
    createNumberColumn,
} from '#components/Table/predefinedColumns';
import Checkbox from '../components/Checkbox';

export default {
    title: 'View/TableView',
    component: TableView,
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
    ),
    createStringColumn<Program, number>(
        'name',
        'Name',
        (item) => item.name,
    ),
    createNumberColumn<Program, number>(
        'budget',
        'Budget',
        (item) => item.budget,
    ),
];

const Template: Story<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TableViewProps<Program, number, Column<Program, number, any, any>>
> = (args) => {
    const [{
        empty,
        pending,
        filtered,
        errored,
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
                name="errored"
                label="Errored"
                value={errored}
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
            <div
                style={{
                    width: '540px',
                    marginTop: '16px',
                }}
            >
                <TableView
                    {...args}
                    pending={pending}
                    filtered={filtered}
                    errored={errored}
                    // eslint-disable-next-line react/destructuring-assignment
                    data={empty ? [] : args.data}
                    columns={columns}
                    messageShown
                    messageIconShown
                />
            </div>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    data,
    keySelector: (d) => d.id,
};
