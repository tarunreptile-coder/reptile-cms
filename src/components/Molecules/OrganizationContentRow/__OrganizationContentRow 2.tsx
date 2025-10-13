import React, { useCallback, useState } from 'react';
import { Edit2Icon, Trash2Icon } from '@Reptile/Components/Atoms';

import './_OrganizationContentRow.scss';

import { reactive } from '@Reptile/Framework';

const _OrganizationContentRow =
    reactive<Reptile.Props.OrganizationContentRowProps>(
        ({ organization }, { handleDelete, handleEdit }) => {
            return (
                <tr>
                    <td>{organization.label}</td>
                    <td>
                        <div className='edit-delete-org checked-edit'>
                            <div className='delete-btn'>
                                <button
                                    onClick={() =>
                                        handleDelete(organization.value)
                                    }
                                >
                                    <Trash2Icon />
                                </button>
                            </div>
                            <div className='edit-btn'>
                                <button
                                    onClick={() =>
                                        handleEdit(organization.value)
                                    }
                                >
                                    <Edit2Icon />
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }
    );

export default _OrganizationContentRow;
