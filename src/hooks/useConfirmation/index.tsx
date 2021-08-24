import React from 'react';

import useModalState from '../useModalState';
import Modal, { Props as ModalProps } from '../../components/Modal';
import Button from '../../components/Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeElementsWithUndefinedValue<T extends Record<string, any>>(obj: T | undefined) {
    if (obj === undefined) {
        return obj;
    }

    const newObj = { ...obj };

    Object.keys(newObj).forEach((key) => {
        if (obj[key] === undefined) {
            delete newObj[key];
        }
    });

    return newObj;
}

export interface Options<T> {
    showConfirmationInitially?: boolean;
    onConfirm?: (ctx: T | undefined) => void;
    onDeny?: (ctx: T | undefined) => void;
    onResolve?: (hasConfirmed: boolean, ctx: T | undefined) => void;

    heading?: React.ReactNode;
    message?: React.ReactNode;

    denyButtonIcons?: React.ReactNode;
    denyButtonContent?: React.ReactNode;
    denyButtonActions?: React.ReactNode;
    denyButtonClassName?: string;

    confirmButtonIcons?: React.ReactNode;
    confirmButtonContent?: React.ReactNode;
    confirmButtonActions?: React.ReactNode;
    confirmButtonClassName?: string;
}

export type ExtraProps = Omit<ModalProps, 'onCloseButtonClick' | 'heading'>;

const defaultOptions = {
    message: 'Are you sure?',
    heading: 'Confirmation',
    confirmButtonContent: 'Yes',
    denyButtonContent: 'No',
};

function useConfirmation<T = string>(options?: Options<T>, extraProps?: ExtraProps) {
    const {
        showConfirmationInitially = false,
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
    } = {
        ...defaultOptions,
        ...removeElementsWithUndefinedValue(options),
    };

    const [
        showModal,
        setShowModalTrue,
        setShowModalFalse,
        ctx,
    ] = useModalState<T>(showConfirmationInitially);

    const handleCancelButtonClick = React.useCallback(() => {
        setShowModalFalse();
        if (onDeny) {
            onDeny(ctx);
        }

        if (onResolve) {
            onResolve(false, ctx);
        }
    }, [setShowModalFalse, onDeny, onResolve, ctx]);

    const handleConfirmButtonClick = React.useCallback(() => {
        setShowModalFalse();
        if (onConfirm) {
            onConfirm(ctx);
        }

        if (onResolve) {
            onResolve(true, ctx);
        }
    }, [setShowModalFalse, onResolve, onConfirm, ctx]);

    const modal = React.useMemo(() => {
        if (!showModal) {
            return null;
        }

        const {
            footerActions,
            ...modalProps
        } = extraProps ?? {};

        return (
            <Modal
                {...modalProps}
                heading={heading}
                hideCloseButton
                // onCloseButtonClick={handleCancelButtonClick}
                footerActions={(
                    <>
                        { footerActions }
                        <Button
                            actions={denyButtonActions}
                            className={denyButtonClassName}
                            icons={denyButtonIcons}
                            name="deny-button"
                            onClick={handleCancelButtonClick}
                            variant="secondary"
                        >
                            {denyButtonContent}
                        </Button>
                        <Button
                            actions={confirmButtonActions}
                            autoFocus
                            className={confirmButtonClassName}
                            icons={confirmButtonIcons}
                            name="confirm-button"
                            onClick={handleConfirmButtonClick}
                        >
                            {confirmButtonContent}
                        </Button>
                    </>
                )}
            >
                {message}
            </Modal>
        );
    }, [
        showModal,
        extraProps,
        denyButtonIcons,
        denyButtonActions,
        denyButtonContent,
        confirmButtonActions,
        confirmButtonContent,
        confirmButtonIcons,
        message,
        heading,
        handleCancelButtonClick,
        handleConfirmButtonClick,
        denyButtonClassName,
        confirmButtonClassName,
    ]);

    return [modal, setShowModalTrue] as const;
}

export default useConfirmation;
