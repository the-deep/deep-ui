import React from 'react';
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdIndeterminateCheckBox,
} from 'react-icons/md';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../../UiModeContext';

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

    const iconClassName = _cs(
        className,
    );

    return (
        <>
            {indeterminate && (
                <MdIndeterminateCheckBox
                    className={iconClassName}
                />
            )}
            {value && !indeterminate && (
                <MdCheckBox
                    className={iconClassName}
                />
            )}
            {!value && !indeterminate && (
                <MdCheckBoxOutlineBlank
                    className={iconClassName}
                />
            )}
        </>
    );
}

export default Checkmark;
