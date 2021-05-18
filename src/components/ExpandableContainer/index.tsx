import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoChevronUpOutline,
    IoChevronDownOutline,
} from 'react-icons/io5';

import useBooleanState from '../../hooks/useBooleanState';
import RawButton from '../RawButton';

import styles from './styles.css';

export interface Props {
    className?: string;
    childrenContainerClassName?: string;
    headerContainerClassName?: string;
    headingClassName?: string;
    descriptionClassName?: string;
    description?: React.ReactNode;
    heading?: React.ReactNode;
    children: React.ReactNode;
    defaultVisibility?: boolean;
    // NOTE: Mount will mount the child even if its not shown
    mount?: boolean;
}

function ExpandableContainer(props: Props) {
    const {
        className,
        childrenContainerClassName,
        headingClassName,
        headerContainerClassName,
        heading,
        description,
        descriptionClassName,
        children,
        defaultVisibility = false,
        mount = true,
    } = props;

    const [
        showContent,,,,
        toggleContentVisibility,
    ] = useBooleanState(defaultVisibility);

    const mountContent = mount || showContent;

    return (
        <div className={_cs(className, styles.expandableContainer)}>
            <RawButton
                name="expandButton"
                className={_cs(styles.sectionHeader, headerContainerClassName)}
                onClick={toggleContentVisibility}
            >
                <div className={styles.leftContainer}>
                    <div className={_cs(styles.heading, headingClassName)}>
                        {heading}
                    </div>
                    {description && (
                        <div className={_cs(styles.description, descriptionClassName)}>
                            {description}
                        </div>
                    )}
                </div>
                {showContent ? (
                    <IoChevronUpOutline className={styles.icon} />
                ) : (
                    <IoChevronDownOutline className={styles.icon} />
                )}
            </RawButton>
            {mountContent && (
                <div
                    className={_cs(
                        childrenContainerClassName,
                        styles.content,
                        showContent && styles.visible,
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export default ExpandableContainer;
