import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import SearchMultiSelectInput, {
    Props as SearchMultiSelectInputProps,
} from '../../src/components/SearchMultiSelectInput';
import BadgeInput from '../../src/components/BadgeInput';
import useQuery, { entityListTransformer } from '../../src/utils/useQuery';

export default {
    title: 'Input/SearchMultiSelectInput',
    component: SearchMultiSelectInput,
    argTypes: {},
};

interface Option {
    id: string;
    name: string;
}

const options: Option[] = [
    { id: '6', name: 'Eggplant' },
    { id: '4', name: 'Gourd' },
    { id: '1', name: 'Potato' },
    { id: '3', name: 'Pumpkin' },
    { id: '5', name: 'Spinach' },
    { id: '2', name: 'Tomato' },
];

const suggestionOptions: Option[] = [
    { id: '2', name: 'Tomato' },
    { id: '4', name: 'Gourd' },
    { id: '6', name: 'Eggplant' },
];

// eslint-disable-next-line max-len
const Template: Story<SearchMultiSelectInputProps<string, string, Option, { containerClassName?: string }, never>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string[]) => {
        updateArgs({ value: e });
    };

    const [searchValue, setSearchValue] = useState('');
    const [opened, setOpened] = useState(false);
    const [cacheOptions, setCacheOptions] = useState<Option[] | undefined | null>([
        options[2],
        options[3],
    ]);

    const [pending, searchOptions, , totalCount] = useQuery(
        options,
        searchValue,
        entityListTransformer,
        !opened,
    );

    return (
        <SearchMultiSelectInput
            label="Vegetables"
            {...props}
            totalOptionsCount={totalCount}
            options={cacheOptions}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.id}
            labelSelector={(d) => d.name}
            searchOptions={searchOptions}
            onSearchValueChange={setSearchValue}
            optionsPending={pending}
            onOptionsChange={setCacheOptions}
            onShowDropdownChange={setOpened}
        />
    );
};

export const NoValue = Template.bind({});
NoValue.args = {
    value: undefined,
};

export const Default = Template.bind({});
Default.args = {
    value: ['1', '3'],
};

export const NormalSorting = Template.bind({});
NormalSorting.args = {
    value: ['1', '3'],
    selectedOptionsAtTop: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: ['1', '3'],
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: ['1', '3'],
    readOnly: true,
};
export const SelectedListShown = Template.bind({});
SelectedListShown.args = {
    value: ['1', '3'],
    selectionListShown: true,
};
export const SelectedListShownDisabled = Template.bind({});
SelectedListShownDisabled.args = {
    value: ['1', '3'],
    selectionListShown: true,
    disabled: true,
};
export const SelectedListShownReadOnly = Template.bind({});
SelectedListShownReadOnly.args = {
    value: ['1', '3'],
    selectionListShown: true,
    readOnly: true,
};

const BadgeInputTemplate: Story<
    SearchMultiSelectInputProps<string, string, Option, { containerClassName?: string }, never>
> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string[]) => {
        updateArgs({ value: e });
    };

    const [searchValue, setSearchValue] = useState('');
    const [opened, setOpened] = useState(false);
    const [cacheOptions, setCacheOptions] = useState<Option[] | undefined | null>([
        options[2],
        options[3],
    ]);

    const [pending, searchOptions, , totalCount] = useQuery(
        options,
        searchValue,
        entityListTransformer,
        !opened,
    );

    return (
        <SearchMultiSelectInput
            label="Vegetables"
            {...props}
            totalOptionsCount={totalCount}
            options={cacheOptions}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.id}
            labelSelector={(d) => d.name}
            searchOptions={searchOptions}
            onSearchValueChange={setSearchValue}
            optionsPending={pending}
            onOptionsChange={setCacheOptions}
            onShowDropdownChange={setOpened}
            inputDescription={(
                <BadgeInput
                    name={undefined}
                    value={value}
                    options={suggestionOptions}
                    keySelector={(s) => s.id}
                    labelSelector={(s) => s.name}
                    onChange={setValue}
                    // NOTE: This is disabled till suggestion supports multi-select inputs
                    disabled
                    suggestionMode
                    smallButtons
                />
            )}
        />
    );
};

export const WithSuggestion = BadgeInputTemplate.bind({});
WithSuggestion.args = {
    value: ['1'],
};

export const SelectedListShownWithSuggestion = BadgeInputTemplate.bind({});
SelectedListShownWithSuggestion.args = {
    value: ['1', '3'],
    selectionListShown: true,
};
