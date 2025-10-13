import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './_Pagination.scss';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    Button,
} from '@Reptile/Components/Atoms';
const _Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classnames('pagination-container', {
                [className]: className,
            })}
        >
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1,
                })}
                onClick={onPrevious}
            >
                <Button icon={<ArrowLeftIcon />} iconPosition={'left'}>
                    Previous
                </Button>
            </li>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return (
                        <Button className='pagination-item dots'>
                            &#8230;
                        </Button>
                    );
                }

                return (
                    <Button
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage,
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                );
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage,
                })}
                onClick={onNext}
            >
                <Button icon={<ArrowRightIcon />} iconPosition={'right'}>
                    Next
                </Button>
            </li>
        </ul>
    );
};

export default _Pagination;
