import React, { useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import { genericMemo } from '../../utils';
import SelectInput from '../SelectInput';
import Button from '../Button';

import styles from './styles.css';

function range(start: number, end: number) {
    const foo: number[] = [];
    for (let i = start; i <= end; i += 1) {
        foo.push(i);
    }
    return foo;
}

class Side {
    public capacity: number;

    public demand: number;

    public excess: number;

    constructor(capacity: number, demand: number) {
        this.capacity = capacity;
        this.demand = demand;
        this.excess = this.capacity - this.demand;
    }

    hasShortage() {
        return this.excess < 0;
    }

    increaseCapacity(inc: number) {
        this.capacity += inc;
        this.excess += inc;
    }

    decreaseCapacity(dec: number) {
        this.capacity += dec;
        this.excess += dec;
    }

    optimizeCapacity() {
        if (this.excess > 0) {
            this.capacity -= this.excess;
            this.excess = 0;
        }
    }
}

type PaginationItem = {
    type: 'button';
    index: number;
} | {
    type: 'span';
    key: string;
    label: string;
} | {
    type: 'fakeButton';
    key: string;
    label: string;
};

function applyPagination(
    totalCapacity: number,
    active: number,
    total: number,
    showAllPages = false,
) {
    if (showAllPages) {
        return range(1, total).map((index): PaginationItem => {
            if (index === active) {
                return { type: 'fakeButton', label: String(active), key: 'active' };
            }
            return { type: 'button', index };
        });
    }

    const oneSideCapacity = (totalCapacity - 1) / 2;
    const startIndex = 1;
    const lastIndex = total;

    // Once upon a time, there were two sides of a town
    // And every year, each got equal amount of ration
    // But, they had a variable demand, and each year it could change
    const right = new Side(oneSideCapacity, active - startIndex);
    const left = new Side(oneSideCapacity, lastIndex - active);

    // So the two sides made a treaty
    // If any of the side had an excess that year and the other side had a shortage,
    // they had to give the excess to the other side
    // That way, all the ration would be used
    const leftExcess = left.excess;
    const rightExcess = right.excess;
    if (right.hasShortage() && leftExcess > 0) {
        right.increaseCapacity(leftExcess);
    } else if (left.hasShortage() && right.excess > 0) {
        left.increaseCapacity(rightExcess);
    }

    left.optimizeCapacity();
    right.optimizeCapacity();

    const lst: PaginationItem[] = [];

    if (right.capacity > 0) {
        if (right.excess >= 0) {
            lst.push(
                ...range(startIndex, active - 1).map((i) => ({ type: 'button' as const, index: i })),
            );
        } else {
            lst.push(
                { type: 'button', index: startIndex },
                { type: 'span', label: '…', key: 'startTick' },
                ...range(active - (right.capacity - 2), active - 1).map((i) => ({ type: 'button' as const, index: i })),
            );
        }
    }

    lst.push(
        { type: 'fakeButton', label: String(active), key: 'active' },
    );

    if (left.capacity > 0) {
        if (left.excess >= 0) {
            lst.push(
                ...range(active + 1, lastIndex).map((i) => ({ type: 'button' as const, index: i })),
            );
        } else {
            lst.push(
                ...range(active + 1, active + (left.capacity - 2)).map((i) => ({ type: 'button' as const, index: i })),
                { type: 'span', label: '...', key: 'endTick' },
                { type: 'button', index: lastIndex },
            );
        }
    }

    return lst;
}

interface PagerOption {
    key: number;
    label: string;
}

const defaultItemPerPageOptions: PagerOption[] = [
    { label: '10 / page', key: 10 },
    { label: '25 / page', key: 25 },
    { label: '50 / page', key: 50 },
];

const itemsPerPageKeySelector = (o: PagerOption) => o.key;
const itemsPerPageLabelSelector = (o: PagerOption) => o.label;

export type Props = {
    activePage: number;
    className?: string;
    itemsCount: number;
    maxItemsPerPage: number;
    onActivePageChange: (pageNumber: number) => void;
    totalCapacity?: number;
    options?: PagerOption[] | null;
    disabled?: boolean;

    allPagesControlShown?: boolean;
    infoVisibility?: 'hidden' | 'hidden-for-single-page' | 'visible';

    pagesNextPrevControlLabelShown?: boolean;
    pageNextPrevControlHidden?: boolean;
    pagesControlHidden?: boolean;
    pagesControlLabelHidden?: boolean;
} & ({
    itemsPerPageControlHidden: true;
    onItemsPerPageChange?: (pageCapacity: number) => void;
} | {
    itemsPerPageControlHidden?: false;
    onItemsPerPageChange: (pageCapacity: number) => void;
})

function Pager(props: Props) {
    const {
        activePage: activePageProps,
        className,
        itemsCount,
        onActivePageChange,
        options,
        maxItemsPerPage = 25,
        totalCapacity = 7,
        disabled = false,
        infoVisibility = 'visible',
        pagesNextPrevControlLabelShown = false,
        pageNextPrevControlHidden,
        pagesControlHidden,
        pagesControlLabelHidden,
        allPagesControlShown = false,
    } = props;

    const showingTitle = 'Showing';
    const ofTitle = 'of';
    const rangeIndicator = '-';

    // NOTE: activePage can never be 0
    const activePage = Math.max(activePageProps, 1);
    // NOTE: number of pages can never be 0
    const numPages = Math.max(Math.ceil(itemsCount / maxItemsPerPage), 1);

    const offset = (activePage - 1) * maxItemsPerPage;
    const itemsOnPage = Math.min(maxItemsPerPage, itemsCount - offset);

    const currentItemsStart = itemsOnPage > 0 ? offset + 1 : offset;
    const currentItemsEnd = offset + itemsOnPage;

    const pages = applyPagination(totalCapacity, activePage, numPages, allPagesControlShown);

    const pageList = pages.length > 1 && (
        <div
            className={_cs(
                styles.pageList,
                pagesControlLabelHidden && styles.pageNumberHidden,
            )}
        >
            {!pageNextPrevControlHidden && (
                <Button
                    name={activePage - 1}
                    className={styles.pageButton}
                    onClick={onActivePageChange}
                    disabled={activePage <= 1 || disabled}
                    icons={<IoChevronBack />}
                    variant="action"
                >
                    {pagesNextPrevControlLabelShown && (
                        'Previous'
                    )}
                </Button>
            )}
            {!pagesControlHidden && pages.map((page) => {
                if (page.type === 'button') {
                    return (
                        <Button
                            key={`button-${page.index}`}
                            name={page.index}
                            onClick={onActivePageChange}
                            className={_cs(styles.pageButton, styles.pageNumberButton)}
                            disabled={disabled}
                            variant={pagesControlLabelHidden ? 'secondary' : 'action'}
                        >
                            {!pagesControlLabelHidden && (
                                page.index
                            )}
                        </Button>
                    );
                }
                if (page.type === 'fakeButton') {
                    return (
                        <Button
                            key={`button-${page.key}`}
                            variant={pagesControlLabelHidden ? 'primary' : 'action'}
                            name={undefined}
                            className={_cs(
                                styles.pageButton,
                                styles.pageNumberButton,
                                styles.active,
                            )}
                        >
                            {!pagesControlLabelHidden && (
                                page.label
                            )}
                        </Button>
                    );
                }
                return (
                    <div
                        key={`span-${page.key}`}
                        className={styles.pageSpan}
                    >
                        {page.label}
                    </div>
                );
            })}
            {!pageNextPrevControlHidden && (
                <Button
                    name={activePage + 1}
                    onClick={onActivePageChange}
                    disabled={activePage >= numPages || disabled}
                    className={styles.pageButton}
                    actions={<IoChevronForward />}
                    variant="action"
                >
                    {pagesNextPrevControlLabelShown && (
                        'Next'
                    )}
                </Button>
            )}
        </div>
    );

    const hasMultiplePages = itemsCount > maxItemsPerPage;

    const showInfo = useMemo(() => {
        if (infoVisibility === 'visible') {
            return true;
        }
        if (infoVisibility === 'hidden') {
            return false;
        }
        return hasMultiplePages;
    }, [infoVisibility, hasMultiplePages]);

    const info = showInfo && (
        <div className={styles.currentRangeInformation}>
            <div className={styles.showing}>
                {showingTitle}
            </div>
            <div className={styles.range}>
                <div className={styles.from}>
                    {currentItemsStart}
                </div>
                <div className={styles.separator}>
                    {rangeIndicator}
                </div>
                <div className={styles.to}>
                    {currentItemsEnd}
                </div>
            </div>
            <div className={styles.of}>
                {ofTitle}
            </div>
            <div className={styles.total}>
                {itemsCount}
            </div>
        </div>
    );

    const itemsPerPageOptions = options ?? defaultItemPerPageOptions;

    const minOption = useMemo(() => (
        Math.min(0, ...itemsPerPageOptions.map((opt) => opt.key))
    ), [itemsPerPageOptions]);

    // eslint-disable-next-line react/destructuring-assignment
    const itemPerPageControl = !props.itemsPerPageControlHidden && (itemsCount > minOption) && (
        <div className={styles.itemsPerPage}>
            <SelectInput
                name="itemsPerPageSelection"
                className={styles.input}
                options={itemsPerPageOptions}
                keySelector={itemsPerPageKeySelector}
                labelSelector={itemsPerPageLabelSelector}
                value={maxItemsPerPage}
                // eslint-disable-next-line react/destructuring-assignment
                onChange={props.onItemsPerPageChange}
                disabled={disabled}
                placeholder=""
                optionsPopupClassName={styles.perPageOptionPopup}
                nonClearable
            />
        </div>
    );

    if (!pageList && !itemPerPageControl && !info) {
        return null;
    }

    return (
        <div className={_cs(className, styles.pager)}>
            {pageList}
            {(info || itemPerPageControl) && (
                <div className={styles.infoAndConfig}>
                    {info}
                    {itemPerPageControl}
                </div>
            )}
        </div>
    );
}
export default genericMemo(Pager);
