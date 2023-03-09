import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import SearchSelectInput, {
    Props as SearchSelectInputProps,
} from '../../src/components/SearchSelectInput';
import useQuery, { entityListTransformer } from '../../src/utils/useQuery';

export default {
    title: 'Input/SearchSelectInput',
    component: SearchSelectInput,
    argTypes: {},
};

interface Option {
    id: string;
    name: string;
}

const options: Option[] = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
    { id: '3', name: 'Grapes' },
    { id: '4', name: 'Avocado' },
    { id: '5', name: 'Pear' },
];

// eslint-disable-next-line max-len
const Template: Story<SearchSelectInputProps<string, string, Option, { containerClassName?: string }, never>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    const [searchValue, setSearchValue] = useState('');
    const [opened, setOpened] = useState(false);
    const [cacheOptions, setCacheOptions] = useState<Option[] | undefined | null>([
        options[0],
    ]);

    const [pending, searchOptions, , totalCount] = useQuery(
        options,
        searchValue,
        entityListTransformer,
        !opened,
    );

    return (
        <SearchSelectInput
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
    value: '1',
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: '1',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: '1',
    readOnly: true,
};

const HiddenOptionsTemplate: Story<
SearchSelectInputProps<string, string, Option, { containerClassName?: string }, never>
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

    const [pending, searchOptions] = useQuery(
        options,
        searchValue,
        entityListTransformer,
        !opened,
    );
    return (
        <SearchSelectInput
            label="Vegetables"
            {...props}
            totalOptionsCount={200}
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

export const ShowHiddenOptions = HiddenOptionsTemplate.bind({});
ShowHiddenOptions.args = {
    handleShowMoreClick: () => console.warn('I am clicked!'),
};
