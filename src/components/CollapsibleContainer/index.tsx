import React from 'react';
import { _cs } from '@togglecorp/fujs';

import {
    IoChevronBackCircle,
    IoChevronForward,
} from 'react-icons/io5';

import Container, { Props as ContainerProps } from '../Container';
import Button from '../Button';
import QuickActionButton from '../QuickActionButton';
import useBooleanState from '../../hooks/useBooleanState';

import styles from './styles.css';

export interface Props extends ContainerProps {
    expandButtonClassName?: string;
    expandButtonContent?: React.ReactNode,
    collapseButtonClassName?: string;
    collapseButtonContent?: React.ReactNode,
    componentRef?: React.MutableRefObject<{
        setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    } | null>;
    collapsedInitially?: boolean;
}

function CollapsibleContainer(props: Props) {
    const {
        className,
        headerActions,
        expandButtonClassName,
        expandButtonContent = (
            <IoChevronForward />
        ),
        collapseButtonClassName,
        collapseButtonContent = (
            <IoChevronBackCircle />
        ),
        componentRef,
        collapsedInitially = false,
        ...otherProps
    } = props;

    const [
        isCollapsed,
        setIsCollapsedTrue,
        setIsCollapsedFalse,
        setIsCollapsed,
    ] = useBooleanState(collapsedInitially);

    React.useEffect(
        () => {
            if (componentRef) {
                componentRef.current = {
                    setIsCollapsed,
                };
            }
        },
        [componentRef, setIsCollapsed],
    );

    return (
        isCollapsed ? (
            <QuickActionButton
                className={expandButtonClassName}
                onClick={setIsCollapsedFalse}
                variant="primary"
                name={undefined}
            >
                {expandButtonContent}
            </QuickActionButton>
        ) : (
            <Container
                className={className}
                headerActions={(
                    <>
                        {headerActions}
                        <Button
                            variant="action"
                            className={_cs(styles.collapseButton, collapseButtonClassName)}
                            childrenContainerClassName={styles.children}
                            onClick={setIsCollapsedTrue}
                            name={undefined}
                        >
                            {collapseButtonContent}
                        </Button>
                    </>
                )}
                {...otherProps}
            />
        )
    );
}

export default CollapsibleContainer;
