import { Button, ProgressCircle, Text } from '@Reptile/Components/Atoms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import React, { useEffect } from 'react';

import './_ThemesManagerList.scss';
import { Pagination } from '@Reptile/Components/Molecules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const _ThemesManagerList = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IThemesManagerController
>(({ controller }) => {
    useInitController(controller);

    useEffect(() => {
        void controller.getAllThemes();
    }, [controller]);

    const onPageClick = (page: number) => {
        void controller.updatePage(page);
    };

    return (
        <div className='rt-themes-manager-list'>
            {controller.status.status === 'initial' ||
            controller.status.status === 'pending' ? (
                <ProgressCircle
                    className={'confirmation-loading'}
                    variant='indeterminate'
                    size='xs'
                />
            ) : (
                <>
                    <div className='rt-themes-list'>
                        {controller.themes.length !== 0 ? (
                            controller.themes.map((theme) => {
                                return (
                                    <Button
                                        variant={'contained'}
                                        color={'gray'}
                                        className={`theme-list-item ${theme?.isActive ? 'active-item' : ''}`}
                                        key={theme.id}
                                        onClick={() =>
                                            controller.navigateToThemesEdit(
                                                theme.id
                                            )
                                        }
                                    >
                                        {theme?.isActive && <FontAwesomeIcon className='active-icon' icon={faCheckCircle} color='#37ab37' />}
                                        {theme.name}
                                    </Button>
                                );
                            })
                        ) : (
                            <Text color={'black'} weight={'bold'} size={'h3'}>
                                Please add a publication to edit themes
                            </Text>
                        )}
                    </div>
                    {controller.totalPages > 1 ? (
                        <Pagination
                            totalPages={controller.totalPages}
                            currentPage={controller.pageNumber}
                            onPageClick={onPageClick}
                        />
                    ) : null}
                </>
            )}
        </div>
    );
});

export default _ThemesManagerList;
