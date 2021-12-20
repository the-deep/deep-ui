import React, { useLayoutEffect, useRef, useState } from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface AutoSizeTextAreaProps extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'ref'> {
    elementRef?: React.RefObject<HTMLTextAreaElement>;
}
function AutoSizeTextArea(props: AutoSizeTextAreaProps) {
    const {
        className,
        elementRef,
        value,
        onChange,
        ...otherProps
    } = props;

    const [initialValue] = useState(value);

    const textAreaContainerRef = useRef<HTMLDivElement>(null);

    const handleInputChange = React.useCallback(
        (e: React.FormEvent<HTMLTextAreaElement>) => {
            const {
                currentTarget: {
                    value: v,
                },
            } = e;

            const elem = textAreaContainerRef?.current;
            if (elem) {
                elem.dataset.replicatedValue = v;
            }

            if (onChange) {
                onChange(e);
            }
        },
        [onChange],
    );

    // NOTE: implemented from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
    useLayoutEffect(
        () => {
            const elem = textAreaContainerRef?.current;
            if (elem) {
                // FIXME: may need to call requestidlecallback
                elem.dataset.replicatedValue = initialValue as string | undefined;
            }
        },
        [initialValue],
    );

    return (
        <div
            className={styles.rawTextAreaContainer}
            ref={textAreaContainerRef}
        >
            <textarea
                className={_cs(styles.rawTextArea, className)}
                ref={elementRef}
                value={value}
                onChange={handleInputChange}
                {...otherProps}
            />
        </div>
    );
}

export default AutoSizeTextArea;
