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

export interface Props {
    className?: string;
}

function ColorInput(props: Props) {
    const { className } = props;

    const [value, setValue] = React.useState<string | undefined>();

    const handleColorChange = React.useCallback((newValue: ColorResult) => {
        setValue(newValue.hex);
    }, [setValue]);

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
                />
            </Popup>
        </RawButton>
    );
}

export default ColorInput;
