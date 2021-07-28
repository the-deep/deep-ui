import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { useDropdownFeatures } from '../DropdownMenu';
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
    persistent?: boolean;
    componentRef?: React.MutableRefObject<{
        setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    } | null>;
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
        persistent = false,
        componentRef,
        ...otherProps
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
            <QuickActionButton
                name={undefined}
                elementRef={buttonRef}
                className={className}
                variant={variant}
                onClick={handleButtonClick}
                {...otherProps}
            >
                {label}
            </QuickActionButton>
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
        </>
    );
}

export default QuickActionDropdownMenu;
