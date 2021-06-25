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

import styles from './styles.css';

export function Separator({ className }: { className?: string }) {
    return (
        <hr className={_cs(styles.separator, className)} />
    );
}

interface BaseProps extends ElementFragmentProps {
    className?: string;
}

export type Props<N extends string | number> = BaseProps & ({
    name?: N;
    onClick: RawButtonProps<N>['onClick'];
    href?: never;
    linkProps?: never;
} | {
    href: string;
    onClick?: never;
    name?: never;
    linkProps?: LinkProps;
})

function DropdownMenuItem<N extends string | number>(props: Props<N>) {
    const {
        className: classNameFromProps,
        icons,
        actions,
        children,
        iconsContainerClassName,
        childrenContainerClassName,
        actionsContainerClassName,
    } = props;

    const isExternalLink = React.useMemo(() => (
        props.href
        && typeof props.href === 'string'
        && (isValidUrl(props.href)
            || props.href.startsWith('mailto:'))
    ), [props.href]);

    const className = _cs(styles.dropdownMenuItem, classNameFromProps);

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

    if (props.href) {
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
            name={props.name}
            onClick={props.onClick}
        >
            {content}
        </RawButton>
    );
}

export default DropdownMenuItem;
