import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Svg from '../Svg';
import { genericMemo } from '../../utils';

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
import crutchesSvg from './images/crutches.svg';
import icecreamSvg from './images/icecream.svg';

import styles from './styles.css';

export type SizeTypes = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
export type KrakenTypes = 'ballon' | 'exercise'
    | 'experiment' | 'hi' | 'search' | 'skydive' | 'work' | 'coffee'
    | 'fat' | 'move' | 'read' | 'sing' | 'skate' | 'sleep' | 'standby' | 'whip' | 'crutches' | 'icecream';

const sizeToStyleMap: {
    [key in SizeTypes]: string;
} = {
    extraSmall: styles.extraSmall,
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    extraLarge: styles.extraLarge,
};

const variantToSvgMap: {
    [key in KrakenTypes]: string;
} = {
    ballon: ballonSvg,
    exercise: exerciseSvg,
    experiment: experimentSvg,
    search: searchSvg,
    skydive: skydiveSvg,
    work: workSvg,
    coffee: coffeeSvg,
    fat: fatSvg,
    move: moveSvg,
    read: readSvg,
    sing: singSvg,
    skate: skateSvg,
    sleep: sleepSvg,
    standby: standbySvg,
    whip: whipSvg,
    hi: hiSvg,
    crutches: crutchesSvg,
    icecream: icecreamSvg,
};

export interface Props {
    className?: string;
    variant?: KrakenTypes;
    size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
}

function Kraken(props: Props) {
    const {
        className,
        variant = 'hi',
        size = 'small',
    } = props;

    return (
        <Svg
            className={_cs(
                className,
                styles.kraken,
                sizeToStyleMap[size],
            )}
            src={variantToSvgMap[variant]}
        />
    );
}

export default genericMemo(Kraken);
