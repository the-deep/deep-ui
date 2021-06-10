import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoClose } from 'react-icons/io5';

import Header, { Props as HeaderProps } from '../Header';
import Footer from '../Footer';
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
    headingSize?: HeaderProps['headingSize'];
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
                    <Header
                        className={_cs(styles.modalHeader, headerClassName)}
                        heading={heading}
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
                    />
                )}
                <div className={_cs(styles.modalBody, bodyClassName)}>
                    {children}
                </div>
                {(footer || footerIcons || footerActions) && (
                    <Footer
                        className={_cs(styles.modalFooter, footerClassName)}
                        icons={footerIcons}
                        actions={footerActions}
                    >
                        {footer}
                    </Footer>
                )}
            </div>
        </BodyBackdrop>
    );
}

export default Modal;
