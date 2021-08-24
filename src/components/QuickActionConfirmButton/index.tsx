import React from 'react';

import QuickActionButton, { Props as QuickActionButtonProps } from '../QuickActionButton';
import useConfirmation, {
    Options as ConfirmOptions,
    ExtraProps as ConfirmExtraProps,
} from '../../hooks/useConfirmation';

// eslint-disable-next-line
export interface Props<N extends string | number | undefined, T = string> extends QuickActionButtonProps<N>, ConfirmOptions<T> {
    confirmModalProps?: ConfirmExtraProps,
}

// eslint-disable-next-line
function QuickActionConfirmButton<N extends string | number | undefined, T = string>(props: Props<N, T>) {
    const {
        confirmButtonActions,
        confirmButtonClassName,
        confirmButtonContent,
        confirmButtonIcons,
        confirmModalProps,
        denyButtonActions,
        denyButtonClassName,
        denyButtonContent,
        denyButtonIcons,
        heading,
        message,
        onConfirm,
        onDeny,
        onResolve,
        showConfirmationInitially,
        ...buttonProps
    } = props;

    const [
        modal,
        onButtonClick,
    ] = useConfirmation({
        showConfirmationInitially,
        onConfirm,
        onDeny,
        onResolve,
        heading,
        message,
        denyButtonActions,
        denyButtonContent,
        denyButtonIcons,
        denyButtonClassName,
        confirmButtonActions,
        confirmButtonContent,
        confirmButtonIcons,
        confirmButtonClassName,
    }, confirmModalProps);

    return (
        <>
            <QuickActionButton
                {...buttonProps}
                name={undefined}
                onClick={onButtonClick}
            />
            { modal }
        </>
    );
}

export default QuickActionConfirmButton;
