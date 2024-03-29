import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import Tabs from '../../src/components/Tabs';
import Tab, { Props as TabProps } from '../../src/components/Tab';

export default {
    title: 'View/Private/Tab',
    component: Tab,
    argTypes: {},
};

const Template: Story<TabProps<string>> = (args) => {
    const [value, setValue] = useState<string | undefined>('new-tab');

    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
            <Tab
                {...args}
            />
        </Tabs>
    );
};

export const Default = Template.bind({});
Default.args = {
    name: 'new-tab',
    disabled: false,
    children: (
        <>
            Tab 1
        </>
    ),
};
