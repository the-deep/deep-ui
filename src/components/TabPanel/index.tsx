import React from 'react';
import { TabKey, TabContext } from '../TabContext';

export interface Props extends React.HTMLProps<HTMLDivElement> {
    name: TabKey;
    elementRef?: React.Ref<HTMLDivElement>;
}

export default function TabPanel(props: Props) {
    const { activeTab } = React.useContext(TabContext);

    const {
        name,
        elementRef,
        ...otherProps
    } = props;

    if (name !== activeTab) {
        return null;
    }

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            role="tabpanel"
            ref={elementRef}
        />
    );
}
