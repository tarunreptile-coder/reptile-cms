import { AsyncEventObject } from '@Reptile/Framework';
import { makeAutoObservable } from 'mobx';
import Theme from './_Theme';
import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES } from '@Reptile/Constants/Constants';
import { CssService } from '~/Services';

type IThemeModel = Reptile.Models.IThemeModel;

type ThemeModelPrivateFields = '_api' | '_domain' | '_synchronization';

export default class _ThemeModel implements IThemeModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _synchronization = new AsyncEventObject();

    _themes?: Reptile.Models.IThemesStyling[];

    _stylesheetObject?: Reptile.Models.Stylesheet;

    _theme?: Reptile.Models.ITheme;

    _totalCount?: number;

    _advanced: boolean;

    status: {
        themes: Map<string, Reptile.Models.State>;
        all: Reptile.Models.State;
    };

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<_ThemeModel, ThemeModelPrivateFields>(this, {
            _api: false,
            _domain: false,
            _synchronization: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        // this.themes = new Map<string, Reptile.Models.ITheme>();
        this.status = {
            themes: new Map<string, Reptile.Models.State>(),
            all: {
                status: 'initial',
            },
        };
        this._advanced = false
    }

    get totalCount() {
        if (this._totalCount) {
            return this._totalCount;
        }
        return 30;
    }

    get themes(): Reptile.Models.IThemesStyling[] {
        return this._themes ?? [];
    }

    get theme(): Reptile.Models.ITheme | undefined {
        return this._theme;
    }

    get css() {
        if (this.theme?.css) {
            const cssObj = CssService.convertToJson(this.theme.css);

            return CssService.convertToCss(cssObj);
        }
        return undefined;
    }

    get advanced(){
        return this._advanced
    }

    set advanced (v){
        this._advanced = v
    }

    async deleteTheme(id: string) {
        this.status.themes.set(id, { status: 'pending' });
        try {
            await this._api.theme.delete(id);
            this.status.themes.set(id, { status: 'done' });
            Notification.success({
                description: MESSAGES.SUCCESS_THEME_DELETE.message,
            });
        } catch (error) {
            this.status.themes.set(id, { status: 'error' });
            Notification.error({
                description: MESSAGES.ERROR_NOT_ABLE_TO_DELETE_THEME.message,
            });
        }
    }

    fetch(): Promise<void>;
    fetch(id: string): Promise<void>;
    async fetch(
        id?: string,
        pageNumber?: number,
        pageSize?: number,
        includeInactive?: boolean
    ): Promise<void> {
        if (id) {
            if (this.status.themes.get(id)?.status === 'pending') {
                await this._synchronization.wait(`theme.${id}`);
                return;
            }
            this.status.themes.set(id, { status: 'pending' });

            try {
                const theme = await this._api.theme.get(id);
                this._theme = new Theme(this._api, this._domain, theme);
                this.status.themes.set(id, { status: 'done' });
            } catch (error) {
                this.status.themes.set(id, {
                    status: 'error',
                    error: (error as Reptile.Service.Error).data,
                });
            } finally {
                this._synchronization.signal(`theme.${id}`);
            }
        } else {
            if (this.status.all.status === 'pending') {
                await this._synchronization.wait(`all.theme`);
                return;
            }
            this.status.all.status = 'pending';

            try {
                const themes = await this._api.theme.get(
                    undefined,
                    pageNumber ?? 1,
                    pageSize,
                    includeInactive
                );

                this._totalCount = themes.totalCount;
                this._themes = themes.viewModels;
                themes.viewModels.forEach((theme) => {
                    this.status.themes.set(theme.id, { status: 'done' });
                });
                this.status.all.status = 'done';
            } catch (error) {
                this.status.all = {
                    status: 'error',
                    error: (error as Reptile.Service.Error).data,
                };
            } finally {
                this._synchronization.signal(`all.theme`);
            }
        }
    }

    async createTheme(
        css: string,
        name: string,
        isActive: boolean,
        isAdvanced: boolean,
        jsonStructure: string,
        publisherContentEntityId: string,
        publicationContentEntityId: string,
        publisherContentEntityName: string,
        publicationContentEntityName: string,
        pageNumber: number,
        pageSize: number
    ): Promise<void> {
        const data = {
            css,
            name,
            isActive,
            isAdvanced,
            jsonStructure,
            publisherContentEntityId,
            publicationContentEntityId,
            publisherContentEntityName,
            publicationContentEntityName,
        };

        try {
            await this._api.theme.set(data);
            await this._domain.theme.fetch(undefined, pageNumber, pageSize, true);
            Notification.success({
                description: MESSAGES.SUCCESS_SAVED_CHANGES.message,
            });
        } catch (error) {
            Notification.error({
                description: MESSAGES.ERROR_SAVE_CHANGES.message,
            });
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
