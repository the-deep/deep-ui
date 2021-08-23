import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Header, { Props as HeaderProps } from '../Header';
import Footer from '../Footer';
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
    footerActionsContainerClassName?: string;
    footerIconsContainerClassName?: string;
    footerQuickActionsContainerClassName?: string;

    autoFocus?: boolean;
    spacing?: SpacingTypes;
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
                className,
                autoFocus && styles.autoFocused,
                spacingToStyleMap[spacing],
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
                    descriptionClassName={_cs(styles.headerDescription, headerDescriptionClassName)}
                    headingClassName={headingClassName}
                    elementProps={headerElementProps}
                    headingContainerClassName={headingContainerClassName}
                    inlineHeadingDescription={inlineHeadingDescription}
                    spacing={spacing}
                >
                    {headerDescription}
                </Header>
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

export default Container;
