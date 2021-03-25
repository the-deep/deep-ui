import React from 'react';
import {
    _cs,
    isValidUrl,
} from '@togglecorp/fujs';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';

import styles from './styles.css';

export interface Props extends RouterLinkProps {
    className?: string;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    iconsClassName?: string;
    linkElementClassName?: string;
    actionsClassName?: string;
    disabled?: boolean;
}

function Link(props: Props) {
    const {
        disabled,
        className,
        actionsClassName,
        iconsClassName,
        linkElementClassName,
        icons,
        actions,
        to,
        ...otherProps
    } = props;

    const isExternalLink = React.useMemo(() => isValidUrl(to as string), [to]);

    return (
        <div className={_cs(className, styles.link, disabled && styles.disabled)}>
            {icons && (
                <div className={_cs(iconsClassName, styles.icons)}>
                    { icons }
                </div>
            )}
            { isExternalLink ? (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                    href={to as string}
                    className={_cs(linkElementClassName, styles.linkElement)}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...otherProps}
                />
            ) : (
                <RouterLink
                    to={to}
                    className={_cs(linkElementClassName, styles.linkElement)}
                    {...otherProps}
                />
            )}
            {(actions || isExternalLink) && (
                <div className={_cs(actionsClassName, styles.actions)}>
                    { actions }
                    { isExternalLink && <IoChevronForward /> }
                </div>
            )}
        </div>
    );
}

export default Link;
