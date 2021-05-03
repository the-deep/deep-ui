import React from 'react';

const getHashFromBrowser = () => window.location.hash.substr(2);

function useHash() {
    const [hash, setHash] = React.useState(getHashFromBrowser());

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
