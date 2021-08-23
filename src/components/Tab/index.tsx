import React from 'react';
import { _cs } from '@togglecorp/fujs';
import RawButton, { Props as RawButtonProps } from '../RawButton';

import Border, { Props as BorderProps } from '../Border';
import { TabKey, TabContext, TabVariant } from '../TabContext';
import { setHashToBrowser, genericMemo } from '../../utils';

import styles from './styles.css';

export interface TabListProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

const tabVariantToStyleMap: {
    [key in TabVariant]: string;
} = {
    primary: styles.primary,
    secondary: styles.secondary,
    step: styles.step,
};

export interface Props<T extends TabKey> extends Omit<RawButtonProps<T>, 'onClick' | 'variant'>{
    name: T;
    activeClassName?: string;
    borderWrapperClassName?: string;
    transparentBorder?: boolean;
    fullWidthActiveBorder?: boolean;
    borderPosition?: BorderProps['position'];
    borderWidth?: BorderProps['width'];
}

function Tab<T extends TabKey>(props: Props<T>) {
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
        borderWrapperClassName,
        children,
        transparentBorder,
        borderPosition = 'bottom',
        borderWidth,
        fullWidthActiveBorder,
        ...otherProps
    } = props;

    let isActive = false;

    if (context.useHash) {
        isActive = context.hash === name;
    } else {
        isActive = context.activeTab === name;
    }

    const disabled = disabledFromContext || disabledFromProps;
    const button = (
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
        >
            {variant === 'primary' && (
                <Border
                    active={isActive}
                    disabled={disabled}
                    transparent={transparentBorder}
                    fullWidthActiveBorder={fullWidthActiveBorder}
                    width={borderWidth}
                    position={borderPosition}
                />
            )}
            {children}
        </RawButton>
    );

    // The clip path used for step tab does not support border
    // So we wrap it into a container and set its background as border
    if (variant === 'step') {
        return (
            <div
                className={_cs(
                    styles.borderWrapper,
                    disabled && styles.disabled,
                    borderWrapperClassName,
                )}
            >
                { button }
            </div>
        );
    }

    return button;
}

export default genericMemo(Tab);
