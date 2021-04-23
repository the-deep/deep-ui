import React from 'react';

import { TabKey, TabVariant, TabContext } from '../TabContext';

export interface Props <T> {
    children: React.ReactNode;
    value: T;
    onChange: (key: T) => void;
    variant?: TabVariant;
}

export function Tabs<T>(props: Props<T>) {
    const {
        children,
        value,
        onChange,
        variant = 'primary',
    } = props;

    const contextValue = React.useMemo(() => ({
        // Note: following cast is required since we do not have any other method
        // to provide template in the context type
        variant,
        activeTab: value as unknown as TabKey,
        setActiveTab: onChange as unknown as (key: TabKey) => void,
    }), [value, onChange, variant]);

    return (
        <TabContext.Provider value={contextValue}>
            { children }
        </TabContext.Provider>
    );
}

export default Tabs;
