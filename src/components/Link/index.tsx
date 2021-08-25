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

import { genericMemo } from '../../utils';
import { SpacingTypes } from '../../types';
import Actions from '../Actions';
import Icons from '../Icons';

import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

export interface Props extends RouterLinkProps {
    className?: string;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    iconsContainerClassName?: string;
    linkElementClassName?: string;
    actionsContainerClassName?: string;
    disabled?: boolean;
    spacing?: SpacingTypes;
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
        spacing = 'comfortable',
        ...otherProps
    } = props;

    const isExternalLink = React.useMemo(
        () => (
            typeof to === 'string' && (isValidUrl(to) || to.startsWith('mailto:'))
        ),
        [to],
    );

    return (
        <div
            className={_cs(
                className,
                styles.link,
                spacingToStyleMap[spacing],
                disabled && styles.disabled,
            )}
        >
            {icons && (
                <Icons className={_cs(iconsContainerClassName, styles.icons)}>
                    { icons }
                </Icons>
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
                <Actions className={_cs(actionsContainerClassName, styles.actions)}>
                    { actions }
                    { isExternalLink && <IoChevronForward /> }
                </Actions>
            )}
        </div>
    );
}

export default genericMemo(Link);
