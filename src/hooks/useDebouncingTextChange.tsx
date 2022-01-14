import React, { useRef, useState, useCallback } from 'react';

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
        e: React.ChangeEvent<T>,
    ) => void,
}) {
    const debouncingRef = useRef<number | undefined>(undefined);
    const [immediateValue, setImmediateValue] = useState(value);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<T>) => {
            const {
                currentTarget: {
                    value: v,
                },
            } = e;
            e.persist();

            if (debouncingRef.current) {
                window.clearTimeout(debouncingRef.current);
                debouncingRef.current = undefined;
            }

            const newValue = v === '' ? undefined : v;
            setImmediateValue(newValue);

            debouncingRef.current = window.setTimeout(
                () => {
                    debouncingRef.current = undefined;

                    // console.warn('Setting on input change', newValue);
                    if (onChange) {
                        onChange(
                            newValue,
                            name,
                            e,
                        );
                    }
                },
                200,
            );
        },
        [name, onChange],
    );

    const handleInputBlur = useCallback(
        (e: React.ChangeEvent<T>) => {
            const {
                currentTarget: {
                    value: v,
                },
            } = e;

            if (!debouncingRef.current) {
                return;
            }

            debouncingRef.current = undefined;
            clearTimeout(debouncingRef.current);

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
            if (debouncingRef.current === undefined) {
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
