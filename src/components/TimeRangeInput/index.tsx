import React from 'react';
import {
    _cs,
    isDefined,
} from '@togglecorp/fujs';
import {
    IoTimeOutline,
    IoClose,
} from 'react-icons/io5';

import useUiModeClassName from '../../hooks/useUiModeClassName';
import useBlurEffect from '../../hooks/useBlurEffect';
import useBooleanState from '../../hooks/useBooleanState';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput from '../RawInput';
import TimeInput from '../TimeInput';
import Button from '../Button';
import Popup from '../Popup';

import styles from './styles.css';

export interface Value {
    startTime: string;
    endTime: string;
}

type InheritedProps = Omit<InputContainerProps, 'input'>;
export interface Props<N extends string> extends InheritedProps {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
    value?: Value;
    name: N;
    onChange?: (value: Value | undefined, name: N) => void;
}

function TimeRangeInput<T extends string>(props: Props<T>) {
    const {
        actions,
        actionsContainerClassName,
        className,
        disabled,
        error,
        errorContainerClassName,
        hint,
        hintContainerClassName,
        icons,
        iconsContainerClassName,
        inputSectionClassName,
        label,
        labelContainerClassName,
        readOnly,
        uiMode,
        inputElementRef,
        containerRef: containerRefFromProps,
        inputSectionRef,
        inputClassName,
        variant,
        value,
        onChange,
        name,
    } = props;

    const createdContainerRef = React.useRef<HTMLDivElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);
    const containerRef = containerRefFromProps ?? createdContainerRef;
    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);
    const [
        showTimePicker,
        setShowTimePickerTrue,
        setShowTimePickerFalse,,
        toggleShowTimePicker,
    ] = useBooleanState(false);

    const [tempTime, setTempTime] = React.useState<Partial<Value>>({
        startTime: undefined,
        endTime: undefined,
    });

    const hideTimePicker = React.useCallback(() => {
        setTempTime({
            startTime: undefined,
            endTime: undefined,
        });
        setShowTimePickerFalse();
    }, [setShowTimePickerFalse, setTempTime]);

    const handlePopupBlur = React.useCallback(
        (isClickedWithin: boolean) => {
            if (!isClickedWithin) {
                hideTimePicker();
            }
        },
        [hideTimePicker],
    );

    useBlurEffect(
        showTimePicker,
        handlePopupBlur,
        popupRef,
        containerRef,
    );

    const handleClearButtonClick = React.useCallback(() => {
        if (onChange) {
            onChange(undefined, name);
        }
    }, [onChange, name]);

    const handleTimeInputChange = React.useCallback((newValue: string | undefined, inputName: 'startTime' | 'endTime') => {
        setTempTime((prevTempTime) => ({ ...prevTempTime, [inputName]: newValue }));
    }, [setTempTime]);

    const handleApplyButtonClick = React.useCallback(() => {
        if (onChange) {
            onChange(tempTime as Value, name);
        }

        hideTimePicker();
    }, [tempTime, name, onChange, hideTimePicker]);

    return (
        <InputContainer
            containerRef={containerRef}
            inputSectionRef={inputSectionRef}
            actions={(
                <>
                    { actions }
                    {!readOnly && (
                        <>
                            <Button
                                name={undefined}
                                variant="transparent"
                                onClick={handleClearButtonClick}
                                disabled={disabled}
                            >
                                <IoClose />
                            </Button>
                            <Button
                                name={undefined}
                                variant="transparent"
                                onClick={toggleShowTimePicker}
                                disabled={disabled}
                            >
                                <IoTimeOutline />
                            </Button>
                        </>
                    )}
                </>
            )}
            actionsContainerClassName={actionsContainerClassName}
            className={className}
            disabled={disabled}
            inputContainerClassName={styles.inputContainer}
            error={error}
            errorContainerClassName={errorContainerClassName}
            hint={hint}
            hintContainerClassName={hintContainerClassName}
            icons={icons}
            iconsContainerClassName={iconsContainerClassName}
            inputSectionClassName={inputSectionClassName}
            label={label}
            labelContainerClassName={labelContainerClassName}
            readOnly={readOnly}
            uiMode={uiMode}
            variant={variant}
            input={(
                <>
                    <RawInput<string>
                        name="startTime"
                        className={_cs(
                            styles.input,
                            styles.startTimeInput,
                            uiModeClassName,
                            !!error && styles.errored,
                            inputClassName,
                        )}
                        elementRef={inputElementRef}
                        onFocus={setShowTimePickerTrue}
                        readOnly
                        uiMode={uiMode}
                        disabled={disabled}
                        type="time"
                        value={value?.startTime}
                    />
                    <div className={styles.separator}>
                        to
                    </div>
                    <RawInput<string>
                        name="endTime"
                        className={_cs(
                            styles.input,
                            styles.endTimeInput,
                            uiModeClassName,
                            !!error && styles.errored,
                            inputClassName,
                        )}
                        elementRef={inputElementRef}
                        onFocus={setShowTimePickerTrue}
                        readOnly
                        uiMode={uiMode}
                        disabled={disabled}
                        type="time"
                        value={value?.endTime}
                    />
                </>
            )}
        >
            {!readOnly && (
                <Popup
                    elementRef={popupRef}
                    show={showTimePicker}
                    freeWidth
                    className={styles.picker}
                    contentClassName={styles.content}
                >
                    <TimeInput
                        className={styles.startTimeInput}
                        name="startTime"
                        label="From"
                        value={tempTime.startTime}
                        onChange={handleTimeInputChange}
                    />
                    <TimeInput
                        className={styles.endTimeInput}
                        name="endTime"
                        label="To"
                        value={tempTime.endTime}
                        onChange={handleTimeInputChange}
                    />
                    <div className={styles.actions}>
                        <Button
                            className={styles.applyButton}
                            name={undefined}
                            onClick={handleApplyButtonClick}
                            disabled={!isDefined(tempTime.startTime)
                                || !isDefined(tempTime.endTime)}
                        >
                            Apply
                        </Button>
                    </div>
                </Popup>
            )}
        </InputContainer>
    );
}

export default TimeRangeInput;
