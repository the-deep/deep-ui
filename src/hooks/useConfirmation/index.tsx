import React from 'react';

import useBooleanState from '../useBooleanState';
import Modal, { Props as ModalProps } from '../../components/Modal';
import Button, { Props as ButtonProps } from '../../components/Button';

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

export interface Options {
    showConfirmationInitially: boolean;
    onConfirm?: () => void;
    onDeny?: () => void;
    onResolve?: (hasConfirmed: boolean) => void;

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

const defaultOptions: Partial<Options> = {
    message: 'Are you sure?',
    heading: 'Confirmation',
    confirmButtonContent: 'Yes',
    denyButtonContent: 'No',
};

function useConfirmation(options?: Options, extraProps?: ExtraProps): [
    React.ReactNode,
    ButtonProps<string | undefined>['onClick'],
] {
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
    ] = useBooleanState(showConfirmationInitially);

    const handleCancelButtonClick = React.useCallback(() => {
        setShowModalFalse();
        if (onDeny) {
            onDeny();
        }

        if (onResolve) {
            onResolve(false);
        }
    }, [setShowModalFalse, onDeny, onResolve]);

    const handleConfirmButtonClick = React.useCallback(() => {
        setShowModalFalse();
        if (onConfirm) {
            onConfirm();
        }

        if (onResolve) {
            onResolve(true);
        }
    }, [setShowModalFalse, onResolve, onConfirm]);

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

    return [modal, setShowModalTrue];
}

export default useConfirmation;
