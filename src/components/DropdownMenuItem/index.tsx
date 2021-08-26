import React from 'react';
import {
    _cs,
    isValidUrl,
} from '@togglecorp/fujs';
import {
    Link,
    LinkProps,
} from 'react-router-dom';

import ElementFragments, {
    Props as ElementFragmentProps,
} from '../ElementFragments';

import RawButton, {
    Props as RawButtonProps,
} from '../RawButton';

import { genericMemo } from '../../utils';

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

export function Separator({ className }: { className?: string }) {
    return (
        <hr className={_cs(styles.separator, className)} />
    );
}

interface BaseProps extends ElementFragmentProps {
    className?: string;
}

export type Props<N extends string | number | undefined> = BaseProps & ({
    href?: undefined;
    name: N;
    onClick: RawButtonProps<N>['onClick'];
} | {
    href: string;
    linkProps?: LinkProps;
})

function DropdownMenuItem<N extends string | number | undefined>(props: Props<N>) {
    const {
        className: classNameFromProps,
        icons,
        actions,
        children,
        iconsContainerClassName,
        childrenContainerClassName,
        actionsContainerClassName,
        spacing = 'comfortable',
    } = props;

    const className = _cs(
        styles.dropdownMenuItem,
        spacingToStyleMap[spacing],
        classNameFromProps,
    );

    const content = (
        <ElementFragments
            icons={icons}
            actions={actions}
            iconsContainerClassName={iconsContainerClassName}
            childrenContainerClassName={childrenContainerClassName}
            actionsContainerClassName={actionsContainerClassName}
        >
            {children}
        </ElementFragments>
    );

    // eslint-disable-next-line react/destructuring-assignment
    if (props.href !== undefined) {
        const isExternalLink = props.href
            && typeof props.href === 'string'
            && (isValidUrl(props.href) || props.href.startsWith('mailto:'));

        if (isExternalLink) {
            return (
                <a
                    className={className}
                    href={props.href}
                    target="_blank"
                    rel="noreferrer"
                >
                    {content}
                </a>
            );
        }

        return (
            <Link
                className={className}
                to={props.href}
            >
                {children}
            </Link>
        );
    }

    return (
        <RawButton
            className={className}
            // eslint-disable-next-line react/destructuring-assignment
            name={props.name}
            // eslint-disable-next-line react/destructuring-assignment
            onClick={props.onClick}
        >
            {content}
        </RawButton>
    );
}

export default genericMemo(DropdownMenuItem);
