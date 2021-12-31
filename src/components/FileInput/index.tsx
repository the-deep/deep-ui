import React, { useCallback, useMemo, useState } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoClose } from 'react-icons/io5';

import useUiModeClassName from '../../hooks/useUiModeClassName';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';
import Button, { useButtonFeatures } from '../Button';
import useDropHandler from '../../hooks/useDropHandler';
import styles from './styles.css';

enum ErrorType {
    maxFileSizeExceeded = 'MAX_FILE_SIZE_EXCEEDED',
    invalidFileType = 'INVALID_FILE_TYPE',
}
type ValidityStatus = {
    isValid: true;
} | {
    isValid: false;
    errorType: ErrorType;
}
export function isValidFile(
    file: File,
    maxFileSize: number,
    acceptString?: string,
): ValidityStatus {
    if (file.size > (maxFileSize * 1024 * 1024)) {
        return { isValid: false, errorType: ErrorType.maxFileSizeExceeded };
    }
    // if there is no accept string, anything is valid
    if (!acceptString) {
        return { isValid: true };
    }
    const extensionMatch = /\.\w+$/.exec(file.name);
    const mimeMatch = /^.+\//.exec(file.type);

    const fileTypeList = acceptString.split(/,\s+/);
    const isFileValid = fileTypeList.some((fileType) => {
        // check mimeType such as image/png or image/*
        if (file.type === fileType || (!!mimeMatch && `${mimeMatch[0]}*` === fileType)) {
            return { isValid: true };
        }
        return !!extensionMatch && extensionMatch[0].toLowerCase() === fileType.toLowerCase();
    });
    if (!isFileValid) {
        return { isValid: false, errorType: ErrorType.invalidFileType };
    }
    return { isValid: true };
}

type NameType = string | number | undefined;

type InheritedProps<T extends NameType> = (Omit<InputContainerProps, 'input'> & Omit<RawInputProps<T>, 'onChange' | 'value'>);
export type Props<T extends NameType> = InheritedProps<T> & {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
    showStatus?: boolean;
    labelClassName?: string;

    overrideStatus?: boolean;
    status?: string;
    maxFileSize?: number; // NOTE: maxFileSize is in MB.
} & ({
    multiple: true;
    value: File[] | undefined | null;
    onChange?: (files: File[], name: T) => void;
} | {
    multiple?: false;
    value: File | undefined | null;
    onChange?: (files: File | undefined, name: T) => void;
});

function FileInput<T extends NameType>(props: Props<T>) {
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
        inputContainerClassName,
        label,
        labelContainerClassName,
        readOnly,
        uiMode,
        inputElementRef,
        containerRef,
        inputSectionRef,
        inputClassName,
        value, // eslint-disable-line @typescript-eslint/no-unused-vars
        onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        showStatus = true,
        overrideStatus,
        status: statusFromProps,
        name,
        multiple,
        accept,
        labelClassName,
        children,
        variant,
        maxFileSize = 10, // 10MB is default max file size
        ...fileInputProps
    } = props;

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);
    const [internalError, setInternalError] = useState<string>();

    const handleFiles = useCallback(
        (files: FileList | null) => {
            setInternalError(undefined);
            if (!files || !props.onChange) {
                return;
            }

            const fileList = Array.from(files);
            let numberOfFilesExceedSize = 0;
            let numberOfInvalidFiles = 0;

            const validFiles = fileList.filter((f) => {
                const validity = isValidFile(f, maxFileSize, accept);
                if (!validity.isValid) {
                    if (validity.errorType === ErrorType.invalidFileType) {
                        numberOfInvalidFiles += 1;
                    } else {
                        numberOfFilesExceedSize += 1;
                    }
                }
                return validity.isValid;
            });

            if (numberOfFilesExceedSize > 0 && numberOfInvalidFiles > 0) {
                const isSingularFileSizeError = numberOfFilesExceedSize === 1;
                const isSingularInvalidFileError = numberOfInvalidFiles === 1;
                setInternalError(`${numberOfFilesExceedSize} ${isSingularFileSizeError ? 'file exceeds' : 'files exceed'} file size limit of ${maxFileSize} MB.
                    ${numberOfFilesExceedSize} ${isSingularInvalidFileError ? 'file is' : 'files are'} invalid. They are removed from selection.`);
            } else if (numberOfFilesExceedSize > 0) {
                const isSingularError = numberOfFilesExceedSize === 1;
                setInternalError(`${numberOfFilesExceedSize} ${isSingularError ? 'file exceeds' : 'files exceed'} file size limit of ${maxFileSize} MB.
                    ${isSingularError ? 'It is' : 'They are'} removed from selection.`);
            } else if (numberOfInvalidFiles > 0) {
                const isSingularError = numberOfInvalidFiles === 1;
                setInternalError(`${numberOfFilesExceedSize} ${isSingularError ? 'file is' : 'files are'} invalid.
                    ${isSingularError ? 'It is' : 'They are'} removed from selection.`);
            }

            if (validFiles.length <= 0) {
                return;
            }

            if (!props.multiple) {
                const [firstFile] = validFiles;
                const onChangeFromProps = props.onChange;
                onChangeFromProps(firstFile, name);
            } else {
                const onChangeFromProps = props.onChange;
                onChangeFromProps(validFiles, name);
            }
        },
        // eslint-disable-next-line react/destructuring-assignment
        [accept, props.multiple, props.onChange, name, maxFileSize],
    );

    const handleChange = useCallback((
        _: string | undefined,
        __: T,
        e?: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (e) {
            handleFiles(e.target.files);
            e.target.value = '';
        }
    }, [handleFiles]);

    const handleDrop: React.DragEventHandler<HTMLDivElement> = useCallback((e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
    }, [handleFiles]);

    const {
        dropping,
        onDragOver,
        onDragEnter,
        onDragLeave,
        onDrop,
    } = useDropHandler(handleDrop);

    const {
        className: buttonLabelClassName,
        children: buttonLabelChildren,
    } = useButtonFeatures({
        variant: 'secondary',
        className: labelClassName,
        disabled,
        readOnly,
        children: (
            <>
                {children}
                <RawInput<T>
                    {...fileInputProps}
                    className={styles.input}
                    elementRef={inputElementRef}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                    value={undefined}
                    name={name}
                    onChange={handleChange}
                    multiple={multiple}
                    accept={accept}
                    type="file"
                />
            </>
        ),
    });

    const handleClear = useCallback(
        () => {
            setInternalError(undefined);
            if (!props.onChange) {
                return;
            }

            if (props.multiple) {
                const onChangeFromProps = props.onChange;
                onChangeFromProps([], name);
            } else {
                const onChangeFromProps = props.onChange;
                onChangeFromProps(undefined, name);
            }
        },
        // eslint-disable-next-line react/destructuring-assignment
        [props.multiple, props.onChange, name],
    );

    // eslint-disable-next-line react/destructuring-assignment
    const hasValue = props.multiple
        // eslint-disable-next-line react/destructuring-assignment
        ? !!props.value && props.value.length > 0
        // eslint-disable-next-line react/destructuring-assignment
        : !!props.value;

    const status = useMemo(
        () => {
            if (!props.multiple) {
                const singleFile = props.value;
                return singleFile ? singleFile.name : 'No file chosen';
            }

            const multipleFile = props.value;
            if (!multipleFile || multipleFile.length === 0) {
                return 'No file chosen';
            }
            if (multipleFile.length > 1) {
                return `${multipleFile.length} files selected`;
            }
            return multipleFile[0]?.name;
        },
        // eslint-disable-next-line react/destructuring-assignment
        [props.value, props.multiple],
    );

    const visibleStatus = overrideStatus
        ? statusFromProps
        : status;

    return (
        <InputContainer
            containerRef={containerRef}
            inputSectionRef={inputSectionRef}
            actions={(
                <>
                    {actions}
                    {!readOnly && hasValue && (
                        <Button
                            onClick={handleClear}
                            disabled={disabled}
                            variant="action"
                            name={undefined}
                            title="Clear"
                        >
                            <IoClose />
                        </Button>
                    )}
                </>
            )}
            actionsContainerClassName={actionsContainerClassName}
            className={_cs(className, styles.fileInput)}
            disabled={disabled}
            error={error ?? internalError}
            errorContainerClassName={errorContainerClassName}
            hint={hint}
            hintContainerClassName={hintContainerClassName}
            icons={(
                <>
                    {icons}
                    <label
                        className={buttonLabelClassName}
                    >
                        {buttonLabelChildren}
                    </label>
                </>
            )}
            iconsContainerClassName={iconsContainerClassName}
            inputSectionClassName={inputSectionClassName}
            inputContainerClassName={inputContainerClassName}
            label={label}
            labelContainerClassName={labelContainerClassName}
            readOnly={readOnly}
            uiMode={uiMode}
            variant={variant}
            input={(
                <div
                    className={_cs(
                        styles.inputWrapper,
                        uiModeClassName,
                        !!error && styles.errored,
                        inputClassName,
                        dropping && styles.draggedOver,
                    )}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                >
                    {!disabled && (
                        <div className={_cs(styles.dropOverlay)} />
                    )}
                    {showStatus && (
                        <div>
                            {visibleStatus}
                        </div>
                    )}
                </div>
            )}
        />
    );
}

export default FileInput;
