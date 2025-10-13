import { makeAutoObservable } from 'mobx';

type IThemesOptionsController = Reptile.Controllers.IThemesOptionsController;

export default class ThemesOptionsController
    implements IThemesOptionsController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    _modalDelete: boolean;

    _modalSettings: boolean;

    _modalSet: boolean;

    _name: string;

    _publications: Reptile.Models.IAllPublications[];

    _publication: string;

    _publicationIndex?: number;

    _theme?: Reptile.Models.ITheme;

    _publicationId?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<ThemesOptionsController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._modalDelete = false;
        this._modalSettings = false;
        this._modalSet = false;
        this._name = this._domain.theme.theme?.name ?? '';
        this._publications = this._domain.content.publications;
        this._publication = '';
        this._theme = this._domain.theme.theme;
    }

    get status() {
        if (this._domain.theme.theme?.id) {
            const id = this._domain.theme.theme.id;
            return this._domain.theme.status.themes.get(id)?.status;
        }
        return;
    }

    get modalDelete() {
        return this._modalDelete;
    }

    set modalDelete(v) {
        this._modalDelete = v;
    }

    get modalSettings() {
        return this._modalSettings;
    }

    set modalSettings(v) {
        this._modalSettings = v;
    }

    get modalSet() {
        return this._modalSet;
    }

    set modalSet(v) {
        this._modalSet = v;
    }

    get name() {
        return this._name;
    }

    set name(v) {
        this._name = v;
    }

    get theme() {
        return this._theme;
    }

    get publication() {
        return this._publication;
    }

    get publicationIndex() {
        if (this._publicationIndex) {
            return this._publicationIndex;
        }
        return;
    }

    set publicationIndex(v) {
        this._publicationIndex = v;

        if (this._publicationIndex === 0 || this._publicationIndex) {
            this._publication =
                this._publications[this._publicationIndex]._data.name;

            this._publicationId =
                this._publications[this._publicationIndex]._data.id;
        }
    }

    get publications() {
        return this._publications;
    }

    get publicationId() {
        return this._publicationId;
    }

    get themes() {
        return this._domain.theme.themes;
    }

    async getThemes() {
        if (this._domain.theme.status.all.status !== 'done') {
            await this._domain.theme.fetch();
        }
    }

    async getPublications() {
        await this._domain.content.getPublications();
    }

    async saveSettings() {
        // if (this._domain.theme.theme && this._publicationId) {
        //     this._domain.theme.theme.publicationContentEntityId = this._publicationId;
        // }

        if (this._domain.theme.theme) {
            // this._domain.theme.theme.publicationContentEntityName = JSON.stringify(
            //     this._publication
            // );
            this._domain.theme.theme.name = this._name;
        }

        await this._domain.theme.theme?.saveChanges();
        this._modalSettings = !this._modalSettings;
    }

    async setToDefault() {
        if (this._domain.theme.theme) {
            this._domain.theme.theme.isActive = true;

            await this._domain.theme.theme.saveChanges();
        }
    }
    async deleteTheme(): Promise<void> {
        if (this._domain.theme.theme) {
            await this._domain.theme.deleteTheme(this._domain.theme.theme?.id);
            this._uiState.navigation.navigate('/themes');

            await this._domain.theme.fetch(undefined, 1, 30, true);
        }
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
