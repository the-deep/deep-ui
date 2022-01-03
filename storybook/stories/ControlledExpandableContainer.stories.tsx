import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import ControlledExpandableContainer, {
    Props as ControlledExpandableContainerProps,
} from '../../src/components/ControlledExpandableContainer';

export default {
    title: 'View/ControlledExpandableContainer',
    component: ControlledExpandableContainer,
    argTypes: {},
};

const Template: Story<ControlledExpandableContainerProps<string>> = (args) => {
    const [selected, setSelected] = useState<string | undefined>();
    const handleChange = (_: boolean, name: string) => {
        setSelected((oldValue) => (oldValue === name ? undefined : name));
    };
    return (
        <>
            <ControlledExpandableContainer
                {...args}
                name="step1"
                heading="Step 1"
                headingDescription="Getting started"
                expanded={selected === 'step1'}
                onExpansionChange={handleChange}
            />
            <ControlledExpandableContainer
                {...args}
                name="step2"
                heading="Step 2"
                headingDescription="Introduction"
                expanded={selected === 'step2'}
                onExpansionChange={handleChange}
            />
            <ControlledExpandableContainer
                {...args}
                name="step3"
                heading="Step 3"
                headingDescription="Installation"
                expanded={selected === 'step3'}
                onExpansionChange={handleChange}
            />
            <ControlledExpandableContainer
                {...args}
                name="step4"
                heading="Step 4"
                headingDescription="Configuration"
                expanded={selected === 'step4'}
                onExpansionChange={handleChange}
            />
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    children: 'A lof of ui elements',
};
