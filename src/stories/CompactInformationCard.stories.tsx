import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import {
    IoBookmark,
    IoPricetag,
    IoNewspaper,
} from 'react-icons/io5';

import CompactInformationCard, { Props as CompactInformationCardProps } from '#components/CompactInformationCard';

import styles from './styles.css';

export default {
    title: 'View/CompactInformationCard',
    component: CompactInformationCard,
    argTypes: {},
};

const Template: Story<CompactInformationCardProps> = (args) => (
    <CompactInformationCard
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    icon: <IoBookmark />,
    value: 140,
    label: 'Sources added weekly',
};

export const Grouped = () => (
    <div className={styles.container}>
        <div
            className={styles.groupedCompactInformationCardContainer}
        >
            <CompactInformationCard
                className={styles.compactInformationCard}
                icon={<IoBookmark />}
                value={140}
                label="Sources added weekly"
            />
            <div className={styles.border} />
            <CompactInformationCard
                className={styles.compactInformationCard}
                icon={<IoPricetag />}
                value={30}
                label="Daily average sources tagged per project"
            />
            <div className={styles.border} />
            <CompactInformationCard
                className={styles.compactInformationCard}
                icon={<IoNewspaper />}
                value={100}
                label="Generated reports monthly"
            />
        </div>
    </div>
);
