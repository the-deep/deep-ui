import React from 'react';

function useInputState<T>(initialValue: T) {
    const [value, setValue] = React.useState<T>(initialValue);

    type SetValue = React.Dispatch<React.SetStateAction<T>>;
    const setValueSafe: SetValue = React.useCallback((newValueOrSetter) => {
        setValue((oldValue) => (
            typeof newValueOrSetter === 'function'
                ? newValueOrSetter(oldValue)
                : newValueOrSetter
        ));
    }, []);

    return [value, setValueSafe] as const;
}

export default useInputState;
