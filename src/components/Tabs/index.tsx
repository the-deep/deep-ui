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
        onChange: ((key: T | undefined) => void) | undefined;
    } | {
        useHash: true;
        // defaultHash will not override already existing hash
        defaultHash?: string;
        // initialHash will override hash there is already a hash
        initialHash?: string;
    }
);

export function Tabs<T extends TabKey>(props: Props<T>) {
    const {
        children,
        variant = 'primary',
        disabled,
    } = props;

    const [ellipsize, setEllipsize] = React.useState(false);

    // eslint-disable-next-line react/destructuring-assignment
    const defaultHash = props.useHash && isFalsyString(getHashFromBrowser())
        // eslint-disable-next-line react/destructuring-assignment
        ? props.defaultHash
        : undefined;

    // eslint-disable-next-line react/destructuring-assignment
    const hash = useHash(props.useHash ? props.initialHash || defaultHash : undefined);

    // FIXME: destructuring here as props.value and props.onChange cannot be
    // added in dependency list
    // eslint-disable-next-line react/destructuring-assignment
    const onChange = !props.useHash ? props.onChange : undefined;
    // eslint-disable-next-line react/destructuring-assignment
    const value = !props.useHash ? props.value : undefined;

    const contextValue = React.useMemo(() => {
        if (props.useHash) {
            return {
                variant,
                disabled,
                hash,
                useHash: props.useHash,
                ellipsize,
                setEllipsize,
            };
        }

        // Note: following cast is required since we do not have any other method
        // to provide template in the context type
        return {
            variant,
            disabled,
            activeTab: value,
            setActiveTab: onChange as (key: TabKey | undefined) => void | undefined,
            ellipsize,
            setEllipsize,
        };
        // eslint-disable-next-line react/destructuring-assignment
    }, [props.useHash, value, onChange, variant, disabled, hash, ellipsize]);

    return (
        <TabContext.Provider value={contextValue}>
            { children }
        </TabContext.Provider>
    );
}

export default Tabs;
