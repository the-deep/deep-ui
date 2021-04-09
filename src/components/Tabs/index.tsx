import React from 'react';

import { TabKey, TabContext } from '../TabContext';

export interface Props <T> {
    children: React.ReactNode;
    value: T;
    onChange: (key: T) => void;
}

export function Tabs<T>(props: Props<T>) {
    const {
        children,
        value,
        onChange,
    } = props;

    const contextValue = React.useMemo(() => ({
        // Note: following cast is required since we do not have any other method
        // to provide template in the context type
        activeTab: value as unknown as TabKey,
        setActiveTab: onChange as unknown as (key: TabKey) => void,
    }), [value, onChange]);

    return (
        <TabContext.Provider value={contextValue}>
            { children }
        </TabContext.Provider>
    );
}

export default Tabs;
