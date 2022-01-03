import React from 'react';
import SearchMultiSelectInput, {
    Props as SearchMultiSelectInputProps,
} from '../SearchMultiSelectInput';
import { rankedSearchOnList, genericMemo } from '../../utils';

type Def = { containerClassName?: string };
type NameType = string | number | undefined;
type OptionKey = string | number;

export type Props<
    T extends OptionKey,
    K extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
> = SearchMultiSelectInputProps<T, K, O, P, 'onSearchValueChange' | 'searchOptions' | 'onShowDropdownChange' | 'totalOptionsCount'>;

// eslint-disable-next-line @typescript-eslint/ban-types
function MultiSelectInput<T extends OptionKey, K extends NameType, O extends object, P extends Def>(
    props: Props<T, K, O, P>,
) {
    const {
        name,
        options,
        totalOptionsCount, // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars
        ...otherProps
    } = props;

    return (
        <SearchMultiSelectInput
            {...otherProps}
            name={name}
            options={options}
            sortFunction={rankedSearchOnList}
            searchOptions={options}
        />
    );
}

export default genericMemo(MultiSelectInput);
