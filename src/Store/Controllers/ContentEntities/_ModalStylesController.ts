import { makeAutoObservable } from 'mobx';

type IContentStylesController = Reptile.Controllers.IContentStylesController;

export default class ModalStylesController implements IContentStylesController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private readonly _contentEntity: Reptile.Models.IContentEntity;

    constructor(
        domain: Reptile.Models.IDomain,
        uiState: Reptile.Controllers.IUiState,
        contentEntity: Reptile.Models.IContentEntity
    ) {
        makeAutoObservable<
            ModalStylesController,
            '_domain' | '_uiState' | '_contentEntity'
        >(this, {
            _domain: false,
            _uiState: false,
            _contentEntity: false,
            requestEditTheme: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._contentEntity = contentEntity;
    }

    async fetchThemes(id?: string): Promise<void> {
            await this._domain.theme.fetch(id);

            if(this.issue && this._domain.theme.theme){
                this.issue.theme = this._domain.theme.theme
            }
    }

    private get issue(): Reptile.Models.IIssue | undefined {
        return this._domain.content.entities.get(this._contentEntity.id) as
            | Reptile.Models.IIssue
            | undefined;
    }

    get theme(): Reptile.Models.ITheme | undefined {
        return this._domain.theme.theme;
    }

    // set theme(v: Reptile.Models.ITheme | undefined) {
    //     if (this.issue && v) {
    //         this.issue.theme = v;
    //     }
    // }

    get themes(): Reptile.Models.IThemesStyling[] {
        return this._domain.theme.themes
    }

    get loading(): boolean {
        return false;
    }

    get hideStyles(): boolean {
        return true
    }

    get error(): string | undefined {
        return undefined;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    async initialize(): Promise<void> {
        if (
            this.issue 
        ) {
            await this.issue.fetchTheme();
        }
    }

    requestEditTheme(themeId: string): void {
        this._uiState.navigation.navigate(`/edit-themes/${themeId}`);
    }

    applyStyle(): void {
        return;
    }

    dispose(): void {
        /* Do nothing */
    }
}
