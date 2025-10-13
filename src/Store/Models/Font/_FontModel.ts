import { makeAutoObservable, runInAction } from 'mobx';
import { AsyncEventObject } from '@Reptile/Framework';
import { BUILTIN_FONTS, MESSAGES } from '@Reptile/Constants/Constants';
import { Notification } from '@Reptile/Components/Atoms';

type IFontModel = Reptile.Models.IFontModel;

type FontModelPrivateFields = '_api' | '_domain' | '_synchronization';

export default class _FontModel implements IFontModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _synchronization = new AsyncEventObject();

    fonts: Map<string, Reptile.Models.Font[]>;

    status: Map<string, Reptile.Models.State>;

    constructor(
        store: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<_FontModel, FontModelPrivateFields>(this, {
            _api: false,
            _domain: false,
            _synchronization: false,
            dispose: false,
        });

        this._api = api;
        this._domain = store;
        this.fonts = new Map<string, Reptile.Models.Font[]>();
        this.status = new Map<string, Reptile.Models.State>();
    }

    async uploadFile(data): Promise<string> {
        const file = data.file;
        const publisherId = data.publisherId;
        const publisherName = data.publisherName;
        const onFinish = data.onFinish;
        try {
            await this._api.asset.uploadImage(
                file,
                publisherId,
                publisherName,
                undefined,
                undefined,
                (e) => {
                    runInAction(() => {
                        const progress = Math.round((e.loaded * 100) / e.total);
                    });
                },
                onFinish,
                'fonts'
            );
        } catch (error) {
            Notification.error({
                description: MESSAGES.ERROR_FILE_UPLOAD.message,
            });
        }
        
    }

    async saveFont(fontData: Reptile.Service.Font): Promise<void> {
        try {
            await this._api.font.add(fontData);
            Notification.success({
                description: MESSAGES.SUCCESS_FONT_SAVE.message,
            });
        } catch (error) {
            Notification.error({
                description: MESSAGES.ERROR_FONT_SAVE.message,
            });
        }
    }

    async delete(id: string) {
        if (this.status.get(id)?.status === 'pending') {
            await this._synchronization.wait(`font.${id}`);
            return;
        }
        this.status.set(id, { status: 'pending' });
        try {
            await this._api.font.delete(id);
            this.status.set(id, { status: 'done' });
            Notification.success({
                description: MESSAGES.SUCCESS_FONT_DELETE.message,
            });            
        } catch (error) {
            this.status.set(id, {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            });
            Notification.error({
                description: MESSAGES.ERROR_NOT_ABLE_TO_DELETE_FONT.message,
            });
        } finally {
            this._synchronization.signal(`font.${id}`);
        }
    }

    async fetch(relatedEntityId: string): Promise<void> {
        if (this.status.get(relatedEntityId)?.status === 'pending') {
            await this._synchronization.wait(`font.${relatedEntityId}`);
            return;
        }
        this.status.set(relatedEntityId, { status: 'pending' });

        try {
            const rawFonts = await this._api.font.get(relatedEntityId);
            const fonts: Reptile.Models.Font[] = [
                ...rawFonts.map(({ id, css, license, name }) => ({
                    id,
                    name: {
                        name,
                        displayName: name,
                    },
                    css: `/* ${license} */ ${css}`,
                })),
                ...BUILTIN_FONTS.map((name) => ({
                    id: 'builtin',
                    name,
                    css: '',
                })),
            ].sort((lhs, rhs) =>
                lhs.name.displayName.localeCompare(rhs.name.displayName)
            );
            this.fonts.set(relatedEntityId, fonts);
            this.status.set(relatedEntityId, { status: 'done' });
        } catch (error) {
            this.status.set(relatedEntityId, {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            });
        } finally {
            this._synchronization.signal(`font.${relatedEntityId}`);
        }
    }

    dispose(): void {
        /* Do nothing */
    }
}
