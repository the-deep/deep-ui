import React from 'react';
import { isFalsyString } from '@togglecorp/fujs';

import {
    TabKey,
    TabVariant,
    TabContext,
} from '../TabContext';

import useHash from '../../hooks/useHash';
import { getHashFromBrowser } from '../../utils';

export interface BaseProps {
    children: React.ReactNode;
    variant?: TabVariant;
    disabled?: boolean;
}

export type Props<T extends TabKey> = BaseProps & (
    {
        useHash?: false;
        value: T | undefined;
        onChange: (key: T) => void;
    } | {
        useHash: true;
        // defaultHash will not override already existing hash
        defaultHash?: string;
        // initialHash will override hash there is already a hash
        initialHash?: string;
        value?: never;
        onChange?: never;
    }
);

export function Tabs<T extends TabKey>(props: Props<T>) {
    const {
        children,
        variant = 'primary',
        disabled,
    } = props;

    // eslint-disable-next-line react/destructuring-assignment
    const defaultHash = props.useHash && isFalsyString(getHashFromBrowser())
        // eslint-disable-next-line react/destructuring-assignment
        ? props.defaultHash
        : undefined;

    // eslint-disable-next-line react/destructuring-assignment
    const hash = useHash(props.useHash ? props.initialHash || defaultHash : undefined);

    const contextValue = React.useMemo(() => {
        if (props.useHash) {
            return {
                variant,
                disabled,
                hash,
                useHash: props.useHash,
            };
        }

        // Note: following cast is required since we do not have any other method
        // to provide template in the context type
        return {
            variant,
            disabled,
            activeTab: props.value,
            setActiveTab: props.onChange as (key: TabKey) => void,
        };
        // eslint-disable-next-line react/destructuring-assignment
    }, [props.value, props.onChange, variant, disabled, props.useHash, hash]);

    return (
        <TabContext.Provider value={contextValue}>
            { children }
        </TabContext.Provider>
    );
}

export default Tabs;
