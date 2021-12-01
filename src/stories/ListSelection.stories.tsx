import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import ListSelection, {
    Props as ListSelectionProps,
} from '#components/ListSelection';

export default {
    title: 'Input/ListSelection',
    component: ListSelection,
    argTypes: {},
};

interface Option {
    id: string;
    name: string;
}

const options: Option[] = [
    { id: '6', name: 'Eggplant' },
    { id: '4', name: 'Gourd' },
    { id: '1', name: 'Potato' },
    { id: '3', name: 'Pumpkin' },
    { id: '5', name: 'Spinach' },
    { id: '2', name: 'Tomato' },
];

const keySelector = (d: Option) => d.id;

const labelSelector = (d: Option) => d.name;

// eslint-disable-next-line max-len
const Template: Story<ListSelectionProps<Option, string, string>> = (props) => {
    const {
        data,
    } = props;

    const [value, setValue] = useState<string[] | undefined>(data?.map((v) => v.id));

    return (
        <ListSelection
            {...props}
            data={data}
            keySelector={keySelector}
            labelSelector={labelSelector}
            value={value}
            onChange={setValue}
        />
    );
};

export const NoValue = Template.bind({});
NoValue.args = {
    data: undefined,
};

export const Default = Template.bind({});
Default.args = {
    data: options,
};
