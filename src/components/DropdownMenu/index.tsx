import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoChevronDown } from 'react-icons/io5';

import Button, { Props as ButtonProps } from '../Button';
import Popup from '../Popup';
import useBooleanState from '../../hooks/useBooleanState';
import useBlurEffect from '../../hooks/useBlurEffect';

import { genericMemo } from '../../utils';

import styles from './styles.css';

export function useDropdownFeature(persistent = false) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const [
        showPopup,
        setShowPopupTrue,
        setShowPopupFalse,
        setShowPopup,
    ] = useBooleanState(false);

    const handleBlur = React.useCallback((clickedWithin: boolean) => {
        if (persistent && clickedWithin) {
            return;
        }

        setShowPopupFalse();
    }, [persistent, setShowPopupFalse]);

    useBlurEffect(showPopup, handleBlur, popupRef, buttonRef);

    return {
        buttonRef,
        popupRef,
        showPopup,
        setShowPopup,
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
    persistent?: boolean;
    componentRef?: React.MutableRefObject<{
        setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    } | null>;
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
        persistent = false,
        componentRef,
        ...buttonProps
    } = props;

    const {
        buttonRef,
        popupRef,
        showPopup,
        setShowPopup,
        handleButtonClick,
    } = useDropdownFeature(persistent);

    React.useEffect(() => {
        if (componentRef) {
            componentRef.current = {
                setShowPopup,
            };
        }
    }, [componentRef, setShowPopup]);

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
                parentRef={buttonRef}
            >
                { children }
            </Popup>
        </Button>
    );
}

export default genericMemo(DropdownMenu);
