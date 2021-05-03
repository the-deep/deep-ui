import React from 'react';
import { _cs } from '@togglecorp/fujs';
import RawButton, { RawButtonProps } from '../RawButton';

import { TabKey, TabContext, TabVariant } from '../TabContext';

import styles from './styles.css';

const tabVariantToStyleMap: {
    [key in TabVariant]: string;
} = {
    primary: styles.primary,
    secondary: styles.secondary,
};

export const setHashToBrowser = (hash: string | undefined) => {
    if (hash) {
        window.location.replace(`#/${hash}`);
    } else {
        window.location.hash = '';
    }
};

export interface Props<T extends TabKey> extends Omit<RawButtonProps<T>, 'onClick' | 'variant'>{
    name: T;
    activeClassName?: string;
}

export default function Tab<T extends TabKey>(props: Props<T>) {
    const context = React.useContext(TabContext);

    const {
        variant,
        disabled: disabledFromContext,
    } = context;

    const {
        activeClassName,
        className,
        name,
        disabled: disabledFromProps,
        ...otherProps
    } = props;

    let isActive = false;

    if (context.useHash) {
        isActive = context.hash === name;
    } else {
        isActive = context.activeTab === name;
    }

    const disabled = disabledFromContext || disabledFromProps;

    return (
        <RawButton
            className={_cs(
                className,
                styles.tab,
                isActive && styles.active,
                isActive && activeClassName,
                disabled && styles.disabled,
                variant && tabVariantToStyleMap[variant],
            )}
            onClick={context.useHash ? setHashToBrowser : context.setActiveTab}
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
