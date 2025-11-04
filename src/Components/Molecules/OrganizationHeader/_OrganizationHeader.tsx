import React from 'react';
import { Button, Tag, Text } from '@Reptile/Components/Atoms';

import './_OrganizationHeader.scss';
import { reactive } from '@Reptile/Framework';

const _OrganizationHeader = reactive<Reptile.Props.OrganizationHeaderProps>(
    ({ totalOrgs }, { modalAdd }) => {
        return (
            <div className='rt-organization-container'>
                <div className='header'>
                    <div className='title-container'>
                        <Text
                            className='title'
                            size={'h3'}
                            weight={'semibold'}
                            color={'black'}
                        >
                            Organizations
                        </Text>
                        <Tag label={totalOrgs.toString()} />
                        <Button
                            color={'primary'}
                            onClick={() => {
                                modalAdd();
                            }}
                        >
                            Add Organisation
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
);

export default _OrganizationHeader;
