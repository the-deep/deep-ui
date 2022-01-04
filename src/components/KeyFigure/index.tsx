import React from 'react';
import { _cs } from '@togglecorp/fujs';

import TextOutput from '../TextOutput';
import { genericMemo } from '../../utils';

import styles from './styles.css';

export interface Props {
    className?: string;
    label: string;
    value?: number;
}

function KeyFigure(props: Props) {
    const {
        className,
        label,
        value,
    } = props;

    return (
        <TextOutput
            className={_cs(styles.keyFigure, className)}
            value={value}
            valueType="number"
            valueContainerClassName={styles.value}
            descriptionContainerClassName={styles.description}
            description={label}
        />
    );
}

export default genericMemo(KeyFigure);
