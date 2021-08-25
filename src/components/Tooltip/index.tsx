import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { genericMemo } from '../../utils';
import { usePopupFeatures } from '../Popup';
import useUnmountTransition from '../../hooks/useUnmountTransition';

import styles from './styles.css';

export interface Props {
    className?: string;
    contentClassName?: string;
    children: React.ReactNode;
    delay?: number;
    trackMousePosition?: boolean;
}

function Tooltip(props: Props) {
    const {
        children,
        className,
        contentClassName,
        delay = 200,
    } = props;

    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const timeoutRef = React.useRef<number | undefined>();
    const [hoveredOnParent, setHoveredOnParent] = React.useState(false);
    const [hoveredOnTooltip, setHoveredOnTooltip] = React.useState(false);
    const hovered = hoveredOnParent || hoveredOnTooltip;
    const [show, setShow] = React.useState(hovered);
    const [delayedShow, setDelayedShow] = React.useState<boolean | undefined>();

    React.useEffect(() => {
        setDelayedShow(show);
    }, [show]);

    const {
        dummyRef,
        popupChildren,
    } = usePopupFeatures({
        children,
        className: _cs(styles.tooltip, className),
        contentClassName: _cs(styles.content, contentClassName),
        elementRef: tooltipRef,
        show,
        tipClassName: styles.tip,
    });

    const handleParentMouseEnter = React.useCallback(() => {
        setHoveredOnParent(true);
    }, []);

    const handleParentMouseLeave = React.useCallback(() => {
        setHoveredOnParent(false);
    }, []);

    const handleTooltipMouseEnter = React.useCallback(() => {
        setHoveredOnTooltip(true);
    }, []);

    const handleTooltipMouseLeave = React.useCallback(() => {
        setHoveredOnTooltip(false);
    }, []);

    React.useEffect(() => {
        window.clearTimeout(timeoutRef.current);

        if (hovered) {
            timeoutRef.current = window.setTimeout(() => {
                setShow(true);
            }, delay);
        } else {
            timeoutRef.current = window.setTimeout(() => {
                setShow(false);
            }, delay);
        }
    }, [hovered, delay]);

    React.useEffect(() => {
        if (delayedShow && tooltipRef.current) {
            tooltipRef.current.addEventListener('mouseenter', handleTooltipMouseEnter);
            tooltipRef.current.addEventListener('mouseleave', handleTooltipMouseLeave);
        }

        const tooltipEl = tooltipRef.current;

        return () => {
            if (tooltipEl) {
                tooltipEl.removeEventListener('mouseenter', handleTooltipMouseEnter);
                tooltipEl.removeEventListener('mouseleave', handleTooltipMouseLeave);
            }
        };
    }, [delayedShow, tooltipRef, handleTooltipMouseEnter, handleTooltipMouseLeave]);

    React.useEffect(() => {
        const { current: el } = dummyRef;

        if (el && el.parentElement) {
            el.parentElement.addEventListener('mouseenter', handleParentMouseEnter);
            el.parentElement.addEventListener('mouseleave', handleParentMouseLeave);
        }

        return () => {
            if (el && el.parentElement) {
                el.parentElement.removeEventListener('mouseenter', handleParentMouseEnter);
                el.parentElement.removeEventListener('mouseleave', handleParentMouseLeave);
            }
        };
    }, [dummyRef, handleParentMouseEnter, handleParentMouseLeave]);

    const shouldUnmount = useUnmountTransition(show);

    return (
        <>
            <div
                ref={dummyRef}
                className={styles.dummy}
            />
            { !shouldUnmount && popupChildren }
        </>
    );
}

export default genericMemo(Tooltip);
