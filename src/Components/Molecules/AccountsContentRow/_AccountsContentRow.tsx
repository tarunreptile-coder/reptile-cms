import React from 'react';
import {
    Edit2Icon,
    Image,
    Tag,
    Text,
    Trash2Icon,
    UnlockIcon,
} from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';
import './_AccountsContentRow.scss';
import { ROLES } from '@Reptile/Constants/Constants';
import { Tooltip } from '@mui/material';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

const _AccountsContentRow = reactive<Reptile.Props.AccountsContentRowProps>(
    (
        { user, roles, organizations },
        { onEditDisplay, onDeleteDisplay, onResetDisplay, onOpenSubscriptionModal }
    ) => {
        const rolesData = user.roleIds.map((option: string) => {
            return option;
        });

        const rolesRes = ROLES.filter((i) => {
            return rolesData.includes(i.value);
        });

        const organizationData = user.organizationIds.map((option: string) => {
            return option;
        });

        const organizationRes =
            organizations &&
            organizations.filter((i) => {
                return organizationData.includes(i.value ?? '');
            });

        return (
            <tr>
                <td></td>
                <td>
                    <div className='user-container'>
                        <Image
                            className='pfp'
                            src={user.imageUrl}
                            form='circle'
                            height={40}
                            width={40}
                            loading={false}
                        />
                        <Text className='users' color='black'>
                            {user.userName}
                        </Text>
                    </div>
                </td>
                <td>
                    {rolesRes &&
                        rolesRes.map((e) => {
                            return (
                                <Text key={e.value} color='light-gray'>
                                    {e.label}
                                </Text>
                            );
                        })}
                </td>
                <td>
                    <Text color='light-gray'>{user.email}</Text>
                </td>
                <td>
                    <div className='company-tags'>
                        {organizationRes
                            ? organizationRes.map((e) => {
                                  return <Tag key={e.value} label={e.label} />;
                              })
                            : ''}
                    </div>
                </td>
                <td>
                    <div className='edit-delete checked-edit'>
                        <div className='delete-btn'>
                            <button onClick={() => onDeleteDisplay(user.id)}>
                                <Trash2Icon />
                            </button>
                        </div>
                        <div className='edit-btn'>
                            <button onClick={() => onEditDisplay(user.id)}>
                                <Edit2Icon />
                            </button>
                        </div>
                        <div className='reset-btn'>
                            <button onClick={() => onResetDisplay(user.id)}>
                                <UnlockIcon />
                            </button>
                        </div>
                        <div className='subscription-btn'>
                            <Tooltip title="Subscription Details">
                                <button onClick={() => onOpenSubscriptionModal(user.id)}>
                                    <SubscriptionsIcon />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
);

export default _AccountsContentRow;
