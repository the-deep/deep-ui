import React from 'react';
import SearchMultiSelectInput, {
    Props as SearchMultiSelectInputProps,
} from '../SearchMultiSelectInput';
import { rankedSearchOnList, genericMemo } from '../../utils';

type Def = { containerClassName?: string };
type NameType = string | number | undefined;
type OptionKey = string | number;

// FIXME: the omissions is not correct
// we need multiple omission for SearchMultiSelectInputProps
export type Props<
    T extends OptionKey,
    GT extends OptionKey,
    K extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
> = SearchMultiSelectInputProps<T, GT, K, O, P, 'onSearchValueChange' | 'searchOptions' | 'onShowDropdownChange' | 'totalOptionsCount'>;

// eslint-disable-next-line @typescript-eslint/ban-types
function MultiSelectInput<
    T extends OptionKey,
    GT extends OptionKey,
    K extends NameType,
    O extends object,
    P extends Def
>(
    props: Props<T, GT, K, O, P>,
) {
    const {
        options,
        ...otherProps
    } = props;

    return (
        <SearchMultiSelectInput
            {...otherProps}
            options={options}
            sortFunction={rankedSearchOnList}
            searchOptions={options}
        />
    );
}

export default genericMemo(MultiSelectInput);
