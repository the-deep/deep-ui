import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import Tabs, { Props as TabsProps } from '#components/Tabs';
import Tab from '#components/Tab';
import TabList from '#components/TabList';
import TabPanel from '#components/TabPanel';

export default {
    title: 'View/Tabs',
    component: Tabs,
    argTypes: {},
};

const Template: Story<TabsProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    const children = (
        <>
            <TabList>
                <Tab name="tab-one">
                    Home
                </Tab>
                <Tab name="tab-two">
                    Profile
                </Tab>
                <Tab name="tab-three">
                    Notifications
                </Tab>
            </TabList>

            <TabPanel name="tab-one">
                This is the home page!
            </TabPanel>
            <TabPanel name="tab-two">
                This is the profile page!
            </TabPanel>
            <TabPanel name="tab-three">
                Your notifications are here!
            </TabPanel>
        </>
    );

    // eslint-disable-next-line react/destructuring-assignment
    if (args.useHash) {
        return (
            <Tabs
                {...args}
            >
                {children}
            </Tabs>
        );
    }

    return (
        <Tabs
            {...args}
            value={value}
            onChange={handleChange}
        >
            {children}
        </Tabs>
    );
};

export const Default = Template.bind({});
Default.args = {
    value: 'tab-one',
};

export const Hash = Template.bind({});
Hash.args = {
    useHash: true,
    defaultHash: 'tab-two',
};

export const Secondary = Template.bind({});
Secondary.args = {
    value: 'tab-one',
    variant: 'secondary',
};

export const Step = Template.bind({});
Step.args = {
    value: 'tab-three',
    variant: 'step',
};

export function DisabledTab() {
    const [value, setValue] = useState<string | undefined>('tab-one');
    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
            <TabList>
                <Tab name="tab-one">
                    Home
                </Tab>
                <Tab
                    name="tab-two"
                    disabled
                >
                    Profile
                </Tab>
                <Tab name="tab-three">
                    Notifications
                </Tab>
            </TabList>

            <TabPanel name="tab-one">
                This is the home page!
            </TabPanel>
            <TabPanel
                name="tab-two"
            >
                This is the profile page!
            </TabPanel>
            <TabPanel name="tab-three">
                Your notifications are here!
            </TabPanel>
        </Tabs>
    );
}
