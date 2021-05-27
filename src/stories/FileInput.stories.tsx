import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import FileInput, { Props as FileInputProps } from '#components/FileInput';

export default {
    title: 'Input/FileInput',
    component: FileInput,
    argTypes: {},
};

const Template: Story<FileInputProps<string>> = (args) => {
    const [, setValue] = useState<File[]>();

    const handleChange = (v: File[]) => {
        setValue(v);
    };

    return (
        <FileInput
            {...args}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Select a file',
};
export const Multiple = Template.bind({});
Multiple.args = {
    label: 'Select multiple files',
    multiple: true,
};
export const AcceptPdfOnly = Template.bind({});
AcceptPdfOnly.args = {
    label: 'Select pdf files',
    multiple: true,
    accept: '.pdf',
};
