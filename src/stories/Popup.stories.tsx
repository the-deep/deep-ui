import React from 'react';
import Popup from '../components/Popup';

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
                    }}
                >
                    This is the parent 3
                    <Popup show>
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
