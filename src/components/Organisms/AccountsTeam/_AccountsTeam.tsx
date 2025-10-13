import React, { ChangeEvent, useCallback, useEffect } from 'react';
import {
    AccountsContentRow,
    AccountsFooter,
    AccountsHeader,
    Pagination,
} from '@Reptile/Components/Molecules';
import {
    AccountsContent,
    AccountsDeleteModal,
    AccountsEditModal,
    AccountsResetModal,
    SubscriptionDetailsModal,
    UpgradeAccountModal,
} from '@Reptile/Components/Organisms';
import { controlled } from '@Reptile/Framework';
import { Modal, ProgressCircle } from '@Reptile/Components/Atoms';
import { useInitController } from '@Reptile/Hooks';

import './_AccountsTeam.scss';

const _AccountsTeam = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IAccountsController
>(({ controller }) => {
    useInitController(controller);

    const sortAccountsBy = (sortByValue: string, order: string) => {
        controller.sortBy = sortByValue;
        controller.orderBy = order;
    };

    const onEmailSearch = useCallback(
        (event: React.FormEvent<HTMLInputElement>) => {
            controller.emailSearch =
                (event.target as HTMLInputElement).value === ''
                    ? ''
                    : (event.target as HTMLInputElement).value;
            void controller.getAllUsers();
        },
        [controller]
    );

    const handleEditInput = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;

            if (controller.accountToConfigure) {
                controller.accountToConfigure[name] = value;
            }
        },
        [controller]
    );

    const handleAddInput = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;

            if (controller.newUser) {
                controller.newUser[name] = value;
            }
        },
        [controller]
    );

    const onEditDisplay = useCallback(
        (id?: string) => {
            if (typeof id === 'string') {
                controller.userId = id;
                void controller.getIndividualUser(id);
            }
            controller.modalEdit = !controller.modalEdit;
        },
        [controller]
    );

    const onDeleteDisplay = useCallback(
        (id?: string) => {
            if (typeof id === 'string') {
                controller.userId = id;
                void controller.getIndividualUser(id);
            }
            controller.modalDelete = !controller.modalDelete;
        },
        [controller]
    );

    const onResetDisplay = useCallback(
        (id?: string) => {
            if (id) {
                controller.userId = id;
            }
            controller.modalReset = !controller.modalReset;
        },
        [controller]
    );
    
    const onOpenSubscriptionModal = useCallback(
        (id?: string) => {
            if (id) {
                controller.userId = id;
                controller.getSubscriptionInfoByUserId();
            }
            controller.subscriptionModal = !controller.subscriptionModal;
        },
        [controller]
    );

    const onAddDisplay = useCallback(() => {
        void controller.getIndividualUser();
        controller.modalAdd = !controller.modalAdd;
    }, [controller]);

    const handleAddAction = useCallback(() => {
        if (controller.accountToConfigure?.save) {
            controller.accountToConfigure?.save();
        }
        void controller.addUser();
    }, [controller]);

    const handleEditAction = useCallback(() => {
        if (controller.accountToConfigure?.save) {
            controller.accountToConfigure?.save();
        }
        void controller.saveUser();
    }, [controller]);

    const handleDeleteAction = useCallback(() => {
        void controller.deleteUser();
    }, [controller]);

    const handleResetAction = useCallback(() => {
        void controller.sendPasswordReset();
    }, [controller]);

    const handleSaveSubscription = useCallback(async (
        boltOnData: Reptile.Models.UpdateBoltOns | null, 
        gracePeriodData: Reptile.Models.UpdateGracePeriod | null,
    ) => {
        await controller.onSaveSubscriptionData(boltOnData, gracePeriodData);
    }, [controller]);

    const selectedRole = useCallback(
        (selected: { value: string; label: string }[]) => {
            const ids: string[] = [];

            selected.forEach((role) => ids.push(role.value));

            if (controller.accountToConfigure?.roleIds) {
                controller.accountToConfigure.roleIds = [...ids];
            }
        },
        [controller]
    );

    const selectedOrganization = useCallback(
        (selected: { value: string; label: string }[]) => {
            const ids: string[] = [];

            selected.forEach((org) => ids.push(org.value));

            if (controller.accountToConfigure?.organizationIds) {
                controller.accountToConfigure.organizationIds = [...ids];
            }
        },
        [controller]
    );

    const addSelectedRole = useCallback(
        (selected: { value: string; label: string }[]) => {
            const ids: string[] = [];

            selected.forEach((role) => ids.push(role.value));

            if (controller.newUser?.roleIds) {
                controller.newUser.roleIds = [...ids];
            }
        },
        [controller]
    );

    const addSelectedOrganization = useCallback(
        (selected: { value: string; label: string }[]) => {
            const ids: string[] = [];

            selected.forEach((org) => ids.push(org.value));

            if (controller.newUser?.organizationIds) {
                controller.newUser.organizationIds = [...ids];
            }
        },
        [controller]
    );

    const onPageClick = (page: number) => {
        controller.page = page;
        void controller.getAllUsers();
    };

    useEffect(() => {
        void controller.getSubscriptionInfo();
        void controller.getFreeTrialStatus();
    }, [controller]);

    return (
        <div className='rt-accounts-team'>
            <>
                <AccountsHeader
                    superUser={controller.superUser}
                    subscriptionStatus={controller.subscriptionStatus}
                    totalAccounts={controller.totalAccounts}
                    trialStatus={controller.trialStatus}
                    onUpgradeModal={() => controller.handleUpgradeModal()}
                    onEmailSearch={onEmailSearch}
                    onAddDisplay={onAddDisplay}
                />
                {controller.loading ? (
                    <ProgressCircle
                        className={'confirmation-loading'}
                        variant='indeterminate'
                        size='xs'
                    />
                ) : (
                    <AccountsContent sortAccountsBy={sortAccountsBy}>
                        {controller.users.users.map((user) => {
                            return (
                                <React.Fragment key={user.id}>
                                    <AccountsContentRow
                                        key={user.id}
                                        user={user}
                                        roles={controller.roles}
                                        organizations={controller.organizations}
                                        onDeleteDisplay={onDeleteDisplay}
                                        onEditDisplay={onEditDisplay}
                                        onResetDisplay={onResetDisplay}
                                        onOpenSubscriptionModal={onOpenSubscriptionModal}
                                    />

                                    <Modal
                                        visible={() => !!controller.modalEdit}
                                    >
                                        <AccountsEditModal
                                            userId={() => controller.userId}
                                            currentUserId={() =>
                                                controller.currentUserId
                                            }
                                            user={() =>
                                                controller.accountToConfigure
                                            }
                                            roles={() => controller.roles}
                                            organizations={() =>
                                                controller.organizations
                                            }
                                            modalTitle={'Update Modal'}
                                            actionEnabled={
                                                controller.status.edit.status
                                            }
                                            selectedRole={selectedRole}
                                            selectedOrganization={
                                                selectedOrganization
                                            }
                                            handleInput={handleEditInput}
                                            onActionClick={handleEditAction}
                                            onCancelClick={onEditDisplay}
                                        />
                                    </Modal>
                                </React.Fragment>
                            );
                        })}
                    </AccountsContent>
                )}
                <Modal visible={() => !!controller.modalAdd}>
                    <AccountsEditModal
                        userId={() => controller.userId}
                        currentUserId={() => controller.currentUserId}
                        user={() => controller.newUser}
                        roles={() => controller.roles}
                        organizations={() => controller.organizations}
                        modalTitle={'Add Account'}
                        actionEnabled={controller.status.add.status}
                        selectedRole={addSelectedRole}
                        selectedOrganization={addSelectedOrganization}
                        handleInput={handleAddInput}
                        onActionClick={handleAddAction}
                        onCancelClick={onAddDisplay}
                    />
                </Modal>

                <Modal visible={() => !!controller.modalDelete}>
                    <AccountsDeleteModal
                        onActionClick={handleDeleteAction}
                        onCancelClick={onDeleteDisplay}
                        actionEnabled={() => controller.status.delete.status}
                    />
                </Modal>

                <Modal visible={() => !!controller.modalReset}>
                    <AccountsResetModal
                        actionEnabled={controller.status.reset.status}
                        onActionClick={handleResetAction}
                        onCancelClick={onResetDisplay}
                    />
                </Modal>

                <Modal className="subscription-modal" visible={() => !!controller.subscriptionModal}>
                    <SubscriptionDetailsModal
                        superUser={controller.superUser}
                        subscriptionAPIstatus={controller.subscriptionAPIstatus}
                        userId={controller.userId}
                        subscriptionsList={controller.subscriptionsByUserId}
                        planPriceList={controller.planPricesList}
                        onCancelClick={() => onOpenSubscriptionModal()}
                        onSaveSubscriptionDetails={handleSaveSubscription}
                    />
                </Modal>

                <AccountsFooter>
                    {controller.totalPages > 1 ? (
                        <Pagination
                            currentPage={controller.page}
                            totalPages={controller.totalPages}
                            onPageClick={onPageClick}
                        />
                    ) : null}
                </AccountsFooter>
            </>

            <Modal visible={() => controller.upgradeModal}>
                <UpgradeAccountModal
                    line1Text={'You’ve reached the users limit for your current plan.'}
                    line2Text={'Upgrade your subscription to unlock additional users.'}
                    navigateToPlan={() => controller.navigateToPlan()}
                    onUpgradeModal={() => controller.handleUpgradeModal()}
                />
            </Modal>
        </div>
    );
});

export default _AccountsTeam;
