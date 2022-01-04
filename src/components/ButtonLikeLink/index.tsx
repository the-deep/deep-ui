import React from 'react';
import { isValidUrl, _cs } from '@togglecorp/fujs';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';

import { genericMemo } from '../../utils';
import { useButtonFeatures } from '../Button';
import styles from './styles.css';

type PropsFromButton = Parameters<typeof useButtonFeatures>[0];
export interface Props extends PropsFromButton, Omit<RouterLinkProps, 'children'> {
    className?: string;
    title?: string;
}

function ButtonLikeLink(props: Props) {
    const {
        title,
        variant,
        className: classNameFromProps,
        actionsContainerClassName,
        iconsContainerClassName,
        childrenContainerClassName,
        disabled,
        children: childrenFromProps,
        icons,
        actions,
        big,
        to,
        ...linkProps
    } = props;

    const {
        className,
        children,
    } = useButtonFeatures({
        variant,
        className: classNameFromProps,
        actionsContainerClassName,
        iconsContainerClassName,
        childrenContainerClassName,
        disabled,
        children: childrenFromProps,
        icons,
        actions,
        big,
    });

    // FIXME: the typing is problematic
    const isExternalLink = React.useMemo(
        () => (
            typeof to === 'string' && (isValidUrl(to) || to.startsWith('mailto:'))
        ),
        [to],
    );

    if (!to) {
        return null;
    }

    if (isExternalLink) {
        return (
            <a
                href={to as string}
                className={_cs(className, styles.link)}
                target="_blank"
                rel="noopener noreferrer"
                {...linkProps}
            >
                {children}
            </a>
        );
    }

    return (
        <RouterLink
            className={_cs(className, styles.link)}
            title={title}
            to={to}
            {...linkProps}
        >
            { children }
        </RouterLink>
    );
}

export default genericMemo(ButtonLikeLink);
