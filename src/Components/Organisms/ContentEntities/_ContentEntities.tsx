import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    ArticleCard,
    DeleteEntityModal,
    FolderCard,
    ProjectCard,
    ProjectSettingsModal,
    TemplateCard,
} from '@Reptile/Components/Organisms';
import { Divider, Modal } from '@Reptile/Components/Atoms';
import { ENTITY_TYPES } from '@Reptile/Constants/Constants';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_ContentEntities.scss';
import { Pagination } from '@Reptile/Components/Molecules';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';

const contentEntityFactory = new Map<
    number,
    React.FunctionComponent<Reptile.Props.ContentEntityCardProps>
>([
    [ENTITY_TYPES.Publisher, ProjectCard],
    [ENTITY_TYPES.Publication, ProjectCard],
    [ENTITY_TYPES.Issue, FolderCard],
    [ENTITY_TYPES.Section, FolderCard],
    [ENTITY_TYPES.Article, ArticleCard],
    [ENTITY_TYPES.Template, TemplateCard],
]);

const _ContentEntities = controlled<
    Reptile.Props.ContentEntitiesProps,
    Reptile.Controllers.IContentEntitiesController
>(({ className, style, emptyElement, controller }) => {
    useInitController(controller);

    const templates = controller.entities.filter(
        (x) => x.contentEntityType.entityTypeId === ENTITY_TYPES.Template
    );

    const [content, setContent] = useState<Reptile.Models.IContentEntity[]>([]);
    const [fontsList, setFontsList] = useState<Reptile.Models.Font[]>([]);

    useEffect(() => {
        setContent(
            controller.entities.filter(
                (x) =>
                    x.contentEntityType.entityTypeId !==
                        ENTITY_TYPES.Template &&
                    contentEntityFactory.has(x.contentEntityType.entityTypeId)
            )
        );
    }, [controller.entities]);

    const handleNameChange = useCallback(
        (newName: string) => {
            if (controller.entityToConfigure)
                controller.entityToConfigure.name = newName;
        },
        [controller]
    );

    const handleCancelClick = useCallback(() => {
        if (controller.entityToDelete) {
            controller.deleteEntity(undefined);
        }
        if (controller.entityToConfigure) {
            controller.configureEntity(undefined);
        }
    }, [controller]);

    const handleDeleteClick = useCallback(async () => {
        if (controller.entityToDelete) {
            await controller.entityToDelete.delete();
            handleCancelClick();
        }
    }, [controller, handleCancelClick]);

    const handleSaveClick = useCallback(async () => {
        if (controller.entityToConfigure) {
            await controller.entityToConfigure.save();
            handleCancelClick();
        }
    }, [controller, handleCancelClick]);

    const handleFileDropped = useCallback(
        (file: File | null) => {
            if (file) {
                void controller.entityToConfigure?.setCover(file);
            }
        },
        [controller]
    );
    
    const handleDeleteFont = useCallback(
        (id: string) => {
            if (id) {
                void controller.deleteFont(id);
            }
        },
        [controller]
    );
    
    const handleSaveFont = useCallback(
        (fontData: Reptile.Service.Font) => {
            if (fontData.relatedEntity) {
                void controller.saveFont(fontData);
            }
        },
        [controller]
    );

    const handlePageClick = (page: number) => {
        controller.pageNumber = page;
        void controller.fetchContent();
    };

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const activeIndex = content.findIndex(
                (obj) => obj.id === active.id
            );

            const overIndex = content.findIndex((obj) => obj.id === over.id);

            const sourceItem = content[activeIndex];

            const updatedItems = content.filter(
                (item, index) => index !== activeIndex
            );
            updatedItems.splice(overIndex, 0, sourceItem);

            setContent(updatedItems);

            void controller.swapFlatPlan(
                null,
                sourceItem.id,
                overIndex + templates.length + 1,
                activeIndex + templates.length + 1
            );
        }
    }

    useEffect(() => {
        controller.fetchFonts(controller.entityToConfigure?.id)
    }, [controller.entityToConfigure]);

    useEffect(() => {
        const filteredFonts = controller.fonts && controller.fonts.length > 0 ? controller.fonts.filter(font => font.id !== "builtin") : [];
        setFontsList(filteredFonts);
    }, [controller.fonts]);
    
    return (
        <div className={clsx('rt-content', className)} style={style}>
            {!controller.entities.length &&
                !controller.error &&
                !controller.loading && <>{emptyElement}</>}
            {!!templates.length && (
                <>
                    <div className='cards'>
                        {templates.map((entity) => (
                            <React.Fragment key={entity.id}>
                                <TemplateCard
                                    key={entity.id}
                                    entity={entity}
                                    onClick={controller.selectEntity.bind(
                                        controller
                                    )}
                                    onClickDelete={controller.deleteEntity.bind(
                                        controller
                                    )}
                                    onClickSettings={controller.configureEntity.bind(
                                        controller
                                    )}
                                />
                            </React.Fragment>
                        ))}
                    </div>

                    <Divider />
                </>
            )}

            <div style={{ paddingBottom: '55px' }} className='cards'>
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={content}
                        strategy={rectSortingStrategy}
                        disabled={controller.isDisabled}
                    >
                        {content.map((entity) => {
                            const EntityCard = contentEntityFactory.get(
                                entity.contentEntityType.entityTypeId
                            ) as React.FunctionComponent<Reptile.Props.ContentEntityCardProps>;

                            return (
                                <EntityCard
                                    key={entity.id}
                                    entity={entity}
                                    onClick={controller.selectEntity.bind(
                                        controller
                                    )}
                                    onClickDelete={controller.deleteEntity.bind(
                                        controller
                                    )}
                                    onClickSettings={controller.configureEntity.bind(
                                        controller
                                    )}
                                />
                            );
                        })}
                    </SortableContext>
                </DndContext>
            </div>
            {controller.totalPages > 1 ? (
                <Pagination
                    totalPages={controller.totalPages}
                    currentPage={controller.pageNumber}
                    onPageClick={handlePageClick}
                />
            ) : null}

            <Modal visible={() => !!controller.entityToDelete}>
                <DeleteEntityModal
                    isPublication={ controller?.entityToDelete?.contentEntityType.entityTypeId === ENTITY_TYPES.Publication}
                    entityName={() => controller.entityToDelete?.name ?? ''}
                    onCancelClick={handleCancelClick}
                    onDeleteClick={() => void handleDeleteClick()}
                    actionEnabled={() =>
                        controller.entityToDelete?.state.delete.status
                    }
                />
            </Modal>

            <Modal visible={() => !!controller.entityToConfigure}>
                <ProjectSettingsModal
                    onNameChange={handleNameChange}
                    name={() => controller.entityToConfigure?.name ?? ''}
                    onCancelClick={handleCancelClick}
                    onSaveClick={() => void handleSaveClick()}
                    onFileDropped={
                        controller.entityToConfigure?.contentEntityType
                            .entityTypeId !== ENTITY_TYPES.Template
                            ? handleFileDropped
                            : undefined
                    }
                    displayImage={
                        controller.entityToConfigure
                            ? controller.entityToConfigure.imageUrl
                            : null
                    }
                    editTheme={
                        controller.entityToConfigure?.contentEntityType
                            .entityTypeId === ENTITY_TYPES.Issue
                            ? controller.editTheme
                            : undefined
                    }
                    fileUploadInfo={() =>
                        controller.entityToConfigure?.coverUploadProgress
                    }
                    actionEnabled={() =>
                        controller.entityToConfigure?.state.save.status
                    }
                    isPublisher={controller?.entityToConfigure?.contentEntityType.entityTypeId === ENTITY_TYPES.Publisher}
                    fonts={fontsList}
                    currentEntity={controller.entityToConfigure}
                    handleDeleteFont={handleDeleteFont}
                    handleSaveFont={handleSaveFont}
                />
            </Modal>
        </div>
    );
});

export default _ContentEntities;
