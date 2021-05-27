import React from 'react';

import SelectInput from '#components/SelectInput';
import DateInput from '#components/DateInput';
import Button from '#components/Button';
import Modal, { Props as ModalProps } from '#components/Modal';

import styles from './styles.css';

type DateRangeKey = 'customRange'
    | 'today'
    | 'yesterday'
    | 'thisWeek'
    | 'lastSevenDays'
    | 'thisMonth'
    | 'lastThirtyDays'
    | 'lastThreeMonths'
    | 'lastSixMonths'
    | 'lastYear'

interface DateRangeOption {
    key: DateRangeKey;
    label: string;
}

interface DateRangeValue {
    key: DateRangeKey;
    startDate?: string;
    endDate?: string;
}

const options: DateRangeOption[] = [
    { key: 'customRange', label: 'Select a date range' },
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'thisWeek', label: 'This week' },
    { key: 'lastSevenDays', label: 'Last 7 days' },
    { key: 'thisMonth', label: 'This month' },
    { key: 'lastThirtyDays', label: 'Last 30 days' },
    { key: 'lastThreeMonths', label: 'Last 3 months' },
    { key: 'lastSixMonths', label: 'Last 6 months' },
    { key: 'lastYear', label: 'Last year' },
];

const keySelector = (d: DateRangeOption) => d.key;
const labelSelector = (d: DateRangeOption) => d.label;

// TODO: move to hooks
export function useInputValue<T>(initialValue: T | undefined): [
    T | undefined,
    (
        v: T | undefined,
        n?: string | undefined,
        e?: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>,
    ) => void
] {
    const [value, setValue] = React.useState<T | undefined>(initialValue);

    const setInputValue = React.useCallback(
        (newValue: T | undefined) => {
            setValue(newValue);
        },
        [setValue],
    );

    return [value, setInputValue];
}

interface DateRangeModalProps {
    onDateRangeSelect: (startDate: string, endDate: string) => void;
    onCloseButtonClick: ModalProps['onCloseButtonClick'];
}

// TODO: move to separate component
function DateRangeModal(props: DateRangeModalProps) {
    const {
        onDateRangeSelect,
        onCloseButtonClick,
    } = props;

    const [startDate, setStartDate] = useInputValue('');
    const [endDate, setEndDate] = useInputValue('');

    const handleSelectButtonClick = React.useCallback(() => {
        if (startDate && endDate) {
            onDateRangeSelect(startDate, endDate);
        }
    }, [startDate, endDate, onDateRangeSelect]);

    return (
        <Modal
            heading="Select date range"
            className={styles.dateRangeModal}
            onCloseButtonClick={onCloseButtonClick}
            footer={(
                <Button
                    name="select"
                    disabled={!startDate || !endDate}
                    onClick={handleSelectButtonClick}
                >
                    Select
                </Button>
            )}
        >
            <DateInput
                name="startDate"
                className={styles.startDateInput}
                label="Start date"
                value={startDate}
                onChange={setStartDate}
            />
            <DateInput
                name="endDate"
                className={styles.endDateInput}
                label="End date"
                value={endDate}
                onChange={setEndDate}
            />
        </Modal>
    );
}

export interface Props<N extends string | number> {
    name: N;
    value?: DateRangeValue;
    onChange: (newValue: DateRangeValue | undefined, name: N) => void;
    disabled?: boolean;
    readOnly?: boolean;
}

// TODO: Expose more props (eg: elementRef, inputElementRef, etc)
function DateRangeInput<N extends string | number>(props: Props<N>) {
    const {
        name,
        value,
        onChange,
        disabled,
        readOnly,
    } = props;

    const [showCustomDateRangeModal, setShowCustomDateRangeModal] = React.useState(false);

    const handleCloseButtonClick = React.useCallback(() => {
        setShowCustomDateRangeModal(false);
    }, [setShowCustomDateRangeModal]);

    const handleDateRangeSelect = React.useCallback((startDate, endDate) => {
        setShowCustomDateRangeModal(false);
        if (onChange) {
            onChange({
                key: 'customRange',
                startDate,
                endDate,
            }, name);
        }
    }, [setShowCustomDateRangeModal, onChange, name]);

    const handleSelectInputChange = React.useCallback((newValue) => {
        if (newValue === 'customRange') {
            setShowCustomDateRangeModal(true);
        } else if (onChange) {
            if (newValue) {
                onChange({
                    key: newValue,
                }, name);
            } else {
                onChange(undefined, name);
            }
        }
    }, [onChange, name]);

    const displayValueSelector = React.useCallback((d: DateRangeOption) => {
        if (d.key !== 'customRange') {
            return d.label;
        }

        return `${value?.startDate} to ${value?.endDate}`;
    }, [value]);

    return (
        <>
            <SelectInput
                name={name}
                options={options}
                keySelector={keySelector}
                labelSelector={labelSelector}
                displayValueSelector={displayValueSelector}
                value={value?.key}
                onChange={handleSelectInputChange}
                disabled={disabled}
                readOnly={readOnly}
            />
            {showCustomDateRangeModal && (
                <DateRangeModal
                    onDateRangeSelect={handleDateRangeSelect}
                    onCloseButtonClick={handleCloseButtonClick}
                />
            )}
        </>
    );
}

export default DateRangeInput;
