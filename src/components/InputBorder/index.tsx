import React, { memo } from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../UiModeContext';
import useUiModeClassName from '../../hooks/useUiModeClassName';

import styles from './styles.css';

interface Props {
    className?: string;
    uiMode?: UiMode;
    errored?: boolean;
}

function InputBorder(props: Props) {
    const {
        className,
        uiMode,
        errored,
    } = props;

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    return (
        <div
            className={
                _cs(
                    styles.inputBorder,
                    uiModeClassName,
                    errored && styles.errored,
                    className,
                )
            }
        />
    );
}

export default memo(InputBorder);
