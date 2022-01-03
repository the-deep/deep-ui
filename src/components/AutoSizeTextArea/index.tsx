import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { genericMemo } from '../../utils';

import styles from './styles.css';

interface AutoSizeTextAreaProps extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'ref'> {
    elementRef?: React.RefObject<HTMLTextAreaElement>;
}

function AutoSizeTextArea(props: AutoSizeTextAreaProps) {
    const {
        className,
        elementRef,
        value,
        ...otherProps
    } = props;

    return (
        <div className={_cs(styles.autoSizeTextArea, className)}>
            <div className={styles.preview}>
                {value}
            </div>
            <textarea
                className={styles.input}
                ref={elementRef}
                value={value}
                {...otherProps}
            />
        </div>
    );
}

export default genericMemo(AutoSizeTextArea);
