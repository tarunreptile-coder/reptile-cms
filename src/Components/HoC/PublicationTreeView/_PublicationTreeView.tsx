import React, { useCallback, useEffect, useMemo } from 'react';
import { TreeView } from '@Reptile/Components/Organisms';
import { ReptileStore } from '@Reptile/Store';
import { ENTITY_TYPES } from '@Reptile/Constants/Constants';
import {
    FileTextIcon,
    FolderIcon,
    ImageIcon,
    LayoutIcon,
} from '@Reptile/Components/Atoms';
import { useNavigate, useParams } from 'react-router-dom';
import { useDomain } from '@Reptile/Contexts';
import { reactive } from '@Reptile/Framework';

const EXPANDABLE_ENTITIES = [
    ENTITY_TYPES.Publication,
    ENTITY_TYPES.Publisher,
    ENTITY_TYPES.Section,
    ENTITY_TYPES.Issue,
];

const SELECTABLE_ENTITIES = [ENTITY_TYPES.Article];

const ENTITY_TYPE_TO_ICON: { [key in number]: React.FunctionComponent } = {
    [ENTITY_TYPES.Article]: FileTextIcon as React.FunctionComponent,
    [ENTITY_TYPES.Image]: ImageIcon as React.FunctionComponent,
    [ENTITY_TYPES.Issue]: FolderIcon as React.FunctionComponent,
    [ENTITY_TYPES.Page]: LayoutIcon as React.FunctionComponent,
    [ENTITY_TYPES.Publication]: FolderIcon as React.FunctionComponent,
    [ENTITY_TYPES.Publisher]: FolderIcon as React.FunctionComponent,
    [ENTITY_TYPES.Section]: LayoutIcon as React.FunctionComponent,
    [ENTITY_TYPES.Template]: LayoutIcon as React.FunctionComponent,
};

const _ReptileContentTreeView = reactive<Reptile.Props.TreeViewProps<string>>(
    ({ items }) => {
        const {
            publisherId,
            publisherName,
            publicationId,
            publicationName,
            articleId,
        } = useParams();
        const navigate = useNavigate();

        const store = useDomain();
        const items = store.content.entities;
        const title = 'Tree view';
        const getNodeProps = (
            itemId: string
        ): Reptile.Props.TreeNode<string> => {
            const item = store.content.entities.get(
                itemId
            ) as Reptile.Store.IContentEntity;
            const Icon =
                ENTITY_TYPE_TO_ICON[item.contentEntityType.entityTypeId];
            return {
                id: item.id,
                label: item.name,
                expandable: EXPANDABLE_ENTITIES.includes(
                    item.contentEntityType.entityTypeId
                ),
                icon: <Icon />,
                selectable: SELECTABLE_ENTITIES.includes(
                    item.contentEntityType.entityTypeId
                ),
                children: item.children.map((child) => child.id) ?? [],
            };
        };

        const onNodeCollapse = useCallback(
            async (itemId: string, collapsed: boolean) => {
                if (!collapsed) {
                    if (
                        store.content.entities.get(itemId)?.state.children
                            .status === 'initial'
                    ) {
                        await store.content.entities
                            .get(itemId)
                            ?.fetchChildren();
                    }
                }
            },
            [store.content.entities]
        );

        const init = useCallback(
            async (root?: string) => {
                if (root && !store.content.entities.has(root)) {
                    await store.content.entities.get(root)?.fetchChildren();
                }
            },
            [store.content.entities]
        );

        useEffect(() => {
            void init(publicationId);
        }, [publicationId]);

        const treeItems = useMemo(() => {
            if (publicationId) {
                return items.get(publicationId)?.children ?? [];
            }
            return [];
        }, [items.entries(), publicationId]);

        const handleNodeClick = useCallback(
            (id: string) => {
                const article = items.get(id);
                if (
                    article?.contentEntityType.entityTypeId ===
                    ENTITY_TYPES.Article
                ) {
                    let entity = article;
                    let url = `article/${article.id}/${article.name}`;
                    while (entity.parentId != publicationId) {
                        entity = items.get(entity.parentId as string)!;
                        url = `${entity.id}/${entity.name}/${url}`;
                    }
                    url = `/content/${publisherId as string}/${
                        publisherName as string
                    }/${publicationId as string}/${
                        publicationName as string
                    }/${url}`;
                    navigate(url);
                }
            },
            [
                items,
                navigate,
                publisherId,
                publisherName,
                publicationId,
                publicationName,
            ]
        );

        return (
            <TreeView
                selectedItem={articleId}
                items={treeItems}
                onNodeClick={handleNodeClick}
                getNodeProps={getNodeProps}
                onNodeCollapse={onNodeCollapse}
                {...props}
            />
        );
    }
);

export default inject(({ store }: { store: ReptileStore }) => {
    return {
        items: store.contentEntities.entities,
        title: 'Treeview',
        getNodeProps: (itemId: string): Reptile.Props.TreeNode<string> => {
            const item = store.contentEntities.data.get(itemId)!;
            const Icon =
                ENTITY_TYPE_TO_ICON[item.contentEntityType.entityTypeId];
            return {
                id: item.id,
                label: item.name,
                expandable: EXPANDABLE_ENTITIES.includes(
                    item.contentEntityType.entityTypeId
                ),
                icon: <Icon />,
                selectable: SELECTABLE_ENTITIES.includes(
                    item.contentEntityType.entityTypeId
                ),
                children: item.children ?? [],
            };
        },
        onNodeCollapse: async (itemId: string, collapsed: boolean) => {
            if (!collapsed) {
                if (!store.contentEntities.data.get(itemId)?.children) {
                    await store.contentEntities.getById(itemId);
                }
            }
        },
        init: async (root?: string) => {
            if (root && !store.contentEntities.data.has(root)) {
                await store.contentEntities.getById(root);
            }
        },
    };
})(observer(_ReptileContentTreeView)) as unknown as React.FunctionComponent;
