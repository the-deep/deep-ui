import React, { ReactNode, useState, useCallback } from 'react';

import { _cs } from '@togglecorp/fujs';

import Button, { Props as ButtonProps } from '../Button';
import Modal from '../Modal';

import styles from './styles.css';

export type Props<N> = {
    className?: string;
    cancelButtonClassName?: string;
    confirmButtonClassName?: string;
    cancelLabel?: ReactNode;
    confirmLabel?: ReactNode;
    confirmationHeader?: ReactNode;
    confirmationMessage?: ReactNode;
    onCancel?: () => void;
    onConfirm: () => void;
    /**
    * This props is intended to be used only on storybook to capture snapshots
    */
    confirmationOnMount?: boolean;
} & Omit<ButtonProps<N>, 'onClick'>;

function ConfirmButton<N>(props: Props<N>) {
    const {
        confirmationHeader = 'Confirmation',
        confirmationMessage = 'Are you sure?',
        onConfirm,
        onCancel,
        confirmButtonClassName,
        cancelButtonClassName,
        confirmLabel = 'Yes',
        cancelLabel = 'No',
        className,
        confirmationOnMount,
        ...otherProps
    } = props;

    const [confirmModalVisible, setConfirmModalVisible] = useState(confirmationOnMount);

    const handleConfirmModalShow = useCallback(() => {
        setConfirmModalVisible(true);
    }, []);

    const handleConfirmModalClose = useCallback(() => {
        if (onCancel) {
            onCancel();
        }

        setConfirmModalVisible(false);
    }, [onCancel]);

    const handleConfirmModalConfirm = useCallback(() => {
        onConfirm();
        setConfirmModalVisible(false);
    }, [onConfirm]);

    return (
        <>
            <Button
                className={_cs(styles.confirmButton, className)}
                {...otherProps}
                onClick={handleConfirmModalShow}
            />
            {confirmModalVisible && (
                <Modal
                    heading={confirmationHeader}
                    onCloseButtonClick={handleConfirmModalClose}
                    footerClassName={styles.actionButtonsRow}
                    footer={(
                        <>
                            <Button
                                className={_cs(styles.actionButton, cancelButtonClassName)}
                                name="cancel-button"
                                onClick={handleConfirmModalClose}
                                variant="secondary"
                            >
                                {cancelLabel}
                            </Button>
                            <Button
                                className={_cs(styles.actionButton, confirmButtonClassName)}
                                name="confirm-button"
                                onClick={handleConfirmModalConfirm}
                                autoFocus
                            >
                                {confirmLabel}
                            </Button>
                        </>
                    )}
                >
                    {confirmationMessage}
                </Modal>
            )}
        </>
    );
}

export default ConfirmButton;
