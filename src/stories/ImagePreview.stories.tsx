import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import ImagePreview, { Props as ImagePreviewProps } from '../components/ImagePreview';

export default {
    title: 'View/ImagePreview',
    component: ImagePreview,
    argTypes: {},
};

const Template: Story<ImagePreviewProps> = (args) => (
    <div
        style={{
            width: '100%',
            height: '400px',
        }}
    >
        <ImagePreview
            {...args}
        />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    src: 'https://i.imgur.com/5ehANlp.jpg',
    // alt: 'Image cannot be loaded',
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
    src: '',
};
