import { ENTITY_TYPES } from '@Reptile/Constants/Constants';
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type ITreeViewController = Reptile.Controllers.ITreeViewController;

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

export default class _AppBuildTreeViewController
    implements ITreeViewController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    expandedNodes: string[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_AppBuildTreeViewController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );
        this._uiState = uiState;
        this._domain = domain;
        this.expandedNodes = [];
    }

    private get activePage() {
        return this._domain.layout.activePage;
    }

    get deps() {
        return [];
    }

    async initialize(): Promise<void> {
        const splitUrl = location.pathname.split('/');
        const publicationId = splitUrl[2];

        await this._domain.layout.getLayouts(publicationId);
        await this.expand('Screens');
    }

    async expand(id: string): Promise<void> {
        if (Object.keys(this._domain.layout.screens).includes(id)) {
            const idx = Object.keys(this._domain.layout.screens).indexOf(id);

            this.expandedNodes.push(
                Object.keys(this._domain.layout.screens)[idx]
            );
        }

        await Promise.resolve();
    }

    isExpanded(id: string): boolean {
        return this.expandedNodes.indexOf(id) !== -1;
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

    dispose(): void {
        /* Do nothing */
    }

    async click(id: string) {
        if (!Object.keys(this._domain.layout.screens).includes(id)) {
            await this._domain.layout.selectPage(id);
        }

        if (this.expandedNodes.indexOf(id) === -1) {
            void this.expand(id);
        } else {
            this.collapse(id);
        }
    }

    select(page: string): void {
        return;
    }

    getNodeProps(itemId: string): Reptile.Props.TreeNode {
        const child = !Object.keys(this._domain.layout.screens).includes(
            itemId
        );
        const selected =
            !this.expandedNodes.indexOf(itemId) || this.activePage === itemId;

        return {
            id: itemId,
            label: itemId,
            selectable: child,
            icon: ENTITY_TYPE_TO_ICON[2],
            selected: selected,
            actions: [
                {
                    visible: false,
                    command: () => {
                        ('');
                    },
                    icon: 'link',
                    color: 'primary',
                },
            ],
            loading: false,
            isActive: false,
        };
    }

    getChildrenIds(): string[];
    getChildrenIds(id: string): string[];
    getChildrenIds(id?: string): string[] {
        if (id) {
            const children = this._domain.layout.screens[id];

            if (children) {
                return children.map((el) => el.name);
            }
            return [];
        } else {
            return Object.keys(this._domain.layout.screens).map((el) => el);
        }
    }
}
