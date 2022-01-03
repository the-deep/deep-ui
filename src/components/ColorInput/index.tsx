import React from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    SketchPicker,
    ColorResult,
} from 'react-color';

import { useDropdownFeatures } from '../DropdownMenu';
import { genericMemo } from '../../utils';
import RawButton from '../RawButton';
import Popup from '../Popup';

import styles from './styles.css';

type NameType = string | number | undefined;

export interface Props<N extends NameType> {
    className?: string;
    value?: string;
    onChange: (newValue: string, name: N) => void;
    name: N,
}

function ColorInput<N extends NameType>(props: Props<N>) {
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
    } = useDropdownFeatures(true);

    return (
        <>
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
            />
            <Popup
                elementRef={popupRef}
                parentRef={buttonRef}
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
        </>
    );
}

export default genericMemo(ColorInput);
