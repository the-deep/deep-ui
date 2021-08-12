import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoChevronUpOutline,
    IoChevronDownOutline,
} from 'react-icons/io5';

import useBooleanState from '../../hooks/useBooleanState';
import Container, { Props as ContainerProps } from '../Container';
import Button from '../Button';

import styles from './styles.css';

export interface Props extends ContainerProps {
    defaultVisibility?: boolean;
    // NOTE: Mount will mount the child even if its not shown
    alwaysMountContent?: boolean;
    expansionTriggerArea?: 'header' | 'arrow';
    disabled?: boolean;
    expansionButtonClassName?: string;
}

function ExpandableContainer(props: Props) {
    const {
        className,
        heading,
        children,
        headingDescription,
        defaultVisibility = false,
        alwaysMountContent = true,
        headerActions,
        headingContainerClassName,
        headingClassName,
        contentClassName,
        headerClassName,
        headingSize,
        sub,
        disabled = false,
        expansionTriggerArea = 'header',
        expansionButtonClassName,
        ...otherProps
    } = props;

    const [
        showContent,,,,
        toggleContentVisibility,
    ] = useBooleanState(defaultVisibility);

    const mountContent = alwaysMountContent || showContent;

    return (
        <Container
            {...otherProps}
            className={_cs(
                className,
                styles.expandableContainer,
                sub && styles.sub,
            )}
            sub={sub}
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
                        {showContent ? (
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
                showContent && styles.visible,
            )}
        >
            {mountContent && children}
        </Container>
    );
}

export default ExpandableContainer;
