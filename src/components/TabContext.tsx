import React from 'react';

export type TabKey = string;
export type TabVariant = 'primary' | 'secondary' | 'step';

interface BaseTabContextProps {
    variant?: TabVariant;
    disabled?: boolean;
    ellipsize?: boolean;
    setEllipsize: (ellipsize: boolean) => void;
}

export type TabContextProps = BaseTabContextProps & (
    {
        useHash?: false;
        activeTab: TabKey | undefined;
        setActiveTab: (key: TabKey) => void;
    } | {
        useHash: true;
        hash: string | undefined;
    }
);

export const TabContext = React.createContext<TabContextProps>({
    disabled: false,
    activeTab: undefined,
    variant: 'primary',
    setActiveTab: () => { console.warn('setActiveTab called before it was initialized'); },
    setEllipsize: () => { console.warn('setEllipsize called before it was initialize'); },
});
