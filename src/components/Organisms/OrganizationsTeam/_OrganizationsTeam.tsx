import React, { useCallback } from 'react';
import {
    AccountsFooter,
    OrganizationContentRow,
    OrganizationHeader,
    Pagination,
} from '@Reptile/Components/Molecules';
import {
    OrganizationContent,
    OrganizationDeleteModal,
    OrganizationEditModal,
} from '@Reptile/Components/Organisms';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';
import { Modal } from '@Reptile/Components/Atoms';

const _AccountsTeam = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IOrganizationsController
>(({ controller }) => {
    useInitController(controller);

    const onEditDisplay = useCallback(
        (id?: string) => {
            if (id) {
                void controller.getIndividualOrganization(id);
            }
            controller.modalEdit = !controller.modalEdit;
        },
        [controller]
    );

    const onDeleteDisplay = useCallback(
        (id?: string) => {
            if (id) {
                void controller.getIndividualOrganization(id);
            }
            controller.modalDelete = !controller.modalDelete;
        },
        [controller]
    );

    const onAddDisplay = useCallback(() => {
        controller.modalAdd = !controller.modalAdd;
    }, [controller]);

    const handleEditAction = useCallback(() => {
        void controller.saveOrganization();
    }, [controller]);

    const handleDeleteAction = useCallback(() => {
        void controller.deleteOrganization();
    }, [controller]);

    const handleAddAction = useCallback(() => {
        void controller.addOrganization();
    }, [controller]);

    const handleNameInput = useCallback(
        (newName: string) => {
            controller.name = newName;
        },
        [controller]
    );

    const onPageClick = (page: number) => {
        void controller.updatePage(page);
    };

    return (
        <div>
            {controller.organizations && (
                <>
                    <OrganizationHeader
                        totalOrgs={controller.totalOrgs}
                        modalAdd={onAddDisplay}
                    />

                    <OrganizationContent>
                        {controller.organizations.map((organization) => {
                            return (
                                <React.Fragment key={organization.value}>
                                    <OrganizationContentRow
                                        key={organization.value}
                                        organization={organization}
                                        handleDelete={onDeleteDisplay}
                                        handleEdit={onEditDisplay}
                                    />

                                    <Modal
                                        visible={() => !!controller.modalAdd}
                                    >
                                        <OrganizationEditModal
                                            title={'Add Organisation'}
                                            name={controller.name ?? ''}
                                            onNameChange={handleNameInput}
                                            onCancelClick={onAddDisplay}
                                            onSaveClick={handleAddAction}
                                            actionEnabled={() =>
                                                controller.status.add.status
                                            }
                                        />
                                    </Modal>

                                    <Modal
                                        visible={() => !!controller.modalDelete}
                                    >
                                        <OrganizationDeleteModal
                                            onCancelClick={onDeleteDisplay}
                                            onSaveClick={handleDeleteAction}
                                            actionEnabled={() =>
                                                controller.status.delete.status
                                            }
                                        />
                                    </Modal>

                                    <Modal
                                        visible={() => !!controller.modalEdit}
                                    >
                                        <OrganizationEditModal
                                            title={'Update Organisation'}
                                            name={
                                                controller.name
                                                    ? controller.name
                                                    : controller.organization
                                                          ?.name ?? ''
                                            }
                                            onNameChange={handleNameInput}
                                            onCancelClick={onEditDisplay}
                                            onSaveClick={handleEditAction}
                                            actionEnabled={() =>
                                                controller.status.edit.status
                                            }
                                        />
                                    </Modal>
                                </React.Fragment>
                            );
                        })}
                    </OrganizationContent>
                    <AccountsFooter>
                        {controller.totalPages > 1 ? (
                            <Pagination
                                totalPages={controller.totalPages}
                                currentPage={controller.page}
                                onPageClick={onPageClick}
                            />
                        ) : null}
                    </AccountsFooter>
                </>
            )}
        </div>
    );
});

export default _AccountsTeam;
