import React from 'react';
import { isValidUrl } from '@togglecorp/fujs';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';
import {
    useButtonFeatures,
} from '../Button';

type PropsFromButton = Parameters<typeof useButtonFeatures>[0];
export interface Props extends PropsFromButton, RouterLinkProps {
    className?: string;
    title?: string;
}

function ButtonLikeLink(props: Props) {
    const {
        title,
        variant,
        className: classNameFromProps,
        actionsClassName,
        iconsClassName,
        childrenClassName,
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
        actionsClassName,
        iconsClassName,
        childrenClassName,
        disabled,
        children: childrenFromProps,
        icons,
        actions,
        big,
    });

    // FIXME: the typing is problematic
    const isExternalLink = React.useMemo(() => isValidUrl(to as string), [to]);

    if (!to) {
        return null;
    }

    if (isExternalLink) {
        return (
            <a
                href={to as string}
                className={className}
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
            className={className}
            title={title}
            to={to}
            {...linkProps}
        >
            { children }
        </RouterLink>
    );
}

export default ButtonLikeLink;
