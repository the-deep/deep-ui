import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import ListView, { Props as ListViewProps } from '../components/ListView';
import Checkbox from '../components/Checkbox';

export default {
    title: 'View/ListView',
    component: ListView,
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
];

const Option = ({ children }: OptionProps) => (
    <div style={{ padding: '10px' }}>
        { children }
    </div>
);

const Template: Story<ListViewProps<OptionFields, OptionProps, string, any, any>> = (args) => {
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
            <div
                style={{
                    width: '320px',
                    backgroundColor: '#e0e0e0',
                    padding: '10px',
                    marginTop: '16px',
                }}
            >
                <ListView
                    {...args}
                    pending={pending}
                    filtered={filtered}
                    data={empty ? [] : args.data}
                />
            </div>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (_, option) => ({ children: option.label }),
};
