import React from 'react';
import {
    _cs,
    randomString,
} from '@togglecorp/fujs';
import {
    IoCalendarOutline,
    IoClose,
} from 'react-icons/io5';

import useUiModeClassName from '../../hooks/useUiModeClassName';
import useBlurEffect from '../../hooks/useBlurEffect';
import useBooleanState from '../../hooks/useBooleanState';
import useModalState from '../../hooks/useModalState';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';
import Button from '../Button';
import Popup from '../Popup';
import Modal from '../Modal';
import Calendar, { Props as CalendarProps } from '../Calendar';
import { Props as CalendarDateProps } from '../Calendar/CalendarDate';
import { genericMemo, ymdToDateString } from '../../utils';

import styles from './styles.css';

type NameType = string | number | undefined;

type InheritedProps<T extends NameType> = (Omit<InputContainerProps, 'input'> & RawInputProps<T>);

export interface Props<T extends NameType> extends InheritedProps<T> {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
    showInModal?: boolean;
}

function DateInput<T extends NameType>(props: Props<T>) {
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
        showInModal,
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

    const [
        dateModalShown,
        setDateModalVisible,
        setDateModalHidden,
    ] = useModalState(false);

    const handleShowCalendar = React.useCallback(() => {
        if (showInModal) {
            setDateModalVisible();
        }
        toggleShowCalendar();
    }, [
        showInModal,
        setDateModalVisible,
        toggleShowCalendar,
    ]);

    const handleFocus = React.useCallback(() => {
        if (showInModal) {
            setDateModalVisible();
        }
        setShowCalendarTrue();
    }, [showInModal, setShowCalendarTrue, setDateModalVisible]);

    const handlePopupBlur = React.useCallback(
        (isClickedOnPopup: boolean, isClickedOnParent: boolean, e: MouseEvent) => {
            const isClickedWithin = isClickedOnPopup || isClickedOnParent;
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

    const handleCalendarDateClick: CalendarProps<CalendarDateProps>['onDateClick'] = React.useCallback(
        (year, month, day) => {
            if (onChange) {
                onChange(ymdToDateString(year, month, day), name);
            }
            setShowCalendarFalse();
            if (showInModal) {
                setDateModalHidden();
            }
        },
        [
            name,
            onChange,
            setShowCalendarFalse,
            setDateModalHidden,
            showInModal,
        ],
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
                                        title="Clear"
                                    >
                                        <IoClose />
                                    </Button>
                                )}
                                <Button
                                    name={undefined}
                                    variant="action"
                                    onClick={handleShowCalendar}
                                    title="Set current date"
                                    disabled={disabled}
                                >
                                    <IoCalendarOutline />
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
                        // NOTE: Make this required to hide clear button on firefox
                        required={!!value}
                        readOnly
                        uiMode={uiMode}
                        disabled={disabled}
                        value={value}
                        onFocus={handleFocus}
                        type="date"
                    />
                )}
            />
            {!readOnly && !showInModal && (
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
            {!readOnly && showInModal && dateModalShown && (
                <Modal
                    onCloseButtonClick={setDateModalHidden}
                    className={styles.calendarModal}
                    spacing="compact"
                    size="free"
                    freeHeight
                >
                    <Calendar
                        onDateClick={handleCalendarDateClick}
                        className={styles.calendar}
                        monthSelectionPopupClassName={calendarMonthSelectionPopupClassName}
                        initialDate={value ?? undefined}
                        activeDate={value ?? undefined}
                    />
                </Modal>
            )}
        </>
    );
}

export default genericMemo(DateInput);
