import React from 'react';
import { Text } from '@Reptile/Components/Atoms';

import './_OrganizationContentHeader.scss';
const _OrganizationContentHeader = () => {
    return (
        <thead className='rt-content-header'>
            <tr>
                <th>
                    <Text color='light-gray'>Organizations Name</Text>
                </th>
                <th className='text-right'>
                    <div className='flex_end'>
                        {' '}
                        <Text color='light-gray'>Options</Text>
                    </div>
                </th>
                <th></th>
            </tr>
        </thead>
    );
};

export default _OrganizationContentHeader;
