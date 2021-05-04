import React from 'react';

import {
    getHashFromBrowser,
    setHashToBrowser,
} from '../utils';

function useHash(initialValue?: string) {
    const initialValueRef = React.useRef<string | undefined>(initialValue);
    const [hash, setHash] = React.useState(getHashFromBrowser());

    React.useEffect(() => {
        setHashToBrowser(initialValueRef.current);
    }, []);

    const handleHashChange = React.useCallback(() => {
        setHash(getHashFromBrowser());
    }, [setHash]);

    React.useEffect(() => {
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [handleHashChange]);

    return hash;
}

export default useHash;
