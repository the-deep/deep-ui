import React from 'react';
import ReactDOM from 'react-dom';

import { genericMemo } from '../utils';

export interface Props {
    children: React.ReactNode;
}

function Portal(props: Props) {
    const { children } = props;
    return (
        <>
            {ReactDOM.createPortal(
                children,
                document.body,
            )}
        </>
    );
}

export default genericMemo(Portal);
