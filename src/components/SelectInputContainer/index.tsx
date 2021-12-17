import React, { useCallback, useRef } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoChevronDown, IoChevronUp, IoClose } from 'react-icons/io5';

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

type NameType = string | number | undefined;

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
    N extends NameType,
    O,
    P extends ContentBaseProps,
    OMISSION extends string,
> = Omit<{
    name: N,
    onOptionClick: (optionKey: OK, option: O, name: N) => void;
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
    optionsPopupContentClassName?: string;
    persistentOptionPopup?: boolean;
    placeholder?: string;
    valueDisplay: string;
    hasValue?: boolean;
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
function SelectInputContainer<OK extends OptionKey, N extends NameType, O extends object, P extends ContentBaseProps>(
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
        optionsPopupContentClassName,
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
        onDropdownShownChange,
        totalOptionsCount,
        variant,
        inputDescription,
        hasValue,
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);

    const inputSectionRef = useRef<HTMLDivElement>(null);
    const inputElementRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const [showDropdown, setShowDropdown] = React.useState(false);

    const handleSearchInputChange = useCallback(
        (value) => {
            if (!showDropdown) {
                onDropdownShownChange(true);
            }
            onSearchTextChange(value);
        },
        [
            showDropdown,
            onDropdownShownChange,
            onSearchTextChange,
        ],
    );

    const handleShowDropdown = useCallback(
        () => {
            setShowDropdown((prevShown) => {
                if (!prevShown) {
                    onDropdownShownChange(true);
                }

                return true;
            });
        },
        [onDropdownShownChange],
    );

    const handleHideDropdown = useCallback(
        () => {
            setShowDropdown(false);
        },
        [],
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
        (isClickedOnPopup: boolean, isClickedOnParent: boolean) => {
            const isClickedWithin = isClickedOnPopup || isClickedOnParent;
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

    const handlePopupUnmount = useCallback(
        () => {
            onDropdownShownChange(false);
        },
        [onDropdownShownChange],
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
        showDropdown,
        handlePopupBlur,
        popupRef,
        inputSectionRef,
    );

    const handleKeyDown = useKeyboard(
        focusedKey,
        optionKeySelector,
        options,
        showDropdown,

        onFocusedKeyChange,
        handleHideDropdown,
        handleShowDropdown,
        handleOptionClick,
    );

    let popupContent: React.ReactNode | null;
    // eslint-disable-next-line react/destructuring-assignment
    if (props.grouped) {
        popupContent = (
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
        popupContent = (
            <List
                data={options}
                keySelector={optionKeySelector}
                renderer={GenericSelectOption}
                rendererParams={optionListRendererParams}
            />
        );
    }

    return (
        <InputContainer
            inputSectionRef={inputSectionRef}
            actions={(
                <>
                    {actions}
                    {!readOnly && !nonClearable && hasValue && (
                        <Button
                            onClick={onClear}
                            disabled={disabled}
                            variant="action"
                            name={undefined}
                            title="Clear"
                        >
                            <IoClose />
                        </Button>
                    )}
                    {!readOnly && (
                        showDropdown
                            ? <IoChevronUp onClick={handleHideDropdown} />
                            : <IoChevronDown onClick={handleSearchInputClick} />
                    )}
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
            variant={variant}
            input={(
                <RawInput
                    name={name}
                    elementRef={inputElementRef}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                    value={(showDropdown || focused) ? searchText : valueDisplay}
                    onChange={handleSearchInputChange}
                    onClick={handleSearchInputClick}
                    onFocus={() => onFocusedChange(true)}
                    onBlur={() => onFocusedChange(false)}
                    placeholder={valueDisplay || placeholder}
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                />
            )}
            inputDescription={inputDescription}
        >
            <Popup
                parentRef={inputSectionRef}
                elementRef={popupRef}
                className={_cs(optionsPopupClassName, styles.popup)}
                contentClassName={_cs(
                    styles.popupContent,
                    // eslint-disable-next-line react/destructuring-assignment
                    props.grouped && styles.grouped,
                    optionsPopupContentClassName,
                )}
                show={showDropdown}
                onUnmount={handlePopupUnmount}
            >
                {popupContent}
                <EmptyOptions
                    filtered={optionsFiltered}
                    pending={optionsPending}
                    optionsCount={options.length}
                    totalOptionsCount={totalOptionsCount}
                />
            </Popup>
        </InputContainer>
    );
}

export default SelectInputContainer;
