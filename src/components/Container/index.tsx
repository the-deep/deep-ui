import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Header, { Props as HeaderProps } from '../Header';
import Footer from '../Footer';
import Border, { Props as BorderProps } from '../Border';
import { SpacingTypes } from '../../types';
import { genericMemo } from '../../utils';

import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

export type internalProps = 'containerElementProps' | 'headerElementProps';

export interface Props {
    className?: string;

    containerElementProps?: Omit<React.HTMLProps<HTMLDivElement>, 'className'>;
    headerElementProps?: HeaderProps['elementProps'];
    elementRef?: React.RefObject<HTMLDivElement>;

    heading?: React.ReactNode;
    headerIcons?: React.ReactNode;
    headerActions?: React.ReactNode;
    headingDescription?: React.ReactNode;
    headerDescription?: React.ReactNode;
    headerClassName?: string;
    headerIconsContainerClassName?: string;
    headerActionsContainerClassName?: string;
    headerDescriptionClassName?: string;
    headingClassName?: string;
    children?: React.ReactNode;
    contentClassName?: string;
    footerClassName?: string;
    footerContent?: React.ReactNode;
    footerIcons?: React.ReactNode;
    footerActions?: React.ReactNode;
    footerQuickActions?: React.ReactNode;
    headingSize?: HeaderProps['headingSize'];
    headingContainerClassName?: HeaderProps['headingContainerClassName'];
    inlineHeadingDescription?: boolean;
    footerContentClassName?: string;
    headingSectionClassName?: string;
    footerActionsContainerClassName?: string;
    footerIconsContainerClassName?: string;
    footerQuickActionsContainerClassName?: string;
    autoFocus?: boolean;
    spacing?: SpacingTypes;
    borderBelowHeader?: boolean;
    borderBelowHeaderWidth?: BorderProps['width'];
    borderBelowHeaderClassName?: string;
    ellipsizeHeading?: boolean;
    withoutExternalPadding?: boolean;
    visibleOverflow?: boolean;
}

function Container(props: Props) {
    const {
        className,
        heading,
        children,
        headerActions,
        headerIcons,
        headingDescription,
        headerDescription,
        headerIconsContainerClassName,
        headerActionsContainerClassName,
        headerDescriptionClassName,
        headerClassName,
        headingClassName,
        contentClassName,
        footerContent,
        footerIcons,
        footerActions,
        footerClassName,
        footerIconsContainerClassName,
        footerActionsContainerClassName,
        headingSectionClassName,
        footerContentClassName,
        footerQuickActionsContainerClassName,
        containerElementProps,
        headingSize,
        footerQuickActions,
        headerElementProps,
        elementRef: elementRefFromProps,
        headingContainerClassName,
        inlineHeadingDescription,
        autoFocus,
        spacing = 'comfortable',
        borderBelowHeader,
        borderBelowHeaderWidth,
        borderBelowHeaderClassName,
        ellipsizeHeading,
        withoutExternalPadding,
        visibleOverflow,
    } = props;

    const internalRef = React.useRef<HTMLDivElement>(null);
    const elementRef = elementRefFromProps ?? internalRef;

    React.useEffect(() => {
        if (autoFocus && elementRef.current) {
            elementRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [autoFocus, elementRef]);

    return (
        <div
            {...containerElementProps}
            className={_cs(
                styles.container,
                autoFocus && styles.autoFocused,
                spacingToStyleMap[spacing],
                withoutExternalPadding && styles.withoutExternalPadding,
                visibleOverflow && styles.visibleOverflow,
                className,
            )}
            ref={elementRef}
        >
            {(heading || headerActions || headerIcons) && (
                <Header
                    icons={headerIcons}
                    actions={headerActions}
                    className={_cs(styles.header, headerClassName)}
                    heading={heading}
                    headingSize={headingSize}
                    description={headingDescription}
                    iconsContainerClassName={headerIconsContainerClassName}
                    actionsContainerClassName={headerActionsContainerClassName}
                    descriptionClassName={_cs(styles.headerDescription, headerDescriptionClassName)}
                    headingSectionClassName={headingSectionClassName}
                    headingClassName={headingClassName}
                    elementProps={headerElementProps}
                    headingContainerClassName={headingContainerClassName}
                    inlineHeadingDescription={inlineHeadingDescription}
                    spacing={spacing}
                    ellipsizeHeading={ellipsizeHeading}
                >
                    {headerDescription}
                </Header>
            )}
            {borderBelowHeader && (
                <Border
                    extendToSpacing
                    spacing={spacing}
                    className={borderBelowHeaderClassName}
                    width={borderBelowHeaderWidth}
                    inline
                />
            )}
            <div className={_cs(styles.content, contentClassName)}>
                { children }
            </div>
            {(footerIcons || footerContent || footerActions || footerQuickActions) && (
                <Footer
                    actions={footerActions}
                    className={_cs(styles.footer, footerClassName)}
                    iconsContainerClassName={footerIconsContainerClassName}
                    childrenContainerClassName={footerContentClassName}
                    actionsContainerClassName={footerActionsContainerClassName}
                    quickActionsContainerClassName={footerQuickActionsContainerClassName}
                    quickActions={footerQuickActions}
                    icons={footerIcons}
                >
                    { footerContent }
                </Footer>
            )}
        </div>
    );
}

export default genericMemo(Container);
