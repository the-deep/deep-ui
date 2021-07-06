import React from 'react';
import {
    _cs,
    randomString,
} from '@togglecorp/fujs';
import { IoCalendar } from 'react-icons/io5';

import useUiModeClassName from '../../hooks/useUiModeClassName';
import useBlurEffect from '../../hooks/useBlurEffect';
import useBooleanState from '../../hooks/useBooleanState';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';
import Button from '../Button';
import Popup from '../Popup';
import Calendar, { Props as CalendarProps } from '../Calendar';

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
        placeholder = 'yyyy/mm/dd',
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
                const ys = String(year).padStart(4, '0');
                const ms = String(month).padStart(2, '0');
                const ds = String(day).padStart(2, '0');
                onChange(`${ys}-${ms}-${ds}`, name);
            }
            setShowCalendarFalse();
        },
        [name, onChange, setShowCalendarFalse],
    );

    return (
        <InputContainer
            containerRef={containerRef}
            inputSectionRef={inputSectionRef}
            actions={(
                <>
                    { actions }
                    {!readOnly && (
                        <Button
                            name={undefined}
                            variant="transparent"
                            onClick={toggleShowCalendar}
                            disabled={disabled}
                        >
                            <IoCalendar />
                        </Button>
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
                        inputClassName,
                    )}
                    elementRef={inputElementRef}
                    readOnly
                    uiMode={uiMode}
                    disabled={disabled}
                    placeholder={placeholder}
                    onFocus={setShowCalendarTrue}
                    type="date"
                />
            )}
        >
            {!readOnly && (
                <Popup
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
                    />
                </Popup>
            )}
        </InputContainer>
    );
}

export default DateInput;
