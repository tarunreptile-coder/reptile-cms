import { makeAutoObservable } from 'mobx';
import _ from 'lodash';

type IThemesManagerController = Reptile.Controllers.IThemesManagerController;

export default class _ThemesManagerController
    implements IThemesManagerController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    _modalControl: boolean;

    _name: string;

    _css: string;

    _isActive: boolean;

    _isAdvanced: boolean;

    _jsonStructure: string;

    _publications?: Reptile.Models.IAllPublications[];

    _publication: string;

    _publicationIndex?: number;

    _publicationId?: string;

    private _pageSize: number;

    private _pageNumber: number;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_ThemesManagerController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._modalControl = false;
        this._name = '';
        this._css =
            'h1{font-size:24px;font-family:Arial, Helvetica, sans-serif;color:#000000;font-weight:bold;}h2{background:#ffffff;font-size:18px;font-family:Arial, Helvetica, sans-serif;color:#000000;font-weight:bold;}p{background:#ffffff;font-size:14px;font-family:Arial, Helvetica, sans-serif;color:#000000;}.full-width-image{width:100%;margin:0px;padding:0px;}.image-50-left{float:left;width:50%;margin:0px;padding:0px;}.image-50-right{float:right;width:50%;margin:0px;padding:0px;}';
        (this._isActive = true),
            (this._isAdvanced = false),
            (this._jsonStructure =
                '[{"id":"12312312678431231","name":"Heading 1","selectorType":"tag","selectorName":"h1","type":"text","css":{"fontSize":"24px","fontFamily":"Arial, Helvetica, sans-serif","color":"#000000","fontWeight":"bold"}},{"id":"12341231231236631","name":"Heading 2","selectorType":"tag","selectorName":"h2","type":"text","css":{"background":"#ffffff","fontSize":"18px","fontFamily":"Arial, Helvetica, sans-serif","color":"#000000","fontWeight":"bold"}},{"id":"21398127319287912","name":"Paragraph","selectorType":"tag","selectorName":"p","type":"text","css":{"background":"#ffffff","fontSize":"14px","fontFamily":"Arial, Helvetica, sans-serif","color":"#000000"}},{"id":"b1a893fc-a011-4a67-9fd0-25e2acc608f0","name":"Full Width","type":"image","selectorName":"full-width-image","selectorType":"class","css":{"width":"100%","margin":"0px","padding":"0px"}},{"id":"3c33f1e6-b6ab-49bb-b8e0-bc0bd0115f6e","name":"50% Width left aligned","type":"image","selectorName":"image-50-left","selectorType":"class","css":{"float":"left","width":"50%","margin":"0px","padding":"0px"}},{"id":"15111a8a-9277-4a01-a2d4-4b8bb4d67e20","name":"50% Width right aligned","type":"image","selectorName":"image-50-right","selectorType":"class","css":{"float":"right","width":"50%","margin":"0px","padding":"0px"}}]'),
            (this._publication = '');
        this._pageSize = 30;
        this._pageNumber = 1;
    }

    get themes(): Reptile.Models.IThemesStyling[] {
        return this._domain.theme.themes;
    }

    get modalControl(): boolean {
        return this._modalControl;
    }

    get name(): string {
        return this._name;
    }

    set name(v: string) {
        this._name = v;
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

        if (
            (this._publicationIndex === 0 && this._publications) ||
            (this._publicationIndex && this._publications)
        ) {
            this._publication = this._publications[this._publicationIndex].name;

            this._publicationId = this._publications[this._publicationIndex].id;
        }
    }

    get publications() { 
        return (this._publications = _.map(
            this._domain.content.publications ?? [],
            '_data'
        ).filter((pub) => !!pub) as Reptile.Models.IAllPublications[]);
    }

    get publicationId() {
        return this._publicationId;
    }

    get status() {
        return this._domain.theme.status.all;
    }

    get pageNumber() {
        return this._pageNumber;
    }

    set pageNumber(v) {
        this._pageNumber = v;
    }

    get pageSize(): number {
        return this._pageSize;
    }

    set pageSize(v: number) {
        this._pageSize = v;
    }

    get totalPages() {
        return Math.ceil(this._domain.theme.totalCount / this.pageSize);
    }

    get deps(): readonly unknown[] {
        return [];
    }

    async updatePage(page: number) {
        this._pageNumber = page;
        await this._domain.theme.fetch(
            undefined,
            this._pageNumber,
            this._pageSize,
            true
        );
    }

    onModalClick(): void {
        this._modalControl = !this._modalControl;
    }

    navigateToThemesEdit(id: string): void {
        this._uiState.navigation.navigate(`/edit-themes/${id}`);
    }

    async getPublications() {
        await this._domain.content.getPublications();
    }

    async createTheme(): Promise<void> {
        if (!this._publications || typeof this._publicationIndex !== 'number') {
            return;
        }
        const publisherId = this._publications[this._publicationIndex].parentId;

        if (!this._domain.content.entities.has(publisherId)) {
            await this._domain.content.fetch(undefined, 1, 1000);
        }

        const publisher = this._domain.content.entities.get(publisherId);

        if (this._publicationId && this._publication && publisher) {
            await this._domain.theme.createTheme(
                this._css,
                this._name,
                this._isActive,
                this._isAdvanced,
                this._jsonStructure,
                publisher.id,
                this._publicationId,
                publisher.name,
                this._publication,
                this._pageNumber,
                this._pageSize
            );
        }
        this._name = '';
        this._modalControl = !this._modalControl;
        await this._domain.theme.fetch(
            undefined,
            this._pageNumber,
            this._pageSize,
            true
        );
    }

    async getAllThemes(): Promise<void> {
        await this._domain.theme.fetch(
            undefined,
            this._pageNumber,
            this._pageSize,
            true
        );
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
