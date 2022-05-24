import { memo } from 'react';

import {
    isFalsyString,
    caseInsensitiveSubmatch,
    compareStringSearch,
} from '@togglecorp/fujs';

export function rankedSearchOnList<T>(
    list: T[],
    searchString: string | undefined,
    labelSelector: (item: T) => string,
) {
    if (isFalsyString(searchString)) {
        return list;
    }

    return list
        .filter((option) => caseInsensitiveSubmatch(labelSelector(option), searchString))
        .sort((a, b) => compareStringSearch(
            labelSelector(a),
            labelSelector(b),
            searchString,
        ));
}

export const genericMemo: (<T>(c: T) => T) = memo;

export const getHashFromBrowser = () => window.location.hash.substr(2);
export const setHashToBrowser = (hash: string | undefined) => {
    if (hash) {
        window.location.replace(`#/${hash}`);
    } else {
        window.location.hash = '';
    }
};

export function ymdToDateString(year: number, month: number, day: number) {
    const ys = String(year).padStart(4, '0');
    const ms = String(month + 1).padStart(2, '0');
    const ds = String(day).padStart(2, '0');

    return `${ys}-${ms}-${ds}`;
}

export function dateStringToDate(value: string) {
    return new Date(`${value}T00:00`);
}

export function isValidUrl(url?: string) {
    if (!url) {
        return false;
    }
    try {
        // eslint-disable-next-line no-new
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
