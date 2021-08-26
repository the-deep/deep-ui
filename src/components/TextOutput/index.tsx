import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import NumberOutput from '../NumberOutput';
import DateOutput from '../DateOutput';

import type { Props as NumberOutputProps } from '../NumberOutput';
import type { Props as DateOutputProps } from '../DateOutput';

import { SpacingTypes } from '../../types';
import styles from './styles.css';

const spacingToStyleMap: {
    [key in SpacingTypes]: string;
} = {
    none: styles.noSpacing,
    compact: styles.compactSpacing,
    comfortable: styles.comfortableSpacing,
    loose: styles.looseSpacing,
};

interface BaseProps {
    className?: string;
    label?: React.ReactNode;
    labelContainerClassName?: string;
    description?: React.ReactNode;
    descriptionContainerClassName?: string;
    valueContainerClassName?: string;
    hideLabelColon?: boolean;
    block?: boolean;
    spacing?: SpacingTypes;
}

export type Props = BaseProps & ({
    valueType: 'number';
    valueProps?: Omit<NumberOutputProps, 'value'>;
    value?: NumberOutputProps['value'];
} | {
    valueType: 'date';
    valueProps?: Omit<DateOutputProps, 'value'>;
    value?: DateOutputProps['value'];
} | {
    valueType?: 'text';
    value?: React.ReactNode;
});

function TextOutput(props: Props) {
    const {
        className,
        label,
        labelContainerClassName,
        valueContainerClassName,
        description,
        descriptionContainerClassName,
        hideLabelColon,
        block,
        spacing = 'comfortable',
    } = props;

    let { value } = props;

    // eslint-disable-next-line react/destructuring-assignment
    if (props.valueType === 'number') {
        value = (
            <NumberOutput
                value={props.value}
                {...props.valueProps}
            />
        );
    // eslint-disable-next-line react/destructuring-assignment
    } else if (props.valueType === 'date') {
        value = props.value ? (
            <DateOutput
                value={props.value}
                {...props.valueProps}
            />
        ) : null;
    }

    return (
        <div
            className={_cs(
                styles.textOutput,
                !hideLabelColon && styles.withLabelColon,
                // NOTE:
                // styles.blok is supposed to be styles.block
                // but we encountered a strange behavior
                block && styles.blok,
                spacingToStyleMap[spacing],
                className,
            )}
        >
            {label && (
                <div className={_cs(styles.label, labelContainerClassName)}>
                    {label}
                </div>
            )}
            <div className={_cs(styles.value, valueContainerClassName)}>
                {value}
            </div>
            {description && (
                <div className={_cs(styles.description, descriptionContainerClassName)}>
                    {description}
                </div>
            )}
        </div>
    );
}

export default genericMemo(TextOutput);
