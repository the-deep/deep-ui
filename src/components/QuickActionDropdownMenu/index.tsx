import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { useDropdownFeature } from '../DropdownMenu';
import Popup from '../Popup';
import QuickActionButton, {
    Props as QuickActionButtonProps,
} from '../QuickActionButton';

import styles from './styles.css';

export type Props = Omit<QuickActionButtonProps<undefined>, 'onClick' | 'name'> & {
    children?: React.ReactNode;
    label?: React.ReactNode;
    popupClassName?: string;
    popupContentClassName?: string;
    popupMatchesParentWidth?: boolean;
};

function QuickActionDropdownMenu(props: Props) {
    const {
        className,
        children,
        label,
        variant = 'secondary',
        popupClassName,
        popupContentClassName,
        popupMatchesParentWidth,
        ...otherProps
    } = props;

    const {
        buttonRef,
        popupRef,
        showPopup,
        handleButtonClick,
    } = useDropdownFeature();

    return (
        <QuickActionButton
            name={undefined}
            elementRef={buttonRef}
            className={className}
            variant={variant}
            onClick={handleButtonClick}
            {...otherProps}
        >
            {label}
            <Popup
                parentRef={buttonRef}
                className={_cs(styles.popup, popupClassName)}
                contentClassName={popupContentClassName}
                show={showPopup}
                elementRef={popupRef}
                freeWidth={!popupMatchesParentWidth}
            >
                {children}
            </Popup>
        </QuickActionButton>
    );
}

export default QuickActionDropdownMenu;
