import React, { useCallback, useRef } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io';

import GenericSelectOption, {
    ContentBaseProps,
    OptionKey,
} from '../GenericSelectOption';
import Popup from '../Popup';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput from '../RawInput';
import Button from '../Button';
import List from '../List';
import useBlurEffect from '../../hooks/useBlurEffect';
import useKeyboard from '../../hooks/useKeyboard';

import EmptyOptions from './EmptyOptions';
import styles from './styles.css';

interface GroupProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    headerContainerClassName?: string;
    childrenContainerClassName?: string;
}

function Group({
    className,
    title,
    children,
    headerContainerClassName,
    childrenContainerClassName,
}: GroupProps) {
    return (
        <div className={_cs(className, styles.group)}>
            <header
                className={_cs(headerContainerClassName, styles.groupHeader)}
                title={title}
            >
                {title}
            </header>
            <div className={_cs(childrenContainerClassName, styles.groupChildren)}>
                { children }
            </div>
        </div>
    );
}

export type Props<
    OK extends OptionKey,
    N,
    O,
    P extends ContentBaseProps,
    OMISSION extends string,
> = Omit<{
    name: N,
    onOptionClick: (optionKey: OK, option: O, name: N) => void;
    dropdownShown: boolean;
    onDropdownShownChange: (value: boolean) => void;
    focused: boolean;
    onFocusedChange: (value: boolean) => void;
    focusedKey: { key: OK, mouse?: boolean } | undefined;
    onFocusedKeyChange: (value: { key: OK, mouse?: boolean } | undefined) => void;
    searchText: string;
    onSearchTextChange: (search: string) => void;
    optionContainerClassName?: string;
    optionKeySelector: (datum: O, index: number) => OK;
    optionRenderer: (props: Pick<P, Exclude<keyof P, 'containerClassName' | 'title'>>) => React.ReactNode;
    optionRendererParams: (optionKey: OK, option: O) => P;
    totalOptionsCount?: number;
    options: O[] | undefined | null;
    optionsPending?: boolean;
    optionsFiltered?: boolean;
    optionsPopupClassName?: string;
    persistentOptionPopup?: boolean;
    placeholder?: string;
    valueDisplay: string;
    nonClearable?: boolean;
    onClear: () => void;
}, OMISSION> & Omit<InputContainerProps, 'input'> & ({
    grouped: true;
    groupLabelSelector: (option: O) => string;
    groupKeySelector: (option: O) => string | number;
} | {
    grouped?: false;
    groupLabelSelector?: undefined;
    groupKeySelector?: undefined;
});

const emptyList: unknown[] = [];

// eslint-disable-next-line @typescript-eslint/ban-types, max-len
function SelectInputContainer<OK extends OptionKey, N extends string, O extends object, P extends ContentBaseProps>(
    props: Props<OK, N, O, P, never>,
) {
    const {
        actions,
        actionsContainerClassName,
        className,
        disabled,
        error,
        errorContainerClassName,
        hint,
        hintContainerClassName,
        icons,
        iconsContainerClassName,
        inputSectionClassName,
        label,
        labelContainerClassName,
        name,
        onOptionClick,
        searchText,
        onSearchTextChange,
        optionContainerClassName,
        optionKeySelector,
        optionRenderer,
        optionRendererParams,
        options: optionsFromProps,
        optionsPopupClassName,
        persistentOptionPopup,
        readOnly,
        placeholder,
        uiMode,
        valueDisplay = '',
        nonClearable,
        onClear,
        optionsPending,
        optionsFiltered,
        focused,
        focusedKey,
        onFocusedKeyChange,
        onFocusedChange,
        dropdownShown,
        onDropdownShownChange,
        totalOptionsCount,
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputSectionRef = useRef<HTMLDivElement>(null);
    const inputElementRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const handleSearchInputChange = useCallback(
        (value) => {
            if (!dropdownShown) {
                onDropdownShownChange(true);
            }
            onSearchTextChange(value);
        },
        [
            dropdownShown,
            onDropdownShownChange,
            onSearchTextChange,
        ],
    );

    const handleShowDropdown = useCallback(
        () => {
            // FIXME: this is not atomic
            // FIXME: call only once
            if (!dropdownShown) {
                onDropdownShownChange(true);
            }
        },
        [
            dropdownShown,
            onDropdownShownChange,
        ],
    );

    const handleHideDropdown = useCallback(
        () => {
            onDropdownShownChange(false);
        },
        [
            onDropdownShownChange,
        ],
    );

    const handleSearchInputClick = useCallback(
        () => {
            if (readOnly) {
                return;
            }
            handleShowDropdown();
        },
        [readOnly, handleShowDropdown],
    );

    const handlePopupBlur = useCallback(
        (isClickedWithin: boolean) => {
            if (!isClickedWithin) {
                handleHideDropdown();
            } else if (persistentOptionPopup && inputElementRef.current) {
                inputElementRef.current.focus();
            }
        },
        [handleHideDropdown, persistentOptionPopup],
    );

    const handleOptionClick = useCallback(
        (valueKey: OK, value: O) => {
            onOptionClick(valueKey, value, name);
            if (!persistentOptionPopup) {
                handleHideDropdown();
            }
        },
        [onOptionClick, handleHideDropdown, persistentOptionPopup, name],
    );

    const optionListRendererParams = useCallback(
        (key, option) => ({
            contentRendererParam: optionRendererParams,
            option,
            optionKey: key,
            focusedKey,
            contentRenderer: optionRenderer,
            onClick: handleOptionClick,
            onFocus: onFocusedKeyChange,
            optionContainerClassName: _cs(optionContainerClassName, styles.listItem),
        }),
        [
            focusedKey,
            handleOptionClick,
            onFocusedKeyChange,
            optionContainerClassName,
            optionRenderer,
            optionRendererParams,
        ],
    );

    const groupRendererParams = useCallback(
        (_: string | number, __: number, values: O[]) => ({
            title: props.grouped ? props.groupLabelSelector(values[0]) : '?',
        }),
        // FIXME: disabling because linter is not smart enough
        // eslint-disable-next-line react-hooks/exhaustive-deps, react/destructuring-assignment
        [props.grouped, props.groupLabelSelector],
    );

    useBlurEffect(
        dropdownShown,
        handlePopupBlur,
        popupRef,
        containerRef,
    );

    const handleKeyDown = useKeyboard(
        focusedKey,
        optionKeySelector,
        options,
        dropdownShown,

        onFocusedKeyChange,
        handleHideDropdown,
        handleShowDropdown,
        handleOptionClick,
    );

    let popup: React.ReactNode | null;
    // eslint-disable-next-line react/destructuring-assignment
    if (props.grouped) {
        popup = (
            <List
                data={options}
                keySelector={optionKeySelector}
                renderer={GenericSelectOption}
                rendererParams={optionListRendererParams}
                grouped
                groupRenderer={Group}
                groupRendererParams={groupRendererParams}
                groupKeySelector={props.groupKeySelector}
            />
        );
    } else {
        popup = (
            <List
                data={options}
                keySelector={optionKeySelector}
                renderer={GenericSelectOption}
                rendererParams={optionListRendererParams}
            />
        );
    }

    return (
        <>
            <InputContainer
                containerRef={containerRef}
                inputSectionRef={inputSectionRef}
                actions={(
                    <>
                        {actions}
                        {!readOnly && !nonClearable && (
                            <Button
                                onClick={onClear}
                                disabled={disabled}
                                variant="action"
                                name={undefined}
                                title="Clear"
                            >
                                <IoMdClose />
                            </Button>
                        )}
                        {!readOnly && (dropdownShown ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                    </>
                )}
                actionsContainerClassName={actionsContainerClassName}
                className={className}
                disabled={disabled}
                error={error}
                errorContainerClassName={errorContainerClassName}
                hint={hint}
                hintContainerClassName={hintContainerClassName}
                icons={icons}
                iconsContainerClassName={iconsContainerClassName}
                inputSectionClassName={inputSectionClassName}
                label={label}
                labelContainerClassName={labelContainerClassName}
                readOnly={readOnly}
                uiMode={uiMode}
                input={(
                    <RawInput
                        name={name}
                        elementRef={inputElementRef}
                        readOnly={readOnly}
                        uiMode={uiMode}
                        disabled={disabled}
                        value={(dropdownShown || focused) ? searchText : valueDisplay}
                        onChange={handleSearchInputChange}
                        onClick={handleSearchInputClick}
                        onFocus={() => onFocusedChange(true)}
                        onBlur={() => onFocusedChange(false)}
                        placeholder={valueDisplay || placeholder}
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                    />
                )}
            />
            <Popup
                elementRef={popupRef}
                className={_cs(optionsPopupClassName, styles.popup)}
                contentClassName={styles.popupContent}
                show={dropdownShown}
            >
                {popup}
                <EmptyOptions
                    filtered={optionsFiltered}
                    pending={optionsPending}
                    optionsCount={options.length}
                    totalOptionsCount={totalOptionsCount}
                />
            </Popup>
        </>
    );
}

export default SelectInputContainer;
