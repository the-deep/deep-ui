import React from 'react';

export type TabKey = string;
export type TabVariant = 'primary' | 'secondary';

export interface TabContextProps {
    activeTab: TabKey;
    variant: TabVariant;
    setActiveTab: (key: TabKey) => void;
}

export const TabContext = React.createContext<TabContextProps>({
    activeTab: '',
    variant: 'primary',
    setActiveTab: () => { console.warn('setActiveTab called before it was initialized'); },
});
