import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import Tabs, { Props as TabsProps } from '../../src/components/Tabs';
import Tab from '../../src/components/Tab';
import TabList from '../../src/components/TabList';
import TabPanel from '../../src/components/TabPanel';

import styles from './styles.css';

const dummyText = `
    Contrary to popular belief, Lorem Ipsum is not simply random text.
    It has roots in a piece of classical Latin literature from 45 BC,
    making it over 2000 years old. Richard McClintock,
    a Latin professor at Hampden-Sydney College in Virginia,
    looked up one of the more obscure Latin words, consectetur,
    from a Lorem Ipsum passage, and going through the cites of the word
    in classical literature, discovered the undoubtable source.
    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus
    Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC.
    This book is a treatise on the theory of ethics,
    very popular during the Renaissance.The first line of Lorem Ipsum, Lorem ipsum
    dolor sit amet.., comes from a line in section 1.10.32.
    The standard chunk of Lorem Ipsum used since the 1500s
    is reproduced below for those interested. Sections 1.10.32
    and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also
    reproduced in their exact original form,accompanied by
    English versions from the 1914 translation by H. Rackham.
`;

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
            <TabList ellipsize>
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
            <TabPanel
                name="tab-two"
                retainMount="eager"
                className={styles.largeTab}
            >
                This tab panel mount is not retained.
                {dummyText}
            </TabPanel>
            <TabPanel
                name="tab-three"
                className={styles.largeTab}
                retainMount="lazy"
            >
                This tab panel mount is retained.
                {dummyText}
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

            <TabPanel
                name="tab-one"
            >
                This is the home page!
            </TabPanel>
            <TabPanel
                name="tab-two"
            >
                This is the profile page!
            </TabPanel>
            <TabPanel
                name="tab-three"
                className={styles.largeTab}
            >
                {dummyText}
            </TabPanel>
        </Tabs>
    );
}

export function RetainMountTabs() {
    const [value, setValue] = useState<string | undefined>('tab-one');
    return (
        <Tabs
            value={value}
            onChange={setValue}
        >
            <TabList>
                <Tab name="tab-one">
                    Not Retained
                </Tab>
                <Tab name="tab-two">
                    Eagerly retained
                </Tab>
                <Tab name="tab-three">
                    Lazily retained
                </Tab>
            </TabList>

            <TabPanel
                name="tab-one"
                className={styles.largeTab}
                retainMount="none"
            >
                {dummyText}
            </TabPanel>
            <TabPanel
                name="tab-two"
                className={styles.largeTab}
                retainMount="eager"
            >
                {dummyText}
            </TabPanel>
            <TabPanel
                name="tab-three"
                className={styles.largeTab}
                retainMount="lazy"
            >
                {dummyText}
            </TabPanel>
        </Tabs>
    );
}
