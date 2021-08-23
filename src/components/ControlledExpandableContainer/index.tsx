import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoChevronUpOutline,
    IoChevronDownOutline,
} from 'react-icons/io5';

import Container, { Props as ContainerProps } from '../Container';
import Button from '../Button';

import styles from './styles.css';

export interface Props<T> extends ContainerProps {
    // NOTE: Mount will mount the child even if its not shown
    alwaysMountContent?: boolean;
    disabled?: boolean;
    expansionButtonClassName?: string;
    expansionTriggerArea?: 'header' | 'arrow';

    name: T,
    expanded?: boolean;
    onExpansionChange: (value: boolean, name: T) => void;
}

function ControlledExpandableContainer<T>(props: Props<T>) {
    const {
        className,
        heading,
        children,
        headingDescription,
        alwaysMountContent = true,
        headerActions,
        headingContainerClassName,
        headingClassName,
        contentClassName,
        headerClassName,
        headingSize,
        disabled = false,
        expansionButtonClassName,
        expanded,
        name,
        onExpansionChange,
        expansionTriggerArea = 'header',
        ...otherProps
    } = props;

    const mountContent = alwaysMountContent || expanded;

    const toggleContentVisibility = useCallback(
        () => {
            onExpansionChange(!expanded, name);
        },
        [name, expanded, onExpansionChange],
    );

    return (
        <Container
            {...otherProps}
            className={_cs(
                className,
                styles.expandableContainer,
            )}
            headerElementProps={{
                onClick: expansionTriggerArea === 'header' && !disabled
                    ? toggleContentVisibility
                    : undefined,
            }}
            headerClassName={_cs(
                styles.header,
                headerClassName,
                expansionTriggerArea === 'header' && !disabled && styles.clickableHeader,
            )}
            headingContainerClassName={_cs(styles.headingContainer, headingContainerClassName)}
            headingClassName={_cs(styles.heading, headingClassName)}
            heading={heading}
            headingSize={headingSize ?? 'small'}
            headerActions={(
                <>
                    {headerActions}
                    <Button
                        className={_cs(styles.expandButton, expansionButtonClassName)}
                        name={undefined}
                        onClick={expansionTriggerArea === 'arrow' ? toggleContentVisibility : undefined}
                        variant="action"
                        disabled={disabled}
                    >
                        {expanded ? (
                            <IoChevronUpOutline className={styles.icon} />
                        ) : (
                            <IoChevronDownOutline className={styles.icon} />
                        )}
                    </Button>
                </>
            )}
            headingDescription={headingDescription}
            contentClassName={_cs(
                contentClassName,
                styles.content,
                expanded && styles.visible,
            )}
        >
            {mountContent && children}
        </Container>
    );
}

export default ControlledExpandableContainer;
