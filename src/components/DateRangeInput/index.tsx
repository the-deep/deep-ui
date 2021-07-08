import React from 'react';
import {
    _cs,
    randomString,
    isNotDefined,
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

import styles from './styles.css';

type PredefinedDateRangeKey = 'today'
    | 'yesterday'
    | 'thisWeek'
    | 'lastSevenDays'
    | 'thisMonth'
    | 'lastThirtyDays'
    | 'lastThreeMonths'
    | 'lastSixMonths'
    | 'thisYear'
    | 'lastYear';

interface PredefinedDateRangeOption {
    key: PredefinedDateRangeKey;
    label: string;
}

const predefinedDateRangeOptions: PredefinedDateRangeOption[] = [
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'thisWeek', label: 'This week' },
    { key: 'lastSevenDays', label: 'Last 7 days' },
    { key: 'thisMonth', label: 'This month' },
    { key: 'lastThirtyDays', label: 'Last 30 days' },
    { key: 'lastThreeMonths', label: 'Last 3 months' },
    { key: 'lastSixMonths', label: 'Last 6 months' },
    { key: 'thisYear', label: 'This year' },
    { key: 'lastYear', label: 'Last year' },
];

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
    } = props;

    const prevMonthDate = new Date();
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevMonthDateString = ymdToDateString(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth(),
        1,
    );

    const [tempStartDate, setTempStartDate] = React.useState<string | undefined>();
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
        setTempStartDate(undefined);
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
        startDate: tempStartDate ?? value?.startDate,
        endDate: !tempStartDate ? value?.endDate : undefined,
    }), [tempStartDate, value]);

    const handleCalendarDateClick: CalendarProps<never>['onDateClick'] = React.useCallback(
        (year, month, day) => {
            setTempStartDate((prevTempStartDate) => {
                if (isNotDefined(prevTempStartDate)) {
                    return ymdToDateString(year, month, day);
                }

                if (new Date(prevTempStartDate).getTime() > new Date(year, month, day).getTime()) {
                    onChange(
                        {
                            startDate: ymdToDateString(year, month, day),
                            endDate: prevTempStartDate,
                        },
                        name,
                    );
                } else {
                    onChange(
                        {
                            startDate: prevTempStartDate,
                            endDate: ymdToDateString(year, month, day),
                        },
                        name,
                    );
                }

                hideCalendar();

                return undefined;
            });
        },
        [name, onChange, hideCalendar],
    );

    const handlePredefinedOptionClick = React.useCallback((option: PredefinedDateRangeKey) => {
        if (onChange) {
            let start = new Date();
            let end = new Date();

            switch (option) {
                case 'today':
                    break;
                case 'yesterday':
                    start.setDate(start.getDate() - 1);
                    end.setDate(end.getDate() - 1);
                    break;
                case 'thisWeek':
                    start.setDate(start.getDate() - start.getDay());
                    end.setDate(start.getDate() + 6);
                    break;
                case 'lastSevenDays':
                    start.setDate(end.getDate() - 7);
                    break;
                case 'thisMonth':
                    start.setDate(1);
                    end.setMonth(end.getMonth() + 1);
                    end.setDate(0);
                    break;
                case 'lastThirtyDays':
                    start.setDate(start.getDate() - 30);
                    break;
                case 'lastThreeMonths':
                    start.setMonth(start.getMonth() - 2);
                    start.setDate(1);
                    end.setMonth(end.getMonth() + 1);
                    end.setDate(0);
                    break;
                case 'lastSixMonths':
                    start.setMonth(start.getMonth() - 5);
                    start.setDate(1);
                    end.setMonth(end.getMonth() + 1);
                    end.setDate(0);
                    break;
                case 'thisYear':
                    start.setMonth(0);
                    start.setDate(1);
                    end.setMonth(end.getMonth() + 1);
                    end.setDate(0);
                    break;
                case 'lastYear':
                    start.setFullYear(start.getFullYear() - 1);
                    start.setMonth(0);
                    start.setDate(1);
                    end.setMonth(0);
                    end.setDate(0);
                    break;
                default:
                    start = new Date();
                    end = start;
                    break;
            }

            onChange({
                startDate: ymdToDateString(start.getFullYear(), start.getMonth(), start.getDate()),
                endDate: ymdToDateString(end.getFullYear(), end.getMonth(), end.getDate()),
            }, name);
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
                        value={tempStartDate ?? value?.startDate}
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
