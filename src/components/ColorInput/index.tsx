import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    SketchPicker,
    ColorResult,
} from 'react-color';

import { useDropdownFeature } from '../DropdownMenu';
import RawButton from '../RawButton';
import Popup from '../Popup';

import styles from './styles.css';

export interface Props<N extends number | string | undefined> {
    className?: string;
    value?: string;
    onChange: (newValue: string, name: N) => void;
    name: N,
}

function ColorInput<N extends number | string | undefined>(props: Props<N>) {
    const {
        className,
        value,
        onChange,
        name,
    } = props;

    const handleColorChange = React.useCallback((newValue: ColorResult) => {
        onChange(newValue.hex, name);
    }, [onChange, name]);

    const {
        buttonRef,
        popupRef,
        showPopup,
        handleButtonClick,
    } = useDropdownFeature(true);

    return (
        <RawButton
            elementRef={buttonRef}
            name={undefined}
            className={_cs(
                styles.colorInput,
                !value && styles.empty,
                className,
            )}
            style={value ? { backgroundColor: value } : undefined}
            onClick={handleButtonClick}
        >
            <Popup
                elementRef={popupRef}
                show={showPopup}
                freeWidth
                className={styles.colorPickerPopup}
                contentClassName={styles.content}
            >
                <SketchPicker
                    color={value}
                    onChange={handleColorChange}
                    disableAlpha
                />
            </Popup>
        </RawButton>
    );
}

export default ColorInput;
