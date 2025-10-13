import React from 'react';
import { ModalActions, ModalContent } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';
import { Edit2Icon, Separator, Text } from '@Reptile/Components/Atoms';
import { ModalInput, ModalTitle } from '@Reptile/Components/Molecules';
import Select from 'react-select';
import { Label } from 'reactstrap';

import './_AccountsEditModal.scss';

const _AccountsEditModal = reactive<Reptile.Props.AccountsEditModalProps>(
    (
        {
            user,
            roles,
            organizations,
            modalTitle,
            actionEnabled
        },
        {
            onCancelClick,
            onActionClick,
            handleInput,
            selectedRole,
            selectedOrganization,
        }
    ) => {
        const isEnabled = () => {
            const input = {
                email: user?.email,
                firstName: user?.firstName,
                lastName: user?.lastName,
                userName: user?.userName,
                roles: user?.roleIds,
                organizations: user?.organizationIds,
            };

            if (actionEnabled === 'pending') {
                return true;
            }

            if (Object.values(input).every((value) => value)) {
                return false;
            }

            return true;
        };

        const userOrgs = () => {
            const orgs: { value?: string; label: string }[] = [];

            user?.organizationIds?.forEach((id) => {
                const org = organizations?.find((org) => org.value === id);
                if (org) {
                    orgs.push(org);
                }
            });

            return orgs;
        };

        const userRoles = () => {
            const newRoles: { value?: string; label: string }[] = [];

            user?.roleIds?.forEach((id) => {
                const role = roles?.find((role) => role.value === id);
                if (role) {
                    newRoles.push(role);
                }
            });

            return newRoles;
        };

        return (
            <>
                <ModalTitle icon={<Edit2Icon />} title={modalTitle} />
                <ModalContent>
                    <Text color='light-gray' weight='regular' size='small'>
                        Username
                    </Text>
                    <ModalInput
                        name={'userName'}
                        userInput={user?.userName ?? ''}
                        onNameChange={(e) => handleInput(e)}
                    />

                    <Text color={'light-gray'} weight='regular' size='small'>
                        Email
                    </Text>
                    <ModalInput
                        name={'email'}
                        userInput={user?.email ?? ''}
                        onNameChange={(e) => handleInput(e)}
                    />

                    <Text color='light-gray' weight='regular' size='small'>
                        First Name
                    </Text>
                    <ModalInput
                        name={'firstName'}
                        userInput={user?.firstName ?? ''}
                        onNameChange={(e) => handleInput(e)}
                    />

                    <Text color='light-gray' weight='regular' size='small'>
                        Last Name
                    </Text>
                    <ModalInput
                        name={'lastName'}
                        userInput={user?.lastName ?? ''}
                        onNameChange={(e) => handleInput(e)}
                    />

                    <div>
                        <Label htmlFor='input-small'>Roles</Label>

                        <Select
                            onChange={selectedRole}
                            options={roles}
                            isMulti={true}
                            closeMenuOnSelect={false}
                            className='multiselect'
                            value={userRoles()}
                            menuPlacement='top'
                        />
                    </div>

                    <div>
                        <Label htmlFor='input-small'>Organizations</Label>
                        <Select
                            onChange={selectedOrganization}
                            options={organizations}
                            isMulti={true}
                            closeMenuOnSelect={false}
                            className='multiselect'
                            value={userOrgs()}
                            menuPlacement='top'
                        />
                    </div>
                </ModalContent>
                <Separator bottom={5} />

                <ModalActions
                    onCancelClick={onCancelClick}
                    onActionClick={onActionClick}
                    actionEnabled={isEnabled ?? false}
                    actionName={'Save'}
                />
            </>
        );
    }
);

export default _AccountsEditModal;
