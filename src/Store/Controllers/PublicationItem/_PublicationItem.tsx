import { makeAutoObservable } from 'mobx';

type IPublicationItemController =
    Reptile.Controllers.IPublicationItemController;

export default class _PublicationItemController
    implements IPublicationItemController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _step: 0 | 1 | 2 | 3;

    private _name: string;

    private _issue: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_PublicationItemController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._step = 0;
        this._name = '';
        this._issue = false;
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

    get modalIssue(): boolean {
        return this._issue;
    }

    async initialize(): Promise<void> {
        if (this._domain.content.status.boilerplates.status !== 'done') {
            await this._domain.content.fetchPublicationBoilerplates();
        }
    }

    onClickIssue(): void {
        this._step = 1;
        this._issue = !this._issue;
    }

    async createIssue(): Promise<void> {
        if (this._uiState.navigation.entityId) {
            this._step = 3;

            await this._domain.content.createIssue(
                this._uiState.navigation.entityId,
                this._name
            );
            this._issue = !this._issue
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
