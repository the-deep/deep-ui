import React from 'react';
import {
    TransformWrapper,
    TransformComponent,
} from 'react-zoom-pan-pinch';
import { _cs } from '@togglecorp/fujs';
import {
    AiOutlineZoomIn,
    AiOutlineZoomOut,
    AiOutlineExpand,
} from 'react-icons/ai';

import { useButtonFeatures } from '../Button';

import styles from './styles.css';

type ButtonClickHandler = React.HTMLProps<HTMLButtonElement>['onClick'];
type HTMLImageProps = React.HTMLProps<HTMLImageProps>;

export interface Props {
    className?: string;
    src: HTMLImageProps['src'];
    alt: HTMLImageProps['alt'];
    hideTools?: boolean;
}

function ImagePreview(props: Props) {
    const {
        className,
        src,
        alt,
        hideTools,
    } = props;

    const buttonProps = useButtonFeatures({
        className: styles.toolButton,
        variant: 'action',
    });

    return (
        <div
            className={_cs(
                className,
                styles.imagePreview
            )}
        >
            <TransformWrapper>
                {({
                    zoomIn,
                    zoomOut,
                    resetTransform
                }: {
                    zoomIn: ButtonClickHandler,
                    zoomOut: ButtonClickHandler,
                    resetTransform: ButtonClickHandler,
                }) => (
                    <>
                        {!hideTools && (
                            <div className={styles.tools}>
                                <button
                                    {...buttonProps}
                                    onClick={zoomIn}
                                    title="Zoom in"
                                >
                                    <AiOutlineZoomIn />
                                </button>
                                <button
                                    {...buttonProps}
                                    onClick={zoomOut}
                                    title="Zoom in"
                                >
                                    <AiOutlineZoomOut />
                                </button>
                                <button
                                    {...buttonProps}
                                    onClick={resetTransform}
                                    title="Reset zoom"
                                >
                                    <AiOutlineExpand />
                                </button>
                            </div>
                        )}
                        <TransformComponent>
                            <img
                                className={styles.image}
                                src={src}
                                alt={alt}
                            />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
}

export default ImagePreview;
