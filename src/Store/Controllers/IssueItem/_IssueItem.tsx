import { makeAutoObservable } from 'mobx';

type IIssueItemController = Reptile.Controllers.IIssueItemController;

export default class _IssueItemController implements IIssueItemController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _step: 0 | 1 | 2 | 3;

    private _name: string;

    private _article: boolean;

    private _section: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_IssueItemController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._step = 0;
        this._name = '';
        this._article = false;
        this._section = false;
    }

    openArticle(): void {
        throw new Error('Method not implemented.');
    }
    openSection(): void {
        throw new Error('Method not implemented.');
    }

    get loading(): boolean {
        if (
            !['done', 'error'].includes(
                this._domain.content.status.boilerplates.status
            )
        ) {
            return true;
        }
        if (
            !['done', 'error'].includes(
                this._domain.content.status.publicationCreation.status
            )
        ) {
            return true;
        }
        return false;
    }

    get error(): string | undefined {
        return (
            this._domain.content.status.boilerplates.error ||
            this._domain.content.status.publicationCreation.error
        );
    }

    get deps(): readonly unknown[] {
        return [];
    }

    get step(): 0 | 1 | 2 | 3 {
        return this._step;
    }

    set step(v: 0 | 1 | 2 | 3) {
        if (v === 0) {
            // Unset everything if returning to step 0 (closing the modal).
            this._name = '';
        }
        // Do not allow manual update to step 3 (done through create function).
        if (v < 3) {
            this._step = v;
        }
    }

    get name(): string {
        return this._name;
    }

    set name(v: string) {
        this._name = v;
    }

    get modalArticle(): boolean {
        return this._article;
    }

    get modalSection(): boolean {
        return this._section;
    }

    async initialize(): Promise<void> {
        if (this._domain.content.status.boilerplates.status !== 'done') {
            await this._domain.content.fetchPublicationBoilerplates();
        }
    }

    onClickArticle(): void {
        this._step = 1;
        this._article = !this._article;
    }

    onClickSection(): void {
        this._step = 1;
        this._section = !this._section;
    }

    async createArticle(): Promise<void> {
        if (this._uiState.navigation.entityId) {
            this._step = 3;

            const entity = this._domain.content.entities.get(
                this._uiState.navigation.entityId
            )?.parent?.id;

            const parentId =
                entity && this._domain.content.entities.get(entity)?.parent?.id;

            if (parentId) {
                await this._domain.content.createArticle(
                    this._uiState.navigation.entityId,
                    parentId,
                    this._name
                );
                this._article = !this._article
            }
        }
    }

    async createSection(): Promise<void> {
        if (this._uiState.navigation.entityId) {
            this._step = 3;

            const entity = this._domain.content.entities.get(
                this._uiState.navigation.entityId
            );

            if (!entity?.parent) {
                return;
            }

            const parentId = this._domain.content.entities.get(
                entity.parent?.id
            )?.parent?.id;

            if (parentId) {
                await this._domain.content.createSection(
                    entity.id,
                    parentId,
                    this._name
                );
                this._section = !this._section
            }
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
