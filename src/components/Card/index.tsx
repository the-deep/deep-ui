import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props {
    className?: string;
    children?: React.ReactNode;
    title?: string;
}

function Card(props: Props) {
    const {
        className,
        children,
        title,
    } = props;

    return (
        <div
            className={_cs(styles.card, className)}
            title={title}
        >
            { children }
        </div>
    );
}

export default Card;
