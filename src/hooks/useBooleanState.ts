import React from 'react';

type SetTrueFn = () => void;
type SetFalseFn = () => void;
type SetValueFn = React.Dispatch<React.SetStateAction<boolean>>;

export default function useBooleanState(initialValue: boolean): [
    boolean,
    SetTrueFn,
    SetFalseFn,
    SetValueFn,
] {
    const [value, setValue] = React.useState(initialValue);

    const setTrue = React.useCallback(() => {
        setValue(true);
    }, [setValue]);

    const setFalse = React.useCallback(() => {
        setValue(false);
    }, [setValue]);

    return [value, setTrue, setFalse, setValue];
}
