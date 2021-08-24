import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import Tabs from '../components/Tabs';
import TabPanel, { Props as TabPanelProps } from '../components/TabPanel';

export default {
    title: 'View/Private/TabPanel',
    component: TabPanel,
    argTypes: {},
};

const Template: Story<TabPanelProps> = (args) => {
    const [value, setValue] = useState<string | undefined>('new-tab');

    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
            <TabPanel
                {...args}
            />
        </Tabs>
    );
};

export const Default = Template.bind({});
Default.args = {
    name: 'new-tab',
    children: (
        <>
            Tab Panel Content
        </>
    ),
};
