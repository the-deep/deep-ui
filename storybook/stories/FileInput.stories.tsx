import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoCloudUpload } from 'react-icons/io5';
import FileInput, { Props as FileInputProps } from '../../src/components/FileInput';

export default {
    title: 'Input/FileInput',
    component: FileInput,
    argTypes: {},
};

const SingleTemplate: Story<FileInputProps<string>> = (args) => {
    const [value, setValue] = useState<File | undefined>();

    const handleChange = (files: File | undefined) => {
        setValue(files);
    };

    return (
        <FileInput
            {...args}
            multiple={false}
            value={value}
            onChange={handleChange}
        >
            <IoCloudUpload />
        </FileInput>
    );
};

export const Default = SingleTemplate.bind({});
Default.args = {
    label: 'Select a file',
};

const MultipleTemplate: Story<FileInputProps<string>> = (args) => {
    const [value, setValue] = useState<File[]>();

    const handleChange = (files: File[]) => {
        setValue(files);
    };

    return (
        <FileInput
            {...args}
            multiple
            value={value}
            onChange={handleChange}
        >
            <IoCloudUpload />
        </FileInput>
    );
};

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
    label: 'Select multiple files',
};
export const AcceptPdfOnly = MultipleTemplate.bind({});
AcceptPdfOnly.args = {
    label: 'Select pdf files',
    accept: '.pdf',
};
