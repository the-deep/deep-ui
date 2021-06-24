import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { Props as ButtonProps } from '../Button';
import Popup from '../Popup';
import useBooleanState from '../../hooks/useBooleanState';

import styles from './styles.css';

export type Props = Omit<ButtonProps<undefined>, 'className' | 'onClick'> & {
    className?: string;
    children?: React.ReactNode;
    label?: React.ReactNode;
}

function DropdownMenu(props: Props) {
    const {
        className,
        children,
        label,
        ...buttonProps
    } = props;

    const [showPopup, setShowPopupTrue] = useBooleanState(false);
    console.info(showPopup, children);

    return (
        <Button
            {...buttonProps}
            className={_cs(styles.dropdownMenu, className)}
            onClick={setShowPopupTrue}
        >
            { label }
            {showPopup && (
                <Popup>
                    { children }
                </Popup>
            )}
        </Button>
    );
}

export default DropdownMenu;
