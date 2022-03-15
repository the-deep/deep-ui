import React from 'react';
import {
    addSeparator,
    isFalsy,
    isTruthy,
    isDefined,
    formattedNormalize,
    _cs,
    Lang,
} from '@togglecorp/fujs';

import { genericMemo } from '../../utils';

import styles from './styles.css';

export interface Props {
    className?: string;
    /**
     * Text to show if invalid value is supplied
     */
    invalidText?: React.ReactNode;
    /**
     * Normalize numer into Millions(M), Billion(B)
     */
    normal?: boolean;
    /**
     * Numer of digits after decimal point. Rounding is also applied.
     */
    precision?: number | 'auto';
    /**
     * Prefix the output with certain string. Eg. $
     */
    prefix?: string,
    /**
     * Specify which separator to use for thousands
     */
    separator?: string | null,
    /**
     * Show both positive and negative sign for number
     */
    showSign?: boolean,
    /**
     * Prefix the output with certain string. Eg. %
     */
    suffix?: string,
    /**
     * The value of the numeral
     */
    value: number | undefined | null,

    valueModifier?: (value: string | undefined) => React.ReactNode,
    signClassName?: string;
    prefixClassName?: string;
    numberClassName?: string;
    normalizationSuffixClassName?: string;
    suffixClassName?: string;

    tooltip?: number | string | null | undefined;

    normalizer?: typeof formattedNormalize;
}

/**
 * NumberOutput component for formatted numbers
 */
function NumberOutput(props: Props) {
    const {
        className,
        invalidText = '-',
        normal,
        precision,
        prefix,
        separator = ',',
        showSign,
        suffix,
        valueModifier,
        value,
        signClassName,
        prefixClassName,
        numberClassName,
        normalizationSuffixClassName,
        suffixClassName,
        tooltip,
        normalizer = formattedNormalize,
    } = props;

    const [number, normalizationSuffix] = React.useMemo(() => {
        if (isFalsy(value)) {
            return [];
        }

        // Only use absolute part if showSign is true (sign are added later)
        let num = isTruthy(showSign) ? Math.abs(value) : value;

        // Get normalize-suffix and reduce the number
        let nSuffix;

        if (normal) {
            const {
                number: n,
                normalizeSuffix: ns,
            } = normalizer(num, Lang.en);

            num = n;
            nSuffix = ns;
        }

        const integer = Math.floor(num);
        const fraction = num - integer;

        let formattedNumber = String(num);

        // Convert number to fixed precision
        if (isTruthy(precision)) {
            let p = 2;

            if (precision === 'auto') {
                const absoluteValue = Math.abs(num);
                if (absoluteValue < 1) {
                    p = Math.ceil(-Math.log10(absoluteValue)) + 1;
                }

                if (integer > 100) {
                    // 140.1234M -> 140 M
                    p = 0;
                } else {
                    // 96.0334M -> 96.03 M
                    if (fraction > 0.01) {
                        p = 2;
                    }

                    p = 0;
                }
            } else {
                p = precision;
            }

            formattedNumber = num.toFixed(p);
        }

        // Convert number to add separator
        if (isDefined(separator) && fraction === 0) {
            formattedNumber = addSeparator(num, separator);
        }

        return [formattedNumber, nSuffix];
    }, [
        value,
        showSign,
        normal,
        precision,
        separator,
        normalizer,
    ]);

    return (
        <div
            className={_cs(styles.numberOutput, className)}
            title={isDefined(tooltip) ? String(tooltip) : undefined}
        >
            { isFalsy(value) ? (
                invalidText
            ) : (
                <>
                    { isTruthy(prefix) && (
                        <div className={_cs(styles.prefix, prefixClassName)}>
                            {prefix}
                        </div>
                    )}
                    { isTruthy(showSign) && value !== 0 && (
                        <div className={_cs(styles.sign, signClassName)}>
                            {value > 0 ? '+' : '-'}
                        </div>
                    )}
                    <div className={_cs(styles.number, numberClassName)}>
                        {valueModifier ? valueModifier(number) : number}
                    </div>
                    { isTruthy(normalizationSuffix) && (
                        <div
                            className={_cs(
                                styles.normalizationSuffix,
                                normalizationSuffixClassName,
                            )}
                        >
                            {normalizationSuffix}
                        </div>
                    )}
                    { isTruthy(suffix) && (
                        <div className={_cs(styles.suffix, suffixClassName)}>
                            {suffix}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default genericMemo(NumberOutput);
