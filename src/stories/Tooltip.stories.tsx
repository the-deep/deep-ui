import React from 'react';
import Tooltip from '#components/Tooltip';

export default {
    title: 'View/Tooltip',
    component: Tooltip,
    argTypes: {},
};

export const Default = () => (
    <div
        style={{
            width: 'fit-content',
            border: '1px solid red',
            padding: '10px',
        }}
    >
        Hover over me
        <Tooltip>
            Okay dood!
        </Tooltip>
    </div>
);
