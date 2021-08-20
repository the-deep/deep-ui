import React, { memo } from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../UiModeContext';
import useUiModeClassName from '../../hooks/useUiModeClassName';

import styles from './styles.css';

export interface Props {
    className?: string;
    children?: React.ReactNode;
    uiMode?: UiMode;
    disabled?: boolean;
}

function InputLabel(props: Props) {
    const {
        children,
        className,
        uiMode,
        disabled,
    } = props;

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    if (!children) {
        return null;
    }

    return (
        <div
            className={
                _cs(
                    styles.inputLabel,
                    uiModeClassName,
                    disabled && styles.disabled,
                    className,
                )
            }
        >
            { children }
        </div>
    );
}

export default memo(InputLabel);
