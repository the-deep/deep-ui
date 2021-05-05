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

