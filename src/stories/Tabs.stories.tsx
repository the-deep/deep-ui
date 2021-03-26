import React, { useState } from 'react';

import Tabs from '#components/Tabs';
import Tab from '#components/Tab';
import TabList from '#components/TabList';
import TabPanel from '#components/TabPanel';

export default {
    title: 'View/Tabs',
    component: Tabs,
    argTypes: {},
};

export function BasicTabs() {
    const [value, setValue] = useState('tab-one');
    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
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
        </Tabs>
    );
}

export function DisabledTab() {
    const [value, setValue] = useState('tab-one');
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
