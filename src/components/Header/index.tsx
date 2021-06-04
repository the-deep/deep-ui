import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ElementFragments from '../ElementFragments';
import Heading from '../Heading';

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
    icons?: React.ReactNode;
    actions?: React.ReactNode;
    headingSize?: 'extraSmall' | 'small' | 'medium' | 'large';
    children?: React.ReactNode;
    headingSectionClassName?: string;
    childrenContainerClassName?: string;
}

function Header(props: Props) {
    const {
        className,
        headingClassName,
        descriptionClassName,
        iconsContainerClassName,
        headingContainerClassName,
        actionsContainerClassName,
        heading,
        description,
        actions,
        icons,
        headingSize,
        children,
        headingSectionClassName,
        childrenContainerClassName,
    } = props;

    return (
        <header className={_cs(className, styles.header)}>
            <div className={_cs(styles.headingSection, headingSectionClassName)}>
                <ElementFragments
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
                        className={_cs(styles.heading, headingClassName)}
                    >
                        { heading }
                    </Heading>
                    {description && (
                        <div className={_cs(styles.description, descriptionClassName)}>
                            {description}
                        </div>
                    )}
                </ElementFragments>
            </div>
            <div className={_cs(styles.content, childrenContainerClassName)}>
                { children }
            </div>
        </header>
    );
}

export default Header;
