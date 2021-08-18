import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Element from '../Element';
import Heading, { Props as HeadingProps } from '../Heading';

import styles from './styles.css';

export interface Props {
    className?: string;
    headingClassName?: string;
    descriptionClassName?: string;
    headingContainerClassName?: string;
    iconsContainerClassName?: string;
    actionsContainerClassName?: string;
    heading?: React.ReactNode;
    description?: React.ReactNode;
    inlineDescription?: boolean;
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    headingSize?: HeadingProps['size'];
    children?: React.ReactNode;
    headingSectionClassName?: string;
    childrenContainerClassName?: string;
    elementProps?: Omit<React.HTMLProps<HTMLDivElement>, 'className'>;
}

function Header(props: Props) {
    const {
        className,
        headingClassName,
        descriptionClassName,
        iconsContainerClassName,
        headingContainerClassName,
        actionsContainerClassName,
        inlineDescription,
        heading,
        description,
        actions,
        icons,
        headingSize,
        children,
        headingSectionClassName,
        childrenContainerClassName,
        elementProps,
    } = props;

    const isStringHeading = (typeof heading) === 'string';

    return (
        <header
            className={_cs(
                className,
                styles.header,
                inlineDescription && styles.inlineDescription,
            )}
            {...elementProps}
        >
            <Element
                className={_cs(styles.headingSection, headingSectionClassName)}
                icons={icons}
                iconsContainerClassName={iconsContainerClassName}
                actions={actions}
                actionsContainerClassName={actionsContainerClassName}
                childrenContainerClassName={_cs(
                    styles.headingContainer,
                    headingContainerClassName,
                )}
            >
                <Heading
                    size={headingSize}
                    className={_cs(
                        styles.heading,
                        headingClassName,
                        isStringHeading && styles.stringHeading,
                    )}
                    title={isStringHeading ? (heading as string) : undefined}
                >
                    { heading }
                </Heading>
                {description && (
                    <div
                        className={_cs(
                            styles.description,
                            descriptionClassName,
                            !headingSize && styles.uppercase,
                            headingSize === 'large' && styles.uppercase,
                            headingSize === 'medium' && styles.uppercase,
                        )}
                    >
                        {description}
                    </div>
                )}
            </Element>
            {children && (
                <div className={_cs(styles.content, childrenContainerClassName)}>
                    { children }
                </div>
            )}
        </header>
    );
}

export default Header;
