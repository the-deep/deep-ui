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
    <div>
        { children }
    </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<ListViewProps<OptionFields, OptionProps, string, any, any>> = (args) => {
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
                    width: '350px',
                    marginTop: '20px',
                }}
            >
                <ListView
                    {...args}
                    pending={pending}
                    filtered={filtered}
                    errored={errored}
                    onReload={() => { console.warn('reloaded'); }}
                    direction="vertical"
                    spacing="comfortable"
                    messageShown
                    messageIconShown
                    // eslint-disable-next-line react/destructuring-assignment
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
    borderBetweenItem: true,
};
