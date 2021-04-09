import React from 'react';
import { _cs } from '@togglecorp/fujs';
import RawButton, { RawButtonProps } from '../RawButton';

import { TabKey, TabContext } from '../TabContext';

import styles from './styles.css';

export interface Props<T extends TabKey> extends Omit<RawButtonProps<T>, 'onClick'>{
    name: T;
    activeClassName?: string;
}

export default function Tab<T extends TabKey>(props: Props<T>) {
    const {
        activeTab,
        setActiveTab,
    } = React.useContext(TabContext);

    const {
        activeClassName,
        className,
        name,
        disabled,
        ...otherProps
    } = props;

    const isActive = name === activeTab;

    return (
        <RawButton
            className={_cs(
                className,
                styles.tab,
                isActive && styles.active,
                isActive && activeClassName,
                disabled && styles.disabled,
            )}
            onClick={setActiveTab}
            name={name}
            disabled={disabled}
            role="tab"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export interface TabListProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}
