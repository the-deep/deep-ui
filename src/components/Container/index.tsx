import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Header, { Props as HeaderProps } from '../Header';
import Footer from '../Footer';

import styles from './styles.css';

export interface Props {
    className?: string;

    // Note: not to be exposed by extended components
    containerElementProps?: Omit<React.HTMLProps<HTMLDivElement>, 'className'>;
    heading?: React.ReactNode;
    headerIcons?: React.ReactNode;
    headerActions?: React.ReactNode;
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
    } = props;

    return (
        <div
            className={_cs(
                styles.container,
                sub && styles.sub,
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
                    headingSize={headingSize ?? sub ? 'medium' : 'large'}
                    description={headerDescription}
                    descriptionClassName={headerDescriptionClassName}
                    headingClassName={headingClassName}
                />
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
