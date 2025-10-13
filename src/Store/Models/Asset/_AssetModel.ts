import { makeAutoObservable } from 'mobx';
import GraphicUpload from './_GraphicUpload';
import ImageUpload from './_ImageUpload';
import { ENTITY_TYPES } from '@Reptile/Constants/Constants';

type IAssetModel = Reptile.Models.IAssetModel;

export default class _AssetModel implements IAssetModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    activeUploads: Reptile.Models.IAssetUpload[] = [];

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<_AssetModel, '_api' | '_domain'>(this, {
            _api: false,
            _domain: false,
            dispose: false,
        });
        this._api = api;
        this._domain = domain;
    }

    async upload(
        entityId: string,
        file: File,
        kind?: string | undefined,
        onFinish?: (fileName: string, imageUri: string) => Promise<void>
    ): Promise<string> {
        const findEntityByType = async (entityType: number) => {
            let entity = this._domain.content.entities.get(entityId);

            if (!entity) {
                await this._domain.content.fetch(entityId, 1, 1000);
                entity = this._domain.content.entities.get(entityId);
            }

            while (entity?.contentEntityType.entityTypeId !== entityType) {
                if (!entity?.parent) {
                    await this._domain.content.fetch(undefined, 1, 1000);
                }

                if (entity?.parent?.id) {
                    entity = this._domain.content.entities.get(
                        entity.parent.id
                    );
                } else {
                    return undefined;
                }
            }

            return entity;
        };

        const publisher = await findEntityByType(ENTITY_TYPES.Publisher);
        const publication = await findEntityByType(ENTITY_TYPES.Publication);

        if (publisher && publication) {
            const pos =
                this.activeUploads.push(
                    new ImageUpload(
                        entityId,
                        kind,
                        file,
                        this._api,
                        publisher.name,
                        publisher.id,
                        publication.name,
                        publication.id,
                        onFinish
                    )
                ) - 1;

            try {
                const imageUrl = await this.activeUploads[pos].upload();
                return imageUrl;
            } finally {
                this.activeUploads = [
                    ...this.activeUploads.slice(0, pos),
                    ...this.activeUploads.slice(pos + 1),
                ];
            }
        }
        return '';
    }

    async uploadGraphic(
        entityId: string,
        file: File,
        kind?: string | undefined
    ): Promise<string> {
        const pos =
            this.activeUploads.push(
                new GraphicUpload(entityId, kind, file, this._api)
            ) - 1;
        try {
            const imageUrl = await this.activeUploads[pos].upload();
            return imageUrl;
        } finally {
            this.activeUploads = [
                ...this.activeUploads.slice(0, pos),
                ...this.activeUploads.slice(pos + 1),
            ];
        }
    }

    dispose(): void {
        this.activeUploads.forEach((u) => u.dispose());
    }
}
