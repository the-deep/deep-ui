import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoChevronDown,
    IoChevronUp,
} from 'react-icons/io5';

import Button, { Props as ButtonProps } from '../Button';
import { genericMemo } from '../../utils';
import Popup from '../Popup';
import useBooleanState from '../../hooks/useBooleanState';
import useBlurEffect from '../../hooks/useBlurEffect';

import styles from './styles.css';

export function useDropdownFeatures(persistent = false) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const [
        showPopup,,
        setShowPopupFalse,
        setShowPopup,
        togglePopup,
    ] = useBooleanState(false);

    const handleBlur = React.useCallback((clickedOnElement: boolean, clickedOnParent: boolean) => {
        if (clickedOnParent) {
            return;
        }
        if (persistent && clickedOnElement) {
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
        handleButtonClick: togglePopup,
    };
}

export type Props = Omit<ButtonProps<undefined>, 'className' | 'onClick' | 'name'> & {
    className?: string;
    children?: React.ReactNode;
    label?: React.ReactNode;
    popupClassName?: string;
    popupContentClassName?: string;
    popupMatchesParentWidth?: boolean;
    popupPlacementDirection?: 'horizontal' | 'vertical';
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
        popupPlacementDirection,
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
    } = useDropdownFeatures(persistent);

    React.useEffect(() => {
        if (componentRef) {
            componentRef.current = {
                setShowPopup,
            };
        }
    }, [componentRef, setShowPopup]);

    return (
        <>
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
                        {!hideDropdownIcon && (showPopup ? <IoChevronUp /> : <IoChevronDown />)}
                    </>
                )}
            >
                { label }
            </Button>
            <Popup
                elementRef={popupRef}
                parentRef={buttonRef}
                className={_cs(styles.popup, popupClassName)}
                contentClassName={popupContentClassName}
                show={showPopup}
                freeWidth={!popupMatchesParentWidth}
                placementDirection={popupPlacementDirection}
            >
                { children }
            </Popup>
        </>
    );
}

export default genericMemo(DropdownMenu);
