import {
    ArrowLeftIcon,
    ArrowRightIcon,
    Button,
} from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import React from 'react';

import './_Pagination.scss';

const _Pagination = reactive<Reptile.Props.PaginationProps>(
    ({ currentPage, totalPages }, { onPageClick }) => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        const handlePageClick = (page: number) => {
            onPageClick(page);
        };

        let startPage = currentPage - 2;
        let endPage = currentPage + 2;

        if (startPage < 1) {
            endPage += 1 - startPage;
            startPage = 1;
        }

        if (endPage > totalPages) {
            endPage = totalPages;
        }

        const buttons = [];
        for (let page = startPage; page <= endPage; page++) {
            buttons.push(
                <Button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    color={'primary'}
                    variant={currentPage === page ? 'contained' : 'outlined'}
                >
                    {page}
                </Button>
            );
        }

        buttons.unshift(
            <Button
                key='prev'
                onClick={() => handlePageClick(currentPage - 1)}
                className='prev-button'
                disabled={currentPage === pages[0]}
                icon={<ArrowLeftIcon />}
                iconPosition={'left'}
            >
                Prev
            </Button>
        );

        buttons.push(
            <Button
                key='next'
                onClick={() => handlePageClick(currentPage + 1)}
                className='next-button'
                disabled={currentPage === pages[pages.length - 1]}
                icon={<ArrowRightIcon />}
                iconPosition={'right'}
            >
                Next
            </Button>
        );

        return <div className='rt-pagination'>{buttons}</div>;
    }
);

export default _Pagination;
