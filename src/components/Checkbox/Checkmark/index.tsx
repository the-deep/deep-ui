import React from 'react';
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdIndeterminateCheckBox,
} from 'react-icons/md';

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

    return (
        <>
            {indeterminate && (
                <MdIndeterminateCheckBox
                    className={className}
                />
            )}
            {value && !indeterminate && (
                <MdCheckBox
                    className={className}
                />
            )}
            {!value && !indeterminate && (
                <MdCheckBoxOutlineBlank
                    className={className}
                />
            )}
        </>
    );
}

export default Checkmark;
