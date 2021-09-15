import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoChevronUpOutline,
    IoChevronDownOutline,
} from 'react-icons/io5';

import { SpacingTypes } from '../../types';
import Container, { Props as ContainerProps } from '../Container';
import Button from '../Button';

import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

export interface Props<T> extends ContainerProps {
    // NOTE: content will always be mounted if its not shown (in collapsed state)
    contentAlwaysMounted?: boolean;
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
        contentAlwaysMounted,
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
        spacing = 'comfortable',
        withoutExternalPadding,
        ...otherProps
    } = props;

    const mountContent = contentAlwaysMounted || expanded;

    const toggleContentVisibility = useCallback(
        () => {
            onExpansionChange(!expanded, name);
        },
        [name, expanded, onExpansionChange],
    );

    return (
        <Container
            {...otherProps}
            withoutExternalPadding={withoutExternalPadding}
            className={_cs(
                styles.expandableContainer,
                spacingToStyleMap[spacing],
                withoutExternalPadding && styles.withoutExternalPadding,
                expanded && styles.expanded,
                className,
            )}
            headerElementProps={
                expansionTriggerArea === 'header' && !disabled
                    ? ({ onClick: toggleContentVisibility })
                    : undefined
            }
            headerClassName={_cs(
                styles.header,
                headerClassName,
                expansionTriggerArea === 'header' && !disabled && styles.clickableHeader,
            )}
            headingContainerClassName={_cs(styles.headingContainer, headingContainerClassName)}
            headingClassName={_cs(styles.heading, headingClassName)}
            heading={heading}
            headingSize={headingSize ?? 'small'}
            spacing={spacing}
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
                !expanded && styles.hidden,
            )}
        >
            {mountContent && children}
        </Container>
    );
}

export default ControlledExpandableContainer;
