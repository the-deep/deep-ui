import React, { useState } from 'react';

import ControlledExpandableContainer, {
    Props as ControlledExpandableContainerProps,
} from '../ControlledExpandableContainer';

export interface Props extends Omit<ControlledExpandableContainerProps<undefined>, 'expanded' | 'onExpansionChange' | 'name'>{
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
