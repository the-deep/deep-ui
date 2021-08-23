import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoClose } from 'react-icons/io5';

import Header, { Props as HeaderProps } from '../Header';
import Footer from '../Footer';
import Button from '../Button';
import BodyBackdrop from '../BodyBackdrop';

import { SpacingTypes } from '../../types';

import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

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
    spacing?: SpacingTypes;
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
        spacing = 'comfortable',
    } = props;

    const shouldHideHeader = hideCloseButton && !heading && !headerActions && !headerIcons;

    return (
        <BodyBackdrop>
            <div
                className={_cs(
                    styles.modal,
                    spacingToStyleMap[spacing],
                    className,
                )}
            >
                {!shouldHideHeader && (
                    <Header
                        spacing={spacing}
                        className={_cs(styles.modalHeader, headerClassName)}
                        heading={heading}
                        headingSectionClassName={headingSectionClassName}
                        childrenContainerClassName={headingChildrenClassName}
                        headingSize={headingSize}
                        description={headingDescription}
                        descriptionClassName={headerDescriptionClassName}
                        headingClassName={headingClassName}
                        headingContainerClassName={headingContainerClassName}
                        inlineHeadingDescription={inlineHeadingDescription}
                        actions={(
                            <>
                                {headerActions}
                                {!hideCloseButton && (
                                    <Button
                                        className={closeButtonClassName}
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
                        spacing={spacing}
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
