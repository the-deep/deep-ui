import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import List, { Props as ListProps } from '../components/List';
import Button from '../components/Button';

export default {
    title: 'View/List',
    component: List,
    argTypes: {},
};

interface Option {
    key: string;
    label: string;
    group: string;
}

const options: Option[] = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
];

interface OptionProps {
    children: React.ReactNode
}
function Option({ children }: OptionProps) {
    return (
        <div>
            { children }
        </div>
    );
}

interface GroupProps {
    title: string;
    children: React.ReactNode;
}
function Group({
    title,
    children,
}: GroupProps) {
    return (
        <div>
            <header>
                <h3>
                    Group
                    &nbsp;
                    {title}
                </h3>
            </header>
            <div>
                { children }
            </div>
        </div>
    );
}

function CollapsedGroup({
    title,
    children,
}: GroupProps) {
    const [groupOpen, setGroupOpen] = useState(false);
    const handleGroupButtonClick = React.useCallback(() => {
        setGroupOpen((prevValue) => !prevValue);
    }, [setGroupOpen]);

    return (
        <div style={{ margin: '10px' }}>
            <header>
                <Button
                    name="group-expand"
                    onClick={handleGroupButtonClick}
                >
                    Group
                    &nbsp;
                    {title}
                </Button>
            </header>
            {groupOpen && (
                <div style={{ padding: '10px' }}>
                    { children }
                </div>
            )}
        </div>
    );
}

const Template: Story<ListProps<Option, OptionProps, string, GroupProps, string>> = (args) => (
    <List {...args} />
);

export const Default = Template.bind({});
Default.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (_, option) => ({ children: option.label }),
};

export const Grouped = Template.bind({});
Grouped.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (_, option) => ({ children: option.label }),
    groupKeySelector: (d) => d.group,
    groupRenderer: Group,
    groupRendererParams: (key) => ({ title: key }),
    grouped: true,
};

export const CollapsedGrouped = Template.bind({});
CollapsedGrouped.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (_, option) => ({ children: option.label }),
    groupKeySelector: (d) => d.group,
    groupRenderer: CollapsedGroup,
    groupRendererParams: (key) => ({ title: key }),
    grouped: true,
};
