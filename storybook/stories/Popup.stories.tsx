import React from 'react';
import Popup from '../../src/components/Popup';

export default {
    title: 'View/Popup',
    component: Popup,
    argTypes: {},
};

export function Default() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                height: '100vh',
            }}
        >
            <div style={{ width: '70vw' }}>
                <div
                    style={{
                        padding: '10px',
                        width: '10rem',
                        border: '1px solid red',
                    }}
                >
                    This is the parent 1
                    <Popup show>
                        <div style={{ padding: '20px' }}>
                            This is the popup content for parent 1
                        </div>
                    </Popup>
                </div>
            </div>
            <div style={{ width: '20vw' }}>
                <div
                    style={{
                        padding: '10px',
                        width: '10rem',
                        border: '1px solid blue',
                    }}
                >
                    This is the parent 2
                    <Popup show>
                        <div style={{ padding: '20px' }}>
                            This is the popup content for parent 2
                        </div>
                    </Popup>
                </div>
            </div>
            <div style={{ flexBasis: '40vw' }}>
                <div
                    style={{
                        padding: '10px',
                        width: '10rem',
                        border: '1px solid #f0ef1f',
                    }}
                >
                    This is the parent 3
                    <Popup
                        show
                        placementDirection="horizontal"
                    >
                        <div style={{ padding: '20px' }}>
                            This is the popup content for parent 3
                        </div>
                    </Popup>
                </div>
            </div>
            <div style={{ flexBasis: '40vw' }}>
                <div
                    style={{
                        padding: '10px',
                        width: '10rem',
                        border: '1px solid green',
                    }}
                >
                    This is the parent 4
                    <Popup show>
                        <div style={{ padding: '20px' }}>
                            This is the popup content for parent 4
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    );
}
