import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Container, { Props as ContainerProps } from '../Container';
import { genericMemo } from '../../utils';

import styles from './styles.css';

export type Props = ContainerProps;

function ContainerCard(props: Props) {
    const {
        className,
        headerClassName,
        ...otherProps
    } = props;

    return (
        <Container
            className={_cs(styles.containerCard, className)}
            headerClassName={_cs(styles.header, headerClassName)}
            {...otherProps}
        />
    );
}

export default genericMemo(ContainerCard);
