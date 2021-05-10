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
    } = props;

    return (
        <header className={_cs(className, styles.header)}>
            <ElementFragments
                icons={icons}
                iconsContainerClassName={iconsContainerClassName}
                actions={actions}
                actionsContainerClassName={actionsContainerClassName}
                childrenContainerClassName={_cs(styles.headingContainer, headingContainerClassName)}
            >
                <Heading
                    size={headingSize}
                    className={_cs(styles.heading, headingClassName)}
                >
                    { heading }
                </Heading>
                {description && (
                    <p className={_cs(styles.description, descriptionClassName)}>
                        {description}
                    </p>
                )}
            </ElementFragments>
        </header>
    );
}

export default Header;
