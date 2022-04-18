import React, { useCallback, useMemo, useState } from 'react';
import {
    _cs,
    listToMap,
    unique,
    isDefined,
} from '@togglecorp/fujs';
import SelectInputContainer, {
    Props as SelectInputContainerProps,
} from '../SelectInputContainer';
import DismissibleList from '../DismissibleList';
import { genericMemo } from '../../utils';
import Option from './Option';

import styles from './styles.css';

type Def = { containerClassName?: string, title?: string; };
type OptionKey = string | number;
type NameType = string | number | undefined;

export type Props<
    T extends OptionKey,
    K extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
    OMISSION extends string,
> = Omit<{
    value: T[] | undefined | null;
    onChange: (newValue: T[], name: K) => void;
    options: O[] | undefined | null;
    searchOptions?: O[] | undefined | null;
    keySelector: (option: O) => T;
    labelSelector: (option: O) => string;
    optionLabelSelector?: (option: O) => React.ReactNode;
    name: K;
    disabled?: boolean;
    readOnly?: boolean;
    onOptionsChange?: React.Dispatch<React.SetStateAction<O[] | undefined | null>>;
    sortFunction?: (options: O[], search: string, labelSelector: (option: O) => string) => O[];
    onSearchValueChange?: (value: string) => void;
    onShowDropdownChange?: (value: boolean) => void;
    selectedOptionContainerClassName?: string;
    selectionListShown?: boolean;
    selectedOptionsAtTop?: boolean;
    ellipsizeOptions?: boolean;
}, OMISSION> & (
    SelectInputContainerProps<T, K, O, P,
        'name'
        | 'nonClearable'
        | 'onClear'
        | 'onOptionClick'
        | 'optionKeySelector'
        | 'optionRenderer'
        | 'optionRendererParams'
        | 'optionsFiltered'
        | 'persistentOptionPopup'
        | 'valueDisplay'
        | 'optionContainerClassName'
        | 'searchText'
        | 'onSearchTextChange'
        | 'dropdownShown'
        | 'onDropdownShownChange'
        | 'focused'
        | 'onFocusedChange'
        | 'focusedKey'
        | 'onFocusedKeyChange'
        | 'hasValue'
    >
);

const emptyList: unknown[] = [];

function SearchMultiSelectInput<
    T extends OptionKey,
    K extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
>(
    props: Props<T, K, O, P, never>,
) {
    const {
        keySelector,
        labelSelector,
        optionLabelSelector,
        name,
        onChange,
        onOptionsChange,
        options: optionsFromProps,
        optionsPending,
        value: valueFromProps,
        sortFunction,
        searchOptions: searchOptionsFromProps,
        onSearchValueChange,
        onShowDropdownChange,
        selectedOptionContainerClassName,
        selectionListShown,
        disabled,
        readOnly,
        inputDescription,
        ellipsizeOptions,
        selectedOptionsAtTop = true,
        ...otherProps
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);
    const searchOptions = searchOptionsFromProps ?? (emptyList as O[]);
    const value = valueFromProps ?? (emptyList as T[]);

    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const [
        focusedKey,
        setFocusedKey,
    ] = React.useState<{ key: T, mouse?: boolean } | undefined>();

    const [selectedKeys, setSelectedKeys] = useState<{
        [key: string]: boolean,
    }>({});

    const optionsLabelMap = useMemo(
        () => (
            listToMap(options, keySelector, labelSelector)
        ),
        [options, keySelector, labelSelector],
    );

    const valueDisplay = useMemo(
        () => (
            value.map((v) => optionsLabelMap[v] ?? '?').join(', ')
        ),
        [value, optionsLabelMap],
    );

    const optionsMap = useMemo(
        () => (
            listToMap(options, keySelector, (i) => i)
        ),
        [options, keySelector],
    );

    // NOTE: we can skip this calculation if optionsShowInitially is false
    const selectedOptions = useMemo(
        () => value.map((valueKey) => optionsMap[valueKey]).filter(isDefined),
        [value, optionsMap],
    );

    const realOptions = useMemo(
        () => {
            const allOptions = searchInputValue
                ? searchOptions
                : unique(
                    [...searchOptions, ...selectedOptions],
                    keySelector,
                );

            if (!selectedOptionsAtTop) {
                return sortFunction
                    ? sortFunction(allOptions, searchInputValue, labelSelector)
                    : allOptions;
            }

            const initiallySelected = allOptions
                .filter((item) => selectedKeys[keySelector(item)]);
            const initiallyNotSelected = allOptions
                .filter((item) => !selectedKeys[keySelector(item)]);

            if (sortFunction) {
                return [
                    ...sortFunction(initiallySelected, searchInputValue, labelSelector),
                    ...sortFunction(initiallyNotSelected, searchInputValue, labelSelector),
                ];
            }

            return [
                ...initiallySelected,
                ...initiallyNotSelected,
            ];
        },
        [
            keySelector,
            labelSelector,
            searchInputValue,
            searchOptions,
            selectedKeys,
            selectedOptions,
            sortFunction,
            selectedOptionsAtTop,
        ],
    );

    const handleSearchValueChange = useCallback(
        (searchValue: string) => {
            setSearchInputValue(searchValue);
            if (onSearchValueChange) {
                onSearchValueChange(searchValue);
            }
        },
        [onSearchValueChange],
    );

    const handleChangeDropdown = useCallback(
        (myVal: boolean) => {
            if (onShowDropdownChange) {
                onShowDropdownChange(myVal);
            }
            if (myVal) {
                setSelectedKeys(
                    listToMap(
                        value,
                        (item) => item,
                        () => true,
                    ),
                );
                setFocusedKey(undefined);
            } else {
                setSelectedKeys({});
                setFocusedKey(undefined);
                setSearchInputValue('');
                if (onSearchValueChange) {
                    onSearchValueChange('');
                }
            }
        },
        [value, onSearchValueChange, onShowDropdownChange],
    );

    const optionRendererParams = useCallback(
        (key: OptionKey, option: O) => {
            // FIXME: use map
            const isActive = value.findIndex((item) => item === key) !== -1;

            return {
                children: optionLabelSelector ? optionLabelSelector(option) : labelSelector(option),
                containerClassName: _cs(styles.option, isActive && styles.active),
                title: labelSelector(option),
                isActive,
                ellipsize: ellipsizeOptions,
            };
        },
        [value, labelSelector, optionLabelSelector, ellipsizeOptions],
    );

    // FIXME: value should not be on dependency list
    const handleOptionClick = useCallback(
        (k: T, v: O) => {
            const newValue = [...value];

            const optionKeyIndex = value.findIndex((d) => d === k);
            if (optionKeyIndex !== -1) {
                newValue.splice(optionKeyIndex, 1);
            } else {
                newValue.push(k);

                if (onOptionsChange) {
                    onOptionsChange(((existingOptions) => {
                        const safeOptions = existingOptions ?? [];
                        const opt = safeOptions.find((item) => keySelector(item) === k);
                        if (opt) {
                            return existingOptions;
                        }
                        return [...safeOptions, v];
                    }));
                }
            }

            onChange(newValue, name);
        },
        [value, onChange, name, onOptionsChange, keySelector],
    );

    const handleClear = useCallback(
        () => {
            onChange([], name);
        },
        [name, onChange],
    );

    return (
        <SelectInputContainer
            {...otherProps}
            name={name}
            options={realOptions}
            optionsPending={optionsPending}
            optionsFiltered={searchInputValue?.length > 0}
            optionKeySelector={keySelector}
            optionRenderer={Option}
            optionRendererParams={optionRendererParams}
            optionContainerClassName={styles.optionContainer}
            onOptionClick={handleOptionClick}
            valueDisplay={valueDisplay}
            onClear={handleClear}
            searchText={searchInputValue}
            onSearchTextChange={handleSearchValueChange}
            onDropdownShownChange={handleChangeDropdown}
            focused={focused}
            onFocusedChange={setFocused}
            focusedKey={focusedKey}
            onFocusedKeyChange={setFocusedKey}
            hasValue={isDefined(value) && value.length > 0}
            persistentOptionPopup
            nonClearable={false}
            disabled={disabled}
            readOnly={readOnly}
            inputDescription={(
                <>
                    {inputDescription}
                    {selectionListShown && (
                        <DismissibleList
                            name={name}
                            className={selectedOptionContainerClassName}
                            value={value}
                            data={selectedOptions}
                            keySelector={keySelector}
                            labelSelector={labelSelector}
                            // FIXME: need to intercept this and call onOptionsChange
                            onChange={onChange}
                            disabled={disabled}
                            readOnly={readOnly}
                        />
                    )}
                </>
            )}
        />
    );
}

export default genericMemo(SearchMultiSelectInput);
