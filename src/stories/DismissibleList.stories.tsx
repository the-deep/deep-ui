import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import DismissibleList, {
    Props as DismissibleListProps,
} from '../components/DismissibleList';

export default {
    title: 'Input/DismissibleList',
    component: DismissibleList,
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

const Template: Story<DismissibleListProps<Option, string, string>> = (props) => {
    const {
        data,
    } = props;

    const [value, setValue] = useState<string[]>(options.map((v) => v.id));

    return (
        <DismissibleList
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
