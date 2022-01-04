import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import { TabContext } from '../TabContext';

import styles from './styles.css';

export interface Props extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    ellipsize?: boolean;
}

function TabList(props: Props) {
    const {
        children,
        className,
        ellipsize = false,
        ...otherProps
    } = props;

    const { setEllipsize } = React.useContext(TabContext);

    React.useEffect(() => {
        setEllipsize(ellipsize);
    }, [setEllipsize, ellipsize]);

    return (
        <div
            {...otherProps}
            className={_cs(className, styles.tabList)}
            role="tablist"
        >
            { children }
        </div>
    );
}

export default genericMemo(TabList);
