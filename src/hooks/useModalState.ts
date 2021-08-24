import React from 'react';

export default function useModalState<T = string>(initialValue: boolean) {
    const [value, setValue] = React.useState(initialValue);
    const [context, setContext] = React.useState<T | undefined>(undefined);

    const setTrue = React.useCallback((val?: T) => {
        setValue(true);
        setContext(val);
    }, [setValue]);

    const setFalse = React.useCallback(() => {
        setValue(false);
        setContext(undefined);
    }, [setValue]);

    return [value, setTrue, setFalse, context] as const;
}
