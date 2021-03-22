import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Card from '../Card';
import Container, { Props as ContainerProps } from '../Container';

import styles from './styles.css';

export type Props = ContainerProps;

function ContainerCard(props: Props) {
    const {
        className,
        headerClassName,
        contentClassName,
        ...otherProps
    } = props;

    return (
        <Card className={_cs(styles.containerCard, className)}>
            <Container
                className={styles.container}
                headerClassName={_cs(styles.header, headerClassName)}
                contentClassName={_cs(styles.content, contentClassName)}
                {...otherProps}
            />
        </Card>
    );
}

export default ContainerCard;
