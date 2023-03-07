import React from 'react';
import SearchSelectInput, {
    Props as SearchSelectInputProps,
} from '../SearchSelectInput';
import {
    rankedSearchOnList,
    genericMemo,
} from '../../utils';

type Def = { containerClassName?: string };
type OptionKey = string | number;
type NameType = string | number | undefined;

// FIXME: the omissions is not correct
// we need multiple omission for SearchMultiSelectInputProps
export type Props<
    T extends OptionKey,
    GT extends OptionKey,
    K extends NameType,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
> = SearchSelectInputProps<T, GT, K, O, P, 'onSearchValueChange' | 'searchOptions' | 'searchOptionsShownInitially' | 'totalOptionsCount'>;

// eslint-disable-next-line @typescript-eslint/ban-types
function SelectInput<
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
        <SearchSelectInput
            {...otherProps}
            options={options}
            searchOptions={options}
            sortFunction={rankedSearchOnList}
        />
    );
}

export default genericMemo(SelectInput);
