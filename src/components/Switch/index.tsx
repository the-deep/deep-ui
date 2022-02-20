import React from 'react';

import Checkbox, { Props as CheckboxProps } from '../Checkbox';
import SwitchIcon from '../SwitchIcon';

export interface Props<N extends string> extends Omit<CheckboxProps<N>, 'indeterminate' | 'checkmark'> {
}

function Switch<N extends string>(props: Props<N>) {
    return (
        <Checkbox
            {...props}
            checkmark={SwitchIcon}
        />
    );
}

export default Switch;
