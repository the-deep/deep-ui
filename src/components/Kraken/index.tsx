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
import coffeeSvg from './images/coffee.svg';
import fatSvg from './images/fat.svg';
import moveSvg from './images/move.svg';
import readSvg from './images/read.svg';
import singSvg from './images/sing.svg';
import skateSvg from './images/skate.svg';
import sleepSvg from './images/sleep.svg';
import standbySvg from './images/standby.svg';
import whipSvg from './images/whip.svg';

import styles from './styles.css';

export type SizeTypes = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
export type KrakenTypes = 'ballon' | 'exercise'
| 'experiment' | 'hi' | 'search' | 'skydive' | 'work' | 'coffee'
| 'fat' | 'move' | 'read' | 'sing' | 'skate' | 'sleep' | 'standby' | 'whip';

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
    variant?: KrakenTypes;
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
        case 'coffee':
            src = coffeeSvg;
            break;
        case 'fat':
            src = fatSvg;
            break;
        case 'move':
            src = moveSvg;
            break;
        case 'read':
            src = readSvg;
            break;
        case 'sing':
            src = singSvg;
            break;
        case 'skate':
            src = skateSvg;
            break;
        case 'sleep':
            src = sleepSvg;
            break;
        case 'standby':
            src = standbySvg;
            break;
        case 'whip':
            src = whipSvg;
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
