import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Header, { Props as HeaderProps } from '../Header';
import Footer from '../Footer';

import styles from './styles.css';

// NOTE: these props should never be exposed
export type internalProps = 'containerElementProps' | 'headerElementProps';

export interface Props {
    className?: string;

    // NOTE: not to be exposed by extended components
    containerElementProps?: Omit<React.HTMLProps<HTMLDivElement>, 'className'>;
    headerElementProps?: HeaderProps['elementProps'];

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

    horizontallyCompactContent?: boolean;

    // Is sub container? (i.e. Container with small heading)
    sub?: boolean;
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
        sub = false,
        containerElementProps,
        headingSize,
        footerQuickActions,
        horizontallyCompactContent,
        headerElementProps,
        headingContainerClassName,
    } = props;

    return (
        <div
            className={_cs(
                styles.container,
                sub && styles.sub,
                horizontallyCompactContent && styles.horizontallyCompactContent,
                className,
            )}
            {...containerElementProps}
        >
            {(heading || headerActions || headerIcons) && (
                <Header
                    icons={headerIcons}
                    actions={headerActions}
                    className={_cs(styles.header, headerClassName)}
                    heading={heading}
                    headingSize={headingSize ?? (sub ? 'small' : 'medium')}
                    description={headingDescription}
                    descriptionClassName={headerDescriptionClassName}
                    headingClassName={headingClassName}
                    elementProps={headerElementProps}
                    headingContainerClassName={headingContainerClassName}
                >
                    {headerDescription}
                </Header>
            )}
            <div className={_cs(styles.content, contentClassName)}>
                { children }
            </div>
            {(footerContent || footerActions || footerQuickActions) && (
                <Footer
                    actions={footerActions}
                    className={_cs(styles.footer, footerClassName)}
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
