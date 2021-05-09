import React from 'react';

import Button, { Props as ButtonProps } from '../Button';
import useConfirmation, {
    Options as ConfirmOptions,
    ExtraProps as ConfirmExtraProps,
} from '../../hooks/useConfirmation';

export interface Props<
    N extends string | number | undefined
> extends ButtonProps<N>, ConfirmOptions {
    confirmModalProps?: ConfirmExtraProps,
}

function QuickActionConfirmButton<N extends string | number | undefined>(props: Props<N>) {
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
            <Button
                {...buttonProps}
                name={undefined}
                onClick={onButtonClick}
            />
            { modal }
        </>
    );
}

export default QuickActionConfirmButton;
