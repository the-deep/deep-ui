import React, { useRef, useState } from 'react';

function useDebouncingTextChange<N, T extends HTMLTextAreaElement | HTMLInputElement>({
    name,
    value,
    onChange,
}: {
    name: N,
    value: string | undefined | null,
    onChange?: (
        value: string | undefined,
        name: N,
        e: React.FormEvent<T>,
    ) => void,
}) {
    const debouncingRef = useRef(0);
    const [immediateValue, setImmediateValue] = useState(value);
    const handleInputChange = React.useCallback(
        (e: React.FormEvent<T>) => {
            const {
                currentTarget: {
                    value: v,
                },
            } = e;
            e.persist();

            if (debouncingRef.current) {
                window.clearTimeout(debouncingRef.current);
                debouncingRef.current = 0;
            }

            const newValue = v === '' ? undefined : v;
            setImmediateValue(newValue);

            debouncingRef.current = window.setTimeout(
                () => {
                    // console.warn('Setting on input change', newValue);
                    if (onChange) {
                        onChange(
                            newValue,
                            name,
                            e,
                        );
                    }
                    debouncingRef.current = 0;
                },
                200,
            );
        },
        [name, onChange],
    );

    const handleInputBlur = React.useCallback(
        (e: React.FormEvent<T>) => {
            const {
                currentTarget: {
                    value: v,
                },
            } = e;

            if (debouncingRef.current) {
                clearTimeout(debouncingRef.current);
                debouncingRef.current = 0;
            }

            const newValue = v === '' ? undefined : v;
            // console.warn('Setting on input blur', newValue);

            if (onChange) {
                onChange(
                    newValue,
                    name,
                    e,
                );
            }
        },
        [name, onChange],
    );

    React.useEffect(
        () => {
            if (debouncingRef.current === 0) {
                // console.warn('Setting on prop change', value);
                setImmediateValue(value);
            }
        },
        [value],
    );

    return {
        value: immediateValue,
        onInputChange: handleInputChange,
        onInputBlur: handleInputBlur,
    } as const;
}

export default useDebouncingTextChange;
