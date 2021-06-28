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
    headingDescription?: React.ReactNode;
    headingContainerClassName?: HeaderProps['headingContainerClassName'];
    headingClassName?: string;
    className?: string;
    bodyClassName?: string;
    headerDescriptionClassName?: string;
    headerClassName?: string;
    footerClassName?: string;
    headingSectionClassName?: string;
    closeButtonClassName?: string;
    headingChildrenClassName?: string;
    inlineHeadingDescription?: boolean;
    headerIcons?: React.ReactNode;
    headerActions?: React.ReactNode;
    footerIcons?: React.ReactNode;
    footerActions?: React.ReactNode;
    footerQuickActions?: React.ReactNode;
    headingSize?: HeaderProps['headingSize'];

    footerContentClassName?: string;
    footerActionsContainerClassName?: string;
    footerIconsContainerClassName?: string;
    footerQuickActionsContainerClassName?: string;
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
        headingSectionClassName,
        headingDescription,
        headingChildrenClassName,
        headerDescriptionClassName,
        closeButtonClassName,
        footerIconsContainerClassName,
        footerActionsContainerClassName,
        footerContentClassName,
        footerQuickActionsContainerClassName,
        headingClassName,
        inlineHeadingDescription,
        headingContainerClassName,

        footerActions,
        footerIcons,
        headerActions,
        headerIcons,
        footerQuickActions,

        onCloseButtonClick,
        hideCloseButton,
        headingSize,
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
                        headingSectionClassName={headingSectionClassName}
                        childrenContainerClassName={headingChildrenClassName}
                        headingSize={headingSize}
                        description={headingDescription}
                        descriptionClassName={headerDescriptionClassName}
                        headingClassName={headingClassName}
                        headingContainerClassName={headingContainerClassName}
                        inlineDescription={inlineHeadingDescription}
                        actions={(
                            <>
                                {headerActions}
                                {!hideCloseButton && (
                                    <Button
                                        className={_cs(styles.closeButton, closeButtonClassName)}
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
                {(footer || footerIcons || footerActions || footerQuickActions) && (
                    <Footer
                        className={_cs(styles.modalFooter, footerClassName)}
                        icons={footerIcons}
                        actions={footerActions}
                        iconsContainerClassName={footerIconsContainerClassName}
                        childrenContainerClassName={footerContentClassName}
                        actionsContainerClassName={footerActionsContainerClassName}
                        quickActionsContainerClassName={footerQuickActionsContainerClassName}
                        quickActions={footerQuickActions}
                    >
                        {footer}
                    </Footer>
                )}
            </div>
        </BodyBackdrop>
    );
}

export default Modal;
