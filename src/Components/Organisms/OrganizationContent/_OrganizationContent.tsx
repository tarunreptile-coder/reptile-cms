import React from 'react';
import { OrganizationContentHeader } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import './_OrganizationContent.scss';

const _OrganizationContent = reactive<Reptile.Props.OrganizationContentProps>(
    ({ children }, {}) => {
        return (
            <>
                <div className='organization_table'>
                    <table className='rt-organization-content'>
                        <OrganizationContentHeader />
                        <tbody>{children}</tbody>
                    </table>
                </div>
            </>
        );
    }
);

export default _OrganizationContent;
