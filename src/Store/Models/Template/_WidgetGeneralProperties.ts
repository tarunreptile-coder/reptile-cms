import { makeAutoObservable, toJS } from 'mobx';

type IWidgetGeneralProperties = Reptile.Models.IWidgetGeneralProperties;

export default class WidgetGeneralProperties
    implements IWidgetGeneralProperties
{
    private readonly _data: Reptile.Service.WidgetGeneralProperties;

    constructor(data: Reptile.Service.WidgetGeneralProperties) {
        makeAutoObservable(this, {
            dispose: false,
        });
        this._data = data;
    }

    get action(): string | undefined {
        return this._data.action;
    }

    set action(v: string | undefined) {
        this._data.action = v
    }

    get actions(): {name: string, code: string}[] | undefined {
        return this._data.actions;
    }

    set actions(v: {name: string, code: string}[] | undefined) {
        this._data.actions = v
    }

    get radius(): string | undefined {
        return this._data.radius;
    }

    set radius(v: string | undefined) {
        this._data.radius = v;
    }

    get tagQuery():
        | { selected: boolean; query: { tagId: string; operation: string }[] }
        | undefined {
        return this._data.tagQuery;
    }

    set tagQuery(
        v:
            | {
                  selected: boolean;
                  query: { tagId: string; operation: string }[];
              }
            | undefined
    ) {
        this._data.tagQuery = v;
    }

    get htmlBody(): string | undefined {
        return this._data.htmlBody;
    }

    set htmlBody(v: string | undefined) {
        this._data.htmlBody = v;
    }

    get skipArticles(): number | undefined {
        return this._data.skipArticles;
    }

    set skipArticles(v: number | undefined) {
        this._data.skipArticles = v;
    }

    get label(): string | undefined {
        return this._data.label;
    }

    set label(v: string | undefined) {
        this._data.label = v;
    }

    get clientId(): string | undefined {
        return this._data.clientId;
    }

    set clientId(v: string | undefined) {
        this._data.clientId = v;
    }

    get unitId(): string | undefined {
        return this._data.unitId;
    }

    set unitId(v: string | undefined) {
        this._data.unitId = v;
    }

    get src(): string | undefined {
        return this._data.src;
    }

    set src(v: string | undefined) {
        this._data.src = v;
    }

    get text(): string | undefined {
        return this._data.text;
    }

    set text(v: string | undefined) {
        this._data.text = v;
    }

    get linkedTo(): string | undefined {
        return this._data.linkedTo;
    }

    set linkedTo(v: string | undefined) {
        this._data.linkedTo = v;
    }

    get link(): string | undefined {
        return this._data.link;
    }

    set link(v: string | undefined) {
        this._data.link = v;
    }

    get isActive(): boolean | undefined {
        return this._data.isActive;
    }

    set isActive(v: boolean | undefined) {
        this._data.isActive = v;
    }

    get skipIssues(): number | undefined {
        return this._data.skipIssues;
    }

    set skipIssues(v: number | undefined) {
        this._data.skipIssues = v;
    }

    get skipSections(): string | number | undefined {
        return this._data.skipSections;
    }

    set skipSections(v: string | number | undefined) {
        this._data.skipSections = v;
    }

    get visibleItems(): number | undefined {
        return this._data.visibleItems;
    }

    set visibleItems(v: number | undefined) {
        this._data.visibleItems = v;
    }

    get itemsPerRow(): number | undefined {
        return this._data.itemsPerRow;
    }

    set itemsPerRow(v: number | undefined) {
        this._data.itemsPerRow = v;
    }

    get isVideo(): boolean | undefined {
        return this._data.isVideo;
    }

    set isVideo(v: boolean | undefined) {
        this._data.isVideo = v;
    }

    get ignoreSections(): boolean | undefined {
        return this._data.ignoreSections;
    }

    set ignoreSections(v: boolean | undefined) {
        this._data.ignoreSections = v;
    }
    
    get showCover(): boolean | undefined {
        return this._data.showCover;
    }

    set showCover(v: boolean | undefined) {
        this._data.showCover = v;
    }

    get imagePosition(): string | undefined {
        return this._data.imagePosition;
    }

    set imagePosition(v: string | undefined) {
        this._data.imagePosition = v;
    }

    toJson(): Reptile.Service.WidgetGeneralProperties {
        return toJS(this._data);
    }

    dispose(): void {
        /* Do nothing */
    }
}
