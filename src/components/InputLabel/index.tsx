import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../UiModeContext';
import useUiModeClassName from '../../hooks/useUiModeClassName';

import styles from './styles.css';

interface Props {
    className?: string;
    children?: React.ReactNode;
    uiMode?: UiMode;
}

function InputLabel(props: Props) {
    const {
        children,
        className,
        uiMode,
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
                    className,
                )
            }
        >
            { children }
        </div>
    );
}

export default InputLabel;
