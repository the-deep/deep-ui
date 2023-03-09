import React, { useCallback, useMemo, useState } from 'react';
import {
    _cs,
    listToMap,
    unique,
    isDefined,
} from '@togglecorp/fujs';
import { IoCheckmark } from 'react-icons/io5';

import ElementFragments from '../ElementFragments';
import SelectInputContainer, {
    Props as SelectInputContainerProps,
} from '../SelectInputContainer';
import { genericMemo } from '../../utils';

import styles from './styles.css';

interface OptionProps {
    children: React.ReactNode;
    ellipsize?: boolean;
}
function Option(props: OptionProps) {
    const {
        children,
        ellipsize = false,
    } = props;

    return (
        <ElementFragments
            icons={<IoCheckmark className={styles.icon} />}
            childrenContainerClassName={styles.label}
        >
            <div className={_cs(styles.text, ellipsize && styles.ellipsis)}>
                { children }
            </div>
        </ElementFragments>
    );
}

const MemoizedOption = genericMemo(Option);

type Def = { containerClassName?: string, title?: string; };
type OptionKey = string | number;
type NameType = string | number | undefined;

export type Props<
    T extends OptionKey,
    GT extends OptionKey,
    K extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
    OMISSION extends string,
> = Omit<{
    value: T | undefined | null;
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
    selectedOptionsAtTop?: boolean;
    ellipsizeOptions?: boolean;
}, OMISSION> & (
    SelectInputContainerProps<T, GT, K, O, P,
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
) & (
    {
        nonClearable: true;
        onChange: (newValue: T, name: K) => void;
    } | {
        nonClearable?: false;
        onChange: (newValue: T | undefined, name: K) => void;
    }
) & {
    handleShowMoreClick?: () => void;
};

const emptyList: unknown[] = [];

function SearchSelectInput<
    T extends OptionKey,
    GT extends OptionKey,
    K extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
>(
    props: Props<T, GT, K, O, P, never>,
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
        value,
        sortFunction,
        searchOptions: searchOptionsFromProps,
        onSearchValueChange,
        onShowDropdownChange,
        ellipsizeOptions,
        selectedOptionsAtTop = true,
        handleShowMoreClick,
        ...otherProps
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);
    const searchOptions = searchOptionsFromProps ?? (emptyList as O[]);

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

    const valueDisplay = isDefined(value) ? optionsLabelMap[value] ?? '?' : '';

    // NOTE: we can skip this calculation if optionsShowInitially is false
    const selectedOptions = useMemo(
        () => {
            const selectedValue = options?.find((item) => keySelector(item) === value);
            return !selectedValue ? [] : [selectedValue];
        },
        [value, options, keySelector],
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
                        value ? [value] : [],
                        (item) => item,
                        () => true,
                    ),
                );
                setFocusedKey(value ? { key: value } : undefined);
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
            const isActive = key === value;

            return {
                children: optionLabelSelector ? optionLabelSelector(option) : labelSelector(option),
                containerClassName: _cs(styles.option, isActive && styles.active),
                title: labelSelector(option),
                ellipsize: ellipsizeOptions,
            };
        },
        [value, labelSelector, optionLabelSelector, ellipsizeOptions],
    );

    const handleOptionClick = useCallback(
        (k: T, v: O) => {
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
            onChange(k, name);
        },
        [onChange, name, onOptionsChange, keySelector],
    );

    const handleClear = useCallback(
        () => {
            // eslint-disable-next-line react/destructuring-assignment
            if (!props.nonClearable) {
                // eslint-disable-next-line react/destructuring-assignment
                props.onChange(undefined, name);
            }
        },
        // eslint-disable-next-line react/destructuring-assignment, react-hooks/exhaustive-deps
        [name, props.onChange, props.nonClearable],
    );

    return (
        <SelectInputContainer
            {...otherProps}
            name={name}
            options={realOptions}
            optionsPending={optionsPending}
            optionsFiltered={searchInputValue?.length > 0}
            optionKeySelector={keySelector}
            optionRenderer={MemoizedOption}
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
            hasValue={isDefined(value)}
            persistentOptionPopup={false}
            handleShowMoreClick={handleShowMoreClick}
        />
    );
}

export default genericMemo(SearchSelectInput);
