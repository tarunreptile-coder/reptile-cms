import React from 'react';
import { AccountsContentHeader } from '@Reptile/Components/Molecules';
import { reactive } from '@Reptile/Framework';
import './_AccountContent.scss';

const _AccountsContent = reactive<Reptile.Props.AccountsContentProps>(
    ({ children }, { sortAccountsBy }) => {
        return (
            <table className='rt-account-content'>
                <AccountsContentHeader sortAccountsBy={sortAccountsBy} />
                <tbody>{children}</tbody>
            </table>
        );
    }
);

export default _AccountsContent;
