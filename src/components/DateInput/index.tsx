import React from 'react';
import {
    _cs,
    randomString,
} from '@togglecorp/fujs';
import {
    IoCalendar,
    IoClose,
} from 'react-icons/io5';

import useUiModeClassName from '../../hooks/useUiModeClassName';
import useBlurEffect from '../../hooks/useBlurEffect';
import useBooleanState from '../../hooks/useBooleanState';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';
import Button from '../Button';
import Popup from '../Popup';
import Calendar, { Props as CalendarProps } from '../Calendar';
import { ymdToDateString } from '../../utils';

import styles from './styles.css';

type InheritedProps<T> = (Omit<InputContainerProps, 'input'> & RawInputProps<T>);
export interface Props<T extends string> extends InheritedProps<T> {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
}

function DateInput<T extends string>(props: Props<T>) {
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
        onChange,
        name,
        value,
        ...dateInputProps
    } = props;

    const [calendarMonthSelectionPopupClassName] = React.useState(randomString(16));
    const createdContainerRef = React.useRef<HTMLDivElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);

    const containerRef = containerRefFromProps ?? createdContainerRef;

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);
    const [
        showCalendar,
        setShowCalendarTrue,
        setShowCalendarFalse,,
        toggleShowCalendar,
    ] = useBooleanState(false);

    const handlePopupBlur = React.useCallback(
        (isClickedWithin: boolean, e: MouseEvent) => {
            // Following is to prevent the popup blur when
            // month selection is changed in the calendar
            const container = document.getElementsByClassName(
                calendarMonthSelectionPopupClassName,
            )[0];
            const isContainerOrInsideContainer = container
                ? container === e.target || container.contains(e.target as HTMLElement)
                : false;

            if (!isClickedWithin && !isContainerOrInsideContainer) {
                setShowCalendarFalse();
            }
        },
        [setShowCalendarFalse, calendarMonthSelectionPopupClassName],
    );

    useBlurEffect(
        showCalendar,
        handlePopupBlur,
        popupRef,
        containerRef,
    );

    const handleCalendarDateClick: CalendarProps<never>['onDateClick'] = React.useCallback(
        (year, month, day) => {
            if (onChange) {
                onChange(ymdToDateString(year, month, day), name);
            }
            setShowCalendarFalse();
        },
        [name, onChange, setShowCalendarFalse],
    );

    const handleClearButtonClick = React.useCallback(() => {
        if (onChange) {
            onChange(undefined, name);
        }
    }, [onChange, name]);

    return (
        <>
            <InputContainer
                containerRef={containerRef}
                inputSectionRef={inputSectionRef}
                actions={(
                    <>
                        { actions }
                        {!readOnly && (
                            <>
                                {value && (
                                    <Button
                                        name={undefined}
                                        variant="action"
                                        onClick={handleClearButtonClick}
                                        disabled={disabled}
                                    >
                                        <IoClose />
                                    </Button>
                                )}
                                <Button
                                    name={undefined}
                                    variant="action"
                                    onClick={toggleShowCalendar}
                                    disabled={disabled}
                                >
                                    <IoCalendar />
                                </Button>
                            </>
                        )}
                    </>
                )}
                actionsContainerClassName={actionsContainerClassName}
                className={className}
                disabled={disabled}
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
                    <RawInput<T>
                        {...dateInputProps}
                        name={name}
                        className={_cs(
                            styles.input,
                            uiModeClassName,
                            !!error && styles.errored,
                            !value && styles.empty,
                            inputClassName,
                        )}
                        elementRef={inputElementRef}
                        readOnly
                        uiMode={uiMode}
                        disabled={disabled}
                        value={value}
                        onFocus={setShowCalendarTrue}
                        type="date"
                    />
                )}
            />
            {!readOnly && (
                <Popup
                    parentRef={containerRef}
                    elementRef={popupRef}
                    show={showCalendar}
                    freeWidth
                    className={styles.calendarPopup}
                    contentClassName={styles.popupContent}
                >
                    <Calendar
                        onDateClick={handleCalendarDateClick}
                        className={styles.calendar}
                        monthSelectionPopupClassName={calendarMonthSelectionPopupClassName}
                        initialDate={value ?? undefined}
                        activeDate={value ?? undefined}
                    />
                </Popup>
            )}
        </>
    );
}

export default DateInput;
