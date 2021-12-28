import React, { useState } from 'react';

export default function useModalState<T = string>(initialValue: boolean) {
    const [value, setValue] = useState(initialValue);
    const [context, setContext] = useState<T | undefined>(undefined);

    const setTrue = React.useCallback(
        (val?: T) => {
            setValue(true);
            setContext(val);
        },
        [],
    );

    const setFalse = React.useCallback(
        () => {
            setValue(false);
            setContext(undefined);
        },
        [],
    );

    return [value, setTrue, setFalse, context] as const;
}
