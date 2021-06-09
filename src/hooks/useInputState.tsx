import React from 'react';

type SetterFn<T> = (oldValue: T) => T;

function useInputState<T>(initialValue: T) {
    const [value, setValue] = React.useState<T>(initialValue);

    type SetValue = React.Dispatch<React.SetStateAction<T>>;
    const setValueSafe: SetValue = React.useCallback((newValueOrSetter) => {
        setValue((oldValue) => (
            // NOTE: explicit typecast is required because of
            // https://github.com/microsoft/TypeScript/issues/37663
            typeof newValueOrSetter === 'function'
                ? (newValueOrSetter as SetterFn<T>)(oldValue)
                : newValueOrSetter
        ));
    }, []);

    return [value, setValueSafe] as const;
}

export default useInputState;
