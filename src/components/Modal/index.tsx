import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoClose } from 'react-icons/io5';

import ElementFragments from '../ElementFragments';
import Button from '../Button';
import BodyBackdrop from '../BodyBackdrop';

import styles from './styles.css';

interface BaseProps {
    children?: React.ReactNode;
    heading?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    bodyClassName?: string;
    headerClassName?: string;
    footerClassName?: string;
    headerIcons?: React.ReactNode;
    headerActions?: React.ReactNode;
    footerIcons?: React.ReactNode;
    footerActions?: React.ReactNode;
}

export type Props = BaseProps & ({
    hideCloseButton?: false;
    onCloseButtonClick: () => void;
} | {
    hideCloseButton: true;
    onCloseButtonClick?: never;
})

function Modal(props: Props) {
    const {
        heading,
        children,
        footer,

        className,
        headerClassName,
        bodyClassName,
        footerClassName,

        footerActions,
        footerIcons,
        headerActions,
        headerIcons,

        onCloseButtonClick,
        hideCloseButton,
    } = props;

    const shouldHideHeader = hideCloseButton && !heading && !headerActions && !headerIcons;

    return (
        <BodyBackdrop>
            <div
                className={_cs(
                    className,
                    styles.modal,
                )}
            >
                {!shouldHideHeader && (
                    <div className={_cs(styles.modalHeader, headerClassName)}>
                        <ElementFragments
                            icons={headerIcons}
                            actions={(
                                <>
                                    {headerActions}
                                    {!hideCloseButton && (
                                        <Button
                                            className={styles.closeButton}
                                            onClick={onCloseButtonClick}
                                            name="close-modal"
                                            variant="action"
                                        >
                                            <IoClose />
                                        </Button>
                                    )}
                                </>
                            )}
                        >
                            <h2 className={styles.heading}>
                                {heading}
                            </h2>
                        </ElementFragments>
                    </div>
                )}
                <div className={_cs(styles.modalBody, bodyClassName)}>
                    {children}
                </div>
                {(footer || footerIcons || footerActions) && (
                    <div className={_cs(styles.modalFooter, footerClassName)}>
                        <ElementFragments
                            icons={footerIcons}
                            actions={footerActions}
                        >
                            {footer}
                        </ElementFragments>
                    </div>
                )}
            </div>
        </BodyBackdrop>
    );
}

export default Modal;
