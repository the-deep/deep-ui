import React, { useState, useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { MdFileUpload } from 'react-icons/md';

import useUiModeClassName from '../../hooks/useUiModeClassName';
import InputContainer, { Props as InputContainerProps } from '../InputContainer';
import RawInput, { Props as RawInputProps } from '../RawInput';
import styles from './styles.css';

type InheritedProps<T> = (Omit<InputContainerProps, 'input'> & Omit<RawInputProps<T>, 'onChange'>);
export interface Props<T extends string> extends InheritedProps<T> {
    inputElementRef?: React.RefObject<HTMLInputElement>;
    inputClassName?: string;
    showStatus?: boolean;
    onChange?: (files: File[]) => void;
}

function FileInput<T extends string>(props: Props<T>) {
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
        value,
        onChange,
        showStatus = true,
        name,
        multiple,
        accept,
        ...fileInputProps
    } = props;

    const uiModeClassName = useUiModeClassName(uiMode, styles.light, styles.dark);

    const dragEnterRef = React.useRef(0);
    const [status, setStatus] = useState<string>('No file chosen');
    const [isBeingDraggedOver, setIsBeingDraggedOver] = React.useState(false);

    const isValidFile = useCallback((fileName: string, mimeType: string, acceptString?: string) => {
        // if there is no accept string, anything is valid
        if (!acceptString) {
            return true;
        }
        const extensionMatch = /\.\w+$/.exec(fileName);
        const mimeMatch = /^.+\//.exec(mimeType);

        const fileTypeList = acceptString.split(/,\s+/);
        return fileTypeList.some((fileType) => {
            // check mimeType such as image/png or image/*
            if (mimeType === fileType || (!!mimeMatch && `${mimeMatch[0]}*` === fileType)) {
                return true;
            }
            return !!extensionMatch && extensionMatch[0].toLowerCase() === fileType.toLowerCase();
        });
    }, []);

    const handleDragEnter = useCallback(() => {
        if (dragEnterRef.current === 0) {
            setIsBeingDraggedOver(true);
        }

        dragEnterRef.current += 1;
    }, [setIsBeingDraggedOver]);

    const handleDragLeave = useCallback(() => {
        dragEnterRef.current -= 1;

        if (dragEnterRef.current === 0) {
            setIsBeingDraggedOver(false);
        }
    }, [setIsBeingDraggedOver]);

    const getStatus = useCallback((files: File[]) => {
        if (files && files.length > 1) {
            return `${files?.length} files selected`;
        }
        if (files && files.length === 0) {
            return 'Invalid files selected';
        }
        if (files) {
            return files[0]?.name;
        }
        return 'No file chosen';
    }, []);

    const handleChange = useCallback(
        (_: string | undefined, __: T, e?: React.FormEvent<HTMLInputElement>) => {
            if (e) {
                const { files: newFiles } = (e.target as HTMLInputElement);
                if (newFiles) {
                    const fileList = Array.from(newFiles);
                    const validFiles = fileList.filter((f) => isValidFile(f.name, f.type, accept));
                    const newStatus = getStatus(validFiles);
                    setStatus(newStatus);
                    if (onChange) {
                        onChange(validFiles);
                    }
                }
            }
        }, [onChange, isValidFile, accept, getStatus],
    );

    const handleDrop: React.DragEventHandler<HTMLDivElement> = useCallback((e) => {
        e.preventDefault();
        const fileList = Array.from(e.dataTransfer.files);
        const validFiles = fileList.filter((f) => isValidFile(f.name, f.type, accept));
        if (!multiple && fileList.length > 1) {
            setStatus('Multiple file selection no allowed. Please, select a single file.');
        } else {
            const newStatus = getStatus(validFiles);
            setStatus(newStatus);
            if (onChange) {
                onChange(validFiles);
            }
        }
        e.dataTransfer.clearData();
        dragEnterRef.current = 0;
        setIsBeingDraggedOver(false);
    }, [
        getStatus,
        multiple,
        onChange,
        setIsBeingDraggedOver,
        accept,
        isValidFile,
    ]);

    const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    return (
        <InputContainer
            containerRef={containerRef}
            inputSectionRef={inputSectionRef}
            actions={actions}
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
            inputContainerClassName={inputContainerClassName}
            label={label}
            labelContainerClassName={labelContainerClassName}
            readOnly={readOnly}
            uiMode={uiMode}
            input={(
                <div
                    className={_cs(
                        styles.inputWrapper,
                        uiModeClassName,
                        !!error && styles.errored,
                        inputClassName,
                        isBeingDraggedOver && styles.draggedOver,
                    )}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                >
                    {!disabled && (
                        <div className={_cs(styles.dropOverlay)} />
                    )}
                    <label
                        className={styles.label}
                    >
                        <MdFileUpload />
                        <RawInput<T>
                            {...fileInputProps}
                            className={styles.input}
                            elementRef={inputElementRef}
                            readOnly={readOnly}
                            uiMode={uiMode}
                            disabled={disabled}
                            value={value}
                            name={name}
                            onChange={handleChange}
                            multiple={multiple}
                            accept={accept}
                            type="file"
                        />
                    </label>
                    {showStatus && (
                        <p className={styles.status}>
                            {status}
                        </p>
                    )}
                </div>
            )}
        />
    );
}

export default FileInput;
