import React, { useState } from 'react';
import { _cs } from '@togglecorp/fujs';

import { Props as ContainerProps } from '../Container';
import ControlledExpandableContainer from '../ControlledExpandableContainer';

export interface Props extends ContainerProps {
    // NOTE: Mount will mount the child even if its not shown
    alwaysMountContent?: boolean;
    disabled?: boolean;
    expansionButtonClassName?: string;
    expansionTriggerArea?: 'header' | 'arrow';

    defaultVisibility?: boolean;
}

function ExpandableContainer(props: Props) {
    const {
        defaultVisibility = false,
        ...otherProps
    } = props;

    const [showContent, setContent] = useState(defaultVisibility ?? false);

    return (
        <ControlledExpandableContainer
            {...otherProps}
            name={undefined}
            expanded={showContent}
            onExpansionChange={setContent}
        />
    );
}

export default ExpandableContainer;
