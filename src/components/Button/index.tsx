import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';

import ElementFragments from '../ElementFragments';
import { SpacingTypes } from '../../types';
import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

export type ButtonVariant = (
    'primary'
    | 'secondary'
    | 'tertiary'
    | 'action'
    | 'transparent'
    | 'general'
);

const buttonVariantToStyleMap: { [key in ButtonVariant]: string; } = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
    action: styles.action,
    transparent: styles.transparent,
    general: styles.general,
};

export interface Props<N> extends Omit<
    React.HTMLProps<HTMLButtonElement>,
    'ref' | 'onClick' | 'name' | 'type' | 'label' | 'title'
> {
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    children?: React.ReactNode;
    className?: string;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    iconsContainerClassName?: string;
    childrenContainerClassName?: string;
    actionsContainerClassName?: string;
    disabled?: boolean;
    big?: boolean;
    name: N;
    onClick?: (name: N, e: React.MouseEvent<HTMLButtonElement>) => void;
    readOnly?: boolean;
    elementRef?: React.RefObject<HTMLButtonElement>;
    spacing?: SpacingTypes;
    ellipsize?: boolean;
    title?: string;
    disabledTitle?: string;
}

export type ButtonFeatureKeys = 'variant' | 'className' | 'actionsContainerClassName' | 'iconsContainerClassName' | 'childrenContainerClassName' | 'children' | 'icons' | 'actions' | 'disabled' | 'big' | 'readOnly' | 'spacing' | 'ellipsize';
export function useButtonFeatures(
    props: Pick<Props<void>, ButtonFeatureKeys>,
) {
    const {
        variant = 'primary',
        className,
        actionsContainerClassName,
        iconsContainerClassName,
        childrenContainerClassName,
        disabled,
        children,
        icons,
        actions,
        big,
        readOnly,
        spacing = 'comfortable',
        ellipsize,
    } = props;

    const buttonClassName = _cs(
        styles.button,
        big && styles.big,
        readOnly && styles.readOnly,
        buttonVariantToStyleMap[variant] ?? styles.primary,
        spacingToStyleMap[spacing],
        ellipsize && styles.ellipsize,
        className,
    );

    const buttonChildren = (
        <ElementFragments
            icons={icons}
            iconsContainerClassName={_cs(styles.icons, iconsContainerClassName)}
            actions={actions}
            actionsContainerClassName={_cs(styles.actions, actionsContainerClassName)}
            childrenContainerClassName={_cs(styles.children, childrenContainerClassName)}
            spacing={spacing}
        >
            {ellipsize ? (
                <div className={styles.ellipsizeContainer}>
                    {children}
                </div>
            ) : children }
        </ElementFragments>
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
        actionsContainerClassName,
        iconsContainerClassName,
        childrenContainerClassName,
        children,
        icons,
        actions,
        disabled,
        big,
        name,
        onClick,
        readOnly,
        elementRef,
        spacing,
        ellipsize,
        title,
        disabledTitle,
        ...otherProps
    } = props;

    const handleButtonClick = React.useCallback((e) => {
        if (onClick && !readOnly) {
            onClick(name, e);
        }
    }, [name, onClick, readOnly]);

    const buttonProps = useButtonFeatures({
        variant,
        className,
        actionsContainerClassName,
        iconsContainerClassName,
        childrenContainerClassName,
        children,
        icons,
        actions,
        disabled,
        big,
        readOnly,
        spacing,
        ellipsize,
    });

    // FIXME: Use raw button
    return (
        <button
            ref={elementRef}
            type="button"
            onClick={handleButtonClick}
            title={(disabled && disabledTitle) ? disabledTitle : title}
            {...otherProps}
            {...buttonProps}
        />
    );
}

export default genericMemo(Button);
