import {
    ENTITY_TYPES,
    EXPANDABLE_ENTITIES,
} from '@Reptile/Constants/Constants';
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type ITreeViewController = Reptile.Controllers.ITreeViewController;
type ILinkController = Reptile.Controllers.ILinkController;

const ENTITY_TYPE_TO_ICON: { [key in number]: string } = {
    [ENTITY_TYPES.Article]: 'file-text',
    [ENTITY_TYPES.Image]: 'image',
    [ENTITY_TYPES.Issue]: 'folder',
    [ENTITY_TYPES.Page]: 'layout',
    [ENTITY_TYPES.Publication]: 'folder',
    [ENTITY_TYPES.Publisher]: 'folder',
    [ENTITY_TYPES.Section]: 'folder',
    [ENTITY_TYPES.Template]: 'layout',
};

export default class _PublicationTreeViewController
    implements ITreeViewController, ILinkController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private linkProvider?: Reptile.Controllers.IActiveWidgetTracker;

    private _isActive: boolean;

    expandedNodes: string[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<
            _PublicationTreeViewController,
            '_domain' | '_uiState'
        >(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });
        this._uiState = uiState;
        this._domain = domain;
        this.expandedNodes = [];
        this._isActive = false;
    }

    linkToWidget(nodeId: string): void {
        if (this.linkProvider && this.linkProvider.activeWidget) {
            if (this.linkProvider.activeWidget.properties.linkedTo === nodeId) {
                this.linkProvider.activeWidget.properties.linkedTo = '';
            } else {
                this.linkProvider.activeWidget.properties.linkedTo = nodeId;
            }
        }
    }

    register(linkProvider: Reptile.Controllers.IActiveWidgetTracker) {
        this.linkProvider = linkProvider;
    }

    unregister(): void {
        this.linkProvider = undefined;
    }

    get deps(): readonly unknown[] {
        return [
            this._uiState.navigation.articleId,
            this._uiState.navigation.templateId,
        ];
    }

    get showLink(): boolean {
        return !!this.linkProvider?.activeWidget;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    private get contentId(): string | undefined {
        return (
            this._uiState.navigation.templateId ||
            this._uiState.navigation.articleId
        );
    }

    async initialize(): Promise<void> {
        if (this.contentId) {
            if (!this._domain.content.entities.has(this.contentId)) {
                await this._domain.content.fetch(this.contentId);
            }
            let entity: Reptile.Models.IContentEntity | undefined | null =
                this._domain.content.entities.get(this.contentId);
            while (
                entity &&
                entity.contentEntityType.entityTypeId !==
                    ENTITY_TYPES.Publication
            ) {
                if (entity?.state.parent.status !== 'done') {
                    await entity?.fetchParent();
                }
                entity = entity?.parent;
            }

            // Fetch children of publication

            if (entity) {
                await entity.fetchChildren(
                    entity.id,
                    undefined,
                    undefined,
                    1000
                );
            }

            await this.expand(this.contentId);
        }
    }

    async expand(id: string): Promise<void> {
        if (!this._domain.content.entities.has(id)) {
            await this._domain.content.fetch(id);
        }

        let entity: Reptile.Models.IContentEntity | undefined | null =
            this._domain.content.entities.get(id);

        if (
            entity &&
            entity?.contentEntityType.entityTypeId !== ENTITY_TYPES.Article
        ) {
            await entity.fetchChildren(entity.id, undefined, undefined, 1000);
        }

        const toExpandNodes: string[] = [];
        while (
            entity &&
            entity.contentEntityType.entityTypeId !== ENTITY_TYPES.Publication
        ) {
            if (entity.state.parent.status !== 'done') {
                await entity?.fetchParent();
            }
            if (!this.expandedNodes.includes(entity.id)) {
                toExpandNodes.push(entity.id);
            }
            entity = entity.parent;

            if (entity && entity?.state.children.status !== 'done') {
                await entity.fetchChildren(entity.id);
            }
        }
        this.expandedNodes.push(...toExpandNodes);
    }

    isExpanded(id: string): boolean {
        return this.expandedNodes.indexOf(id) !== -1;
    }

    get selectedNodeId(): string | undefined {
        return this.contentId;
    }

    collapse(id: string): void;
    collapse(): void;
    collapse(id?: string): void {
        if (id) {
            const idx = this.expandedNodes.indexOf(id);
            if (idx !== -1) {
                this.expandedNodes = [
                    ...this.expandedNodes.slice(0, idx),
                    ...this.expandedNodes.slice(idx + 1),
                ];
            }
            return;
        }
    }

    minimise() {
        this._isActive = !this._isActive;
    }

    dispose(): void {
        /* Do nothing */
    }

    click(id: string): void {
        const item = this._domain.content.entities.get(
            id
        ) as Reptile.Models.IContentEntity;
        const selectable = !EXPANDABLE_ENTITIES.includes(
            item.contentEntityType.entityTypeId
        );
        if (selectable) {
            this.select(id);
        } else {
            if (this.expandedNodes.indexOf(id) === -1) {
                void this.expand(id);
            } else {
                this.collapse(id);
            }
        }
    }

    select(id: string): void {
        const item = this._domain.content.entities.get(id);
        if (item?.contentEntityType.entityTypeId === ENTITY_TYPES.Template) {
            const url = `/template/${id}`;
            this._uiState.navigation.navigate(url);
        } else if (
            item?.contentEntityType.entityTypeId === ENTITY_TYPES.Article
        ) {
            const url = `/article/${id}`;
            this._uiState.navigation.navigate(url);
        }
    }

    getNodeProps(itemId: string): Reptile.Props.TreeNode {
        const item = this._domain.content.entities.get(
            itemId
        ) as Reptile.Models.IContentEntity;
        return {
            id: item.id,
            label: item.name,
            selectable: !EXPANDABLE_ENTITIES.includes(
                item.contentEntityType.entityTypeId
            ),
            icon: ENTITY_TYPE_TO_ICON[item.contentEntityType.entityTypeId],
            selected: this.selectedNodeId === item.id,
            actions: [
                {
                    visible:
                        this.showLink &&
                        (this.linkProvider?.activeWidget?.allowedLinkedContentTypes?.includes(
                            item.contentEntityType.entityTypeId
                        ) as boolean),
                    command: this.linkToWidget.bind(this),
                    icon:
                        this.linkProvider?.activeWidget?.properties.linkedTo ===
                        item.id
                            ? 'link-2'
                            : 'link',
                    color:
                        this.linkProvider?.activeWidget?.properties.linkedTo ===
                        item.id
                            ? 'primary'
                            : 'gray',
                },
            ],
            loading: item.state.children.status === 'pending',
            isActive: this._isActive,
        };
    }

    getChildrenIds(): string[];
    getChildrenIds(id: string): string[];
    getChildrenIds(id?: string): string[] {
        if (id) {
            const children = this._domain.content.entities.get(id)?.children;
            if (children) {
                return children.map((el) => el.id);
            }
            return [];
        }
        if (this.contentId) {
            let entity: Reptile.Models.IContentEntity | undefined | null =
                this._domain.content.entities.get(this.contentId);
            while (
                entity &&
                entity.contentEntityType.entityTypeId !==
                    ENTITY_TYPES.Publication
            ) {
                entity = entity.parent;
            }
            if (entity) {
                return _.map(entity.children, 'id');
            }
        }
        return [];
    }
}
