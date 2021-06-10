import React, { useCallback, useMemo, useState } from 'react';
import {
    _cs,
    listToMap,
    unique,
} from '@togglecorp/fujs';
import { MdCheck } from 'react-icons/md';

import ElementFragments from '../ElementFragments';
import SelectInputContainer, {
    Props as SelectInputContainerProps,
} from '../SelectInputContainer';
import { rankedSearchOnList } from '../../utils';

import styles from './styles.css';

interface OptionProps {
    children: React.ReactNode;
}
function Option(props: OptionProps) {
    const { children } = props;

    return (
        <ElementFragments
            icons={<MdCheck className={styles.icon} />}
            childrenContainerClassName={styles.label}
        >
            <div className={styles.text}>
                { children }
            </div>
        </ElementFragments>
    );
}

type Def = { containerClassName?: string, title?: string; };
type OptionKey = string | number;

export type Props<
    T extends OptionKey,
    K,
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
    >
) & (
    { nonClearable: true; onChange: (newValue: T, name: K) => void }
    | { nonClearable?: false; onChange: (newValue: T | undefined, name: K) => void }
);

const emptyList: unknown[] = [];

function SearchSelectInput<
    T extends OptionKey,
    K extends string,
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
        value,
        sortFunction,
        searchOptions: searchOptionsFromProps,
        onSearchValueChange,
        onShowDropdownChange,
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

    const valueDisplay = value ? optionsLabelMap[value] ?? '?' : '';

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
            const allOptions = unique(
                [...searchOptions, ...selectedOptions],
                keySelector,
            );

            const initiallySelected = allOptions
                .filter((item) => selectedKeys[keySelector(item)]);
            const initiallyNotSelected = allOptions
                .filter((item) => !selectedKeys[keySelector(item)]);

            if (sortFunction) {
                return [
                    ...rankedSearchOnList(initiallySelected, searchInputValue, labelSelector),
                    ...sortFunction(initiallyNotSelected, searchInputValue, labelSelector),
                ];
            }

            return [
                ...rankedSearchOnList(initiallySelected, searchInputValue, labelSelector),
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
            // setShowDropdown(myVal);
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
            };
        },
        [value, labelSelector, optionLabelSelector],
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
            if (!props.nonClearable) {
                props.onChange(undefined, name);
            }
        },
        // eslint-disable-next-line react/destructuring-assignment
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
            persistentOptionPopup={false}
        />
    );
}

export default SearchSelectInput;
