import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Svg from '../Svg';
import ballonSvg from './images/ballon.svg';
import hiSvg from './images/hi.svg';
import workSvg from './images/work.svg';
import exerciseSvg from './images/exercise.svg';
import experimentSvg from './images/experiment.svg';
import searchSvg from './images/search.svg';
import skydiveSvg from './images/skydive.svg';

import styles from './styles.css';

export type SizeTypes = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

const sizeToStyleMap: {
    [key in SizeTypes]: string;
} = {
    extraSmall: styles.extraSmall,
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    extraLarge: styles.extraLarge,
};

export interface Props {
    className?: string;
    variant?: 'ballon' | 'exercise' | 'experiment' | 'hi' | 'search' | 'skydive' | 'work';
    size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
    blackAndWhite?: boolean;
}

function Kraken(props: Props) {
    const {
        className,
        variant = 'hi',
        size = 'small',
        blackAndWhite,
    } = props;

    let src = hiSvg;
    switch (variant) {
        case 'ballon':
            src = ballonSvg;
            break;
        case 'exercise':
            src = exerciseSvg;
            break;
        case 'experiment':
            src = experimentSvg;
            break;
        case 'search':
            src = searchSvg;
            break;
        case 'skydive':
            src = skydiveSvg;
            break;
        case 'work':
            src = workSvg;
            break;
        default:
            src = hiSvg;
    }

    return (
        <Svg
            className={_cs(
                className,
                styles.kraken,
                sizeToStyleMap[size],
                blackAndWhite && styles.blackAndWhite,
            )}
            src={src}
        />
    );
}

export default Kraken;
