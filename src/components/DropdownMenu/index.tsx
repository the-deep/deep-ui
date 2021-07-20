import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoChevronDown } from 'react-icons/io5';

import Button, { Props as ButtonProps } from '../Button';
import Popup from '../Popup';
import useBooleanState from '../../hooks/useBooleanState';
import useBlurEffect from '../../hooks/useBlurEffect';

import styles from './styles.css';

export function useDropdownFeature() {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const [showPopup, setShowPopupTrue, setShowPopupFalse] = useBooleanState(false);

    useBlurEffect(showPopup, setShowPopupFalse, popupRef, buttonRef);

    return {
        buttonRef,
        popupRef,
        showPopup,
        handleButtonClick: setShowPopupTrue,
    };
}

export type Props = Omit<ButtonProps<undefined>, 'className' | 'onClick' | 'name'> & {
    className?: string;
    children?: React.ReactNode;
    label?: React.ReactNode;
    popupClassName?: string;
    popupContentClassName?: string;
    popupMatchesParentWidth?: boolean;
    hideDropdownIcon?: boolean;
}

function DropdownMenu(props: Props) {
    const {
        className,
        variant = 'general',
        children,
        label,
        actions,
        popupClassName,
        popupContentClassName,
        popupMatchesParentWidth,
        hideDropdownIcon,
        ...buttonProps
    } = props;

    const {
        buttonRef,
        popupRef,
        showPopup,
        handleButtonClick,
    } = useDropdownFeature();

    return (
        <Button
            {...buttonProps}
            name={undefined}
            variant={variant}
            elementRef={buttonRef}
            className={_cs(styles.dropdownMenu, className)}
            onClick={handleButtonClick}
            actions={(
                <>
                    {actions}
                    {!hideDropdownIcon && (
                        <IoChevronDown />
                    )}
                </>
            )}
        >
            { label }
            <Popup
                className={_cs(styles.popup, popupClassName)}
                contentClassName={popupContentClassName}
                show={showPopup}
                elementRef={popupRef}
                freeWidth={!popupMatchesParentWidth}
            >
                { children }
            </Popup>
        </Button>
    );
}

export default DropdownMenu;
