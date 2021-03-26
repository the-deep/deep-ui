import React from 'react';

export type TabKey = string;

export interface TabContextProps {
    activeTab: TabKey;
    setActiveTab: (key: TabKey) => void;
}

export const TabContext = React.createContext<TabContextProps>({
    activeTab: '',
    setActiveTab: () => { console.warn('setActiveTab called before it was initialized'); },
});
