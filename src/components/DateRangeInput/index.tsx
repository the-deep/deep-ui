import React from 'react';
import {
    _cs,
    randomString,
    isDefined,
} from '@togglecorp/fujs';
import {
    IoCalendar,
    IoClose,
} from 'react-icons/io5';

import useUiModeClassName from '../../hooks/useUiModeClassName';
import useBlurEffect from '../../hooks/useBlurEffect';
import useBooleanState from '../../hooks/useBooleanState';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput from '../RawInput';
import RawButton from '../RawButton';
import Button from '../Button';
import Popup from '../Popup';
import Calendar, { Props as CalendarProps } from '../Calendar';
import CalendarDate, { Props as CalendarDateProps } from '../Calendar/CalendarDate';
import { ymdToDateString } from '../../utils';

import {
    predefinedDateRangeOptions,
    PredefinedDateRangeKey,
} from './predefinedDateRange';

import styles from './styles.css';

export interface Value {
    startDate: string;
    endDate: string;
}

interface DateRendererProps extends CalendarDateProps {
    startDate?: string;
    endDate?: string;
}

const DateRenderer = (props: DateRendererProps) => {
    const {
        className: dateClassName,
        year,
        month,
        date,
        startDate,
        endDate,
        ...otherProps
    } = props;

    const start = startDate ? new Date(startDate).getTime() : undefined;
    const end = endDate ? new Date(endDate).getTime() : undefined;
    const current = new Date(year, month, date).getTime();

    const dateString = ymdToDateString(year, month, date);
    const inBetween = (start && end) ? (
        current > start && current < end
    ) : false;
    const isEndDate = dateString === endDate;

    return (
        <CalendarDate
            {...otherProps}
            className={_cs(
                styles.calendarDate,
                dateClassName,
                dateString === startDate && styles.startDate,
                isEndDate && styles.endDate,
                (!isEndDate && inBetween) && styles.inBetween,
            )}
            year={year}
            month={month}
            date={date}
        />
    );
};

type InheritedProps = Omit<InputContainerProps, 'input'>;
export interface Props<N extends number | string | undefined> extends InheritedProps {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
    value?: Value;
    name: N;
    onChange?: (value: Value | undefined, name: N) => void;
}

function DateRangeInput<N extends string | number | undefined>(props: Props<N>) {
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
        onChange,
        name,
        value,
        variant,
    } = props;

    const prevMonthDate = new Date();
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevMonthDateString = ymdToDateString(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth(),
        1,
    );

    const [tempDate, setTempDate] = React.useState<Partial<Value>>({
        startDate: undefined,
        endDate: undefined,
    });
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

    const hideCalendar = React.useCallback(() => {
        setTempDate({
            startDate: undefined,
            endDate: undefined,
        });
        setShowCalendarFalse();
    }, [setShowCalendarFalse]);

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
                hideCalendar();
            }
        },
        [hideCalendar, calendarMonthSelectionPopupClassName],
    );

    useBlurEffect(
        showCalendar,
        handlePopupBlur,
        popupRef,
        containerRef,
    );

    const dateRendererParams = React.useCallback(() => ({
        startDate: tempDate.startDate ?? value?.startDate,
        // we only set end date if user hasn't set the start date
        // i.e. to show previously selected end date)
        endDate: !tempDate.startDate ? value?.endDate : undefined,
    }), [tempDate.startDate, value]);

    const handleCalendarDateClick: CalendarProps<never>['onDateClick'] = React.useCallback(
        (year, month, day) => {
            setTempDate((prevTempDate) => {
                if (isDefined(prevTempDate.startDate)) {
                    const lastDate = ymdToDateString(year, month, day);

                    const prev = new Date(prevTempDate.startDate).getTime();
                    const current = new Date(year, month, day).getTime();

                    const startDate = prev > current ? lastDate : prevTempDate.startDate;
                    const endDate = prev > current ? prevTempDate.startDate : lastDate;

                    return {
                        startDate,
                        endDate,
                    };
                }

                return {
                    startDate: ymdToDateString(year, month, day),
                    endDate: undefined,
                };
            });
        },
        [],
    );

    React.useEffect(() => {
        if (isDefined(tempDate.endDate)) {
            if (onChange) {
                onChange(tempDate as Value, name);
            }
            hideCalendar();
        }
    }, [tempDate, hideCalendar, onChange, name]);

    const handlePredefinedOptionClick = React.useCallback((optionKey: PredefinedDateRangeKey) => {
        if (onChange) {
            const option = predefinedDateRangeOptions.find((d) => d.key === optionKey);

            if (option) {
                const {
                    startDate,
                    endDate,
                } = option.getValue();

                onChange({
                    startDate: ymdToDateString(
                        startDate.getFullYear(),
                        startDate.getMonth(),
                        startDate.getDate(),
                    ),
                    endDate: ymdToDateString(
                        endDate.getFullYear(),
                        endDate.getMonth(),
                        endDate.getDate(),
                    ),
                }, name);
            }
        }

        hideCalendar();
    }, [onChange, hideCalendar, name]);

    const handleClearButtonClick = React.useCallback(() => {
        if (onChange) {
            onChange(undefined, name);
        }
    }, [onChange, name]);

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
            inputContainerClassName={styles.inputContainer}
            label={label}
            labelContainerClassName={labelContainerClassName}
            variant={variant}
            readOnly={readOnly}
            uiMode={uiMode}
            input={(
                <>
                    <RawInput<string>
                        name="startDate"
                        className={_cs(
                            styles.input,
                            styles.startDateInput,
                            uiModeClassName,
                            !!error && styles.errored,
                            inputClassName,
                        )}
                        value={tempDate.startDate ?? value?.startDate}
                        elementRef={inputElementRef}
                        readOnly
                        uiMode={uiMode}
                        disabled={disabled}
                        onFocus={setShowCalendarTrue}
                        type="date"
                    />
                    <div className={styles.separator}>
                        to
                    </div>
                    <RawInput<string>
                        name="startDate"
                        className={_cs(
                            styles.input,
                            styles.endDateInput,
                            uiModeClassName,
                            !!error && styles.errored,
                            inputClassName,
                        )}
                        elementRef={inputElementRef}
                        readOnly
                        value={value?.endDate}
                        uiMode={uiMode}
                        disabled={disabled}
                        onFocus={setShowCalendarTrue}
                        type="date"
                    />
                </>
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
                    <div className={styles.predefinedOptions}>
                        {predefinedDateRangeOptions.map((opt) => (
                            <RawButton
                                className={styles.option}
                                key={opt.key}
                                name={opt.key}
                                onClick={handlePredefinedOptionClick}
                            >
                                {opt.label}
                            </RawButton>
                        ))}
                    </div>

                    <Calendar
                        onDateClick={handleCalendarDateClick}
                        className={styles.calendar}
                        monthSelectionPopupClassName={calendarMonthSelectionPopupClassName}
                        dateRenderer={DateRenderer}
                        rendererParams={dateRendererParams}
                        initialDate={value?.startDate ?? prevMonthDateString}
                    />
                    <Calendar
                        onDateClick={handleCalendarDateClick}
                        className={styles.calendar}
                        monthSelectionPopupClassName={calendarMonthSelectionPopupClassName}
                        dateRenderer={DateRenderer}
                        rendererParams={dateRendererParams}
                        initialDate={value?.endDate}
                    />
                </Popup>
            )}
        </InputContainer>
    );
}

export default DateRangeInput;