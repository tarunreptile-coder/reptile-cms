import React, { useState } from 'react';
import { Checkbox, Text } from '@Reptile/Components/Atoms';
import './_AccountsContentHeader.scss';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { reactive } from '@Reptile/Framework';

const _AccountsContentHeader =
    reactive<Reptile.Props.AccountsContentHeaderProps>(
        ({}, { sortAccountsBy }) => {
            const [order, setOrder] = useState('descending');

            const orderByArrow = (sortByValue: string) => {
                sortAccountsBy(sortByValue, order);
            };
            return (
                <thead className='rt-content-header'>
                    <tr>
                        <th></th>
                        <th>
                            <div
                                className='name'
                                onClick={() => orderByArrow('username')}
                            >
                                <Text color='light-gray'>Name</Text>
                                {order === 'ascending' ? (
                                    <Icon
                                        onClick={() => {
                                            setOrder('descending');
                                        }}
                                        icon={faCaretUp}
                                    />
                                ) : (
                                    <Icon
                                        onClick={() => {
                                            setOrder('ascending');
                                        }}
                                        icon={faCaretDown}
                                    />
                                )}
                            </div>
                        </th>
                        <th>
                            <div className='role-header'>
                                <Text className='role' color='light-gray'>
                                    Role
                                </Text>
                            </div>
                        </th>
                        <th>
                            <div
                                className='email'
                                onClick={() => orderByArrow('email')}
                            >
                                <Text color='light-gray'>Email Address</Text>
                                {order === 'ascending' ? (
                                    <Icon
                                        onClick={() => {
                                            setOrder('descending');
                                        }}
                                        icon={faCaretUp}
                                    />
                                ) : (
                                    <Icon
                                        onClick={() => {
                                            setOrder('ascending');
                                        }}
                                        icon={faCaretDown}
                                    />
                                )}
                            </div>
                        </th>
                        <th>
                            <Text className='company' color='light-gray'>
                                Company
                            </Text>
                        </th>
                        <th></th>
                    </tr>
                </thead>
            );
        }
    );

export default _AccountsContentHeader;
