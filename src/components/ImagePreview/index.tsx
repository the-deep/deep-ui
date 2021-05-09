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
    AiOutlineExpandAlt,
    AiOutlineClose,
} from 'react-icons/ai';

import { useButtonFeatures } from '../Button';
import Modal from '../Modal';
import PendingMessage from '../PendingMessage';
import useBooleanState from '../../hooks/useBooleanState';

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

    const [expanded, , setExpandedFalse, , toggleExpanded] = useBooleanState(false);
    const [pending, , setPendingFalse] = useBooleanState(true);

    const buttonProps = useButtonFeatures({
        className: styles.toolButton,
        variant: 'action',
        disabled: pending,
    });

    const children = (
        <div
            className={_cs(
                className,
                styles.imagePreview,
            )}
        >
            { pending && <PendingMessage /> }

            <TransformWrapper
                wheel={{
                    step: 100,
                }}
            >
                {({
                    zoomIn,
                    zoomOut,
                    resetTransform,
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
                                    onClick={toggleExpanded}
                                    title={expanded ? 'Close fullscreen' : 'View fullscreen'}
                                    type="button"
                                >
                                    { expanded ? (
                                        <AiOutlineClose />
                                    ) : (
                                        <AiOutlineExpandAlt />
                                    )}
                                </button>
                                <button
                                    {...buttonProps}
                                    onClick={zoomIn}
                                    title="Zoom in"
                                    type="button"
                                >
                                    <AiOutlineZoomIn />
                                </button>
                                <button
                                    {...buttonProps}
                                    onClick={zoomOut}
                                    title="Zoom in"
                                    type="button"
                                >
                                    <AiOutlineZoomOut />
                                </button>
                                <button
                                    {...buttonProps}
                                    onClick={resetTransform}
                                    title="Reset zoom"
                                    type="button"
                                >
                                    <AiOutlineExpand />
                                </button>
                            </div>
                        )}
                        <TransformComponent>
                            <img
                                onLoad={setPendingFalse}
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

    if (expanded) {
        return (
            <Modal
                className={styles.expandedModal}
                heading={null}
                onCloseButtonClick={setExpandedFalse}
                bodyClassName={styles.body}
            >
                {children}
            </Modal>
        );
    }

    return children;
}

export default ImagePreview;
