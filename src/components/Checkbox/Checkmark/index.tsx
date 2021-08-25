import React from 'react';
import {
    IoCheckbox,
    IoSquare,
    IoSquareOutline,
} from 'react-icons/io5';

import { UiMode } from '../../UiModeContext';
import { genericMemo } from '../../../utils';

export interface CheckmarkProps {
    className?: string;
    value: boolean | undefined | null;
    indeterminate?: boolean;
    uiMode?: UiMode;
}

function Checkmark(props: CheckmarkProps) {
    const {
        className,
        indeterminate,
        value,
    } = props;

    return (
        <>
            {indeterminate && (
                <IoSquare
                    className={className}
                />
            )}
            {value && !indeterminate && (
                <IoCheckbox
                    className={className}
                />
            )}
            {!value && !indeterminate && (
                <IoSquareOutline
                    className={className}
                />
            )}
        </>
    );
}

export default genericMemo(Checkmark);
