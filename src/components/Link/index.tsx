import React, { memo } from 'react';
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
    iconsContainerClassName?: string;
    linkElementClassName?: string;
    actionsContainerClassName?: string;
    disabled?: boolean;
}

function Link(props: Props) {
    const {
        disabled,
        className,
        actionsContainerClassName,
        iconsContainerClassName,
        linkElementClassName,
        icons,
        actions,
        to,
        ...otherProps
    } = props;

    const isExternalLink = React.useMemo(
        () => (
            typeof to === 'string' && (isValidUrl(to) || to.startsWith('mailto:'))
        ),
        [to],
    );

    return (
        <div className={_cs(className, styles.link, disabled && styles.disabled)}>
            {icons && (
                <div className={_cs(iconsContainerClassName, styles.icons)}>
                    { icons }
                </div>
            )}
            {isExternalLink ? (
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
                <div className={_cs(actionsContainerClassName, styles.actions)}>
                    { actions }
                    { isExternalLink && <IoChevronForward /> }
                </div>
            )}
        </div>
    );
}

export default memo(Link);
