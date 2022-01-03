import React, { useEffect, useRef } from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import { TabKey, TabContext } from '../TabContext';
import styles from './styles.css';

export interface Props extends React.HTMLProps<HTMLDivElement> {
    name: TabKey;
    elementRef?: React.Ref<HTMLDivElement>;
    activeClassName?: string;
    retainMount?: 'eager' | 'lazy' | 'none';
}

function TabPanel(props: Props) {
    const context = React.useContext(TabContext);

    const {
        name,
        elementRef,
        activeClassName,
        retainMount = 'none',
        className,
        ...otherProps
    } = props;

    const isLoadedOnce = useRef(false);

    let isActive = false;
    if (context.useHash) {
        isActive = context.hash === name;
    } else {
        isActive = context.activeTab === name;
    }

    useEffect(() => {
        if (isActive) {
            isLoadedOnce.current = true;
        }
    }, [isActive, retainMount]);

    if (retainMount === 'none' && !isActive) {
        return null;
    }

    if (retainMount === 'lazy' && !isLoadedOnce.current && !isActive) {
        return null;
    }

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            className={_cs(
                styles.tabPanel,
                className,
                isActive && activeClassName,
                !isActive && styles.hide,
            )}
            role="tabpanel"
            ref={elementRef}
        />
    );
}

export default genericMemo(TabPanel);
