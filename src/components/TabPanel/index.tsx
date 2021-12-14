import React, { useEffect, useState } from 'react';
import { _cs } from '@togglecorp/fujs';

import { TabKey, TabContext } from '../TabContext';
import styles from './styles.css';

export interface Props extends React.HTMLProps<HTMLDivElement> {
    name: TabKey;
    elementRef?: React.Ref<HTMLDivElement>;
    activeClassName?: string;
    retainMount?: boolean;
}

export default function TabPanel(props: Props) {
    const context = React.useContext(TabContext);

    const {
        name,
        elementRef,
        activeClassName,
        retainMount = false,
        className,
        ...otherProps
    } = props;

    let isActive = false;
    const [isLoadedOnce, setIsLoadedOnce] = useState(false);

    if (context.useHash) {
        isActive = context.hash === name;
    } else {
        isActive = context.activeTab === name;
    }

    useEffect(() => {
        setIsLoadedOnce(retainMount ?? false);
    }, [isActive, retainMount]);

    if (!isActive && !isLoadedOnce) {
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
