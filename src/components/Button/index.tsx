import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

export type ButtonVariant = (
    'primary'
    | 'secondary'
    | 'tertiary'
    | 'inverted'
    | 'action'
);

const buttonVariantToStyleMap: { [key in ButtonVariant]: string; } = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
    inverted: styles.inverted,
    action: styles.action,
};

export interface Props<N> extends Omit<
    React.HTMLProps<HTMLButtonElement>,
    'ref' | 'onClick' | 'name' | 'type'
> {
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    children?: React.ReactNode;
    className?: string;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    iconsClassName?: string;
    childrenClassName?: string;
    actionsClassName?: string;
    disabled?: boolean;
    big?: boolean;
    name: N;
    onClick?: (name: N, e: React.MouseEvent<HTMLButtonElement>) => void;
}

type ButtonFeatureKeys = 'variant' | 'className' | 'actionsClassName' | 'iconsClassName' | 'childrenClassName' | 'children' | 'icons' | 'actions' | 'disabled' | 'big';
export function useButtonFeatures(
    props: Pick<Props<void>, ButtonFeatureKeys>,
) {
    const {
        variant = 'primary',
        className,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        disabled,
        children,
        icons,
        actions,
        big,
    } = props;

    const buttonClassName = _cs(
        className,
        styles.button,
        variant,
        buttonVariantToStyleMap[variant],
        big && styles.big,
    );

    const buttonChildren = (
        <>
            {icons && (
                <div className={_cs(iconsClassName, styles.icons)}>
                    {icons}
                </div>
            )}
            {children && (
                <div className={_cs(childrenClassName, styles.children)}>
                    {children}
                </div>
            )}
            {actions && (
                <div className={_cs(actionsClassName, styles.actions)}>
                    {actions}
                </div>
            )}
        </>
    );

    return {
        className: buttonClassName,
        children: buttonChildren,
        disabled,
    };
}

function Button<N>(props: Props<N>) {
    const {
        variant,
        className,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        children,
        icons,
        actions,
        disabled,
        big,
        name,
        onClick,
        ...otherProps
    } = props;

    const handleButtonClick = React.useCallback((e) => {
        if (onClick) {
            onClick(name, e);
        }
    }, [name, onClick]);

    const buttonProps = useButtonFeatures({
        variant,
        className,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        children,
        icons,
        actions,
        disabled,
        big,
    });

    return (
        <button
            type="button"
            onClick={handleButtonClick}
            {...otherProps}
            {...buttonProps}
        />
    );
}

export default Button;
