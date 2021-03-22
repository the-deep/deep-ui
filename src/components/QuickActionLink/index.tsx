import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ButtonLikeLink, { Props as ButtonLikeLinkProps } from '../ButtonLikeLink';

import styles from './styles.css';

export type Props = ButtonLikeLinkProps;

function QuickActionLink(props: Props) {
    const {
        className,
        ...otherProps
    } = props;

    return (
        <ButtonLikeLink
            className={_cs(className, styles.quickActionLink)}
            childrenClassName={styles.children}
            variant="inverted"
            {...otherProps}
        />
    );
}

export default QuickActionLink;
