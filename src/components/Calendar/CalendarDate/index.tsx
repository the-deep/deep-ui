import React from 'react';
import { _cs } from '@togglecorp/fujs';

import RawButton, { Props as RawButtonProps } from '../../RawButton';

import styles from './styles.css';

export interface Props {
    className?: string;
    year: number;
    month: number;
    date: number;
    currentYear: number;
    currentMonth: number;
    currentDate: number;
    onClick?: (year: number, month: number, date: number) => void;
    elementRef?: RawButtonProps<undefined>['elementRef'];
}

function CalendarDate(props: Props) {
    const {
        className,
        year,
        month,
        date,
        currentYear,
        currentMonth,
        currentDate,
        onClick,
        elementRef,
    } = props;

    const handleClick = React.useCallback(() => {
        if (onClick) {
            onClick(year, month, date);
        }
    }, [year, month, date, onClick]);

    return (
        <RawButton
            elementRef={elementRef}
            name={date}
            className={_cs(
                styles.date,
                year === currentYear
                && month === currentMonth
                && currentDate === date
                && styles.today,
                className,
            )}
            onClick={handleClick}
        >
            {date}
        </RawButton>

    );
}

export default CalendarDate;
