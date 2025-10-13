type IAssetService = Reptile.Service.IAssetService;

type SendDataResponseMessage = {
    accepted?: boolean;
    received?: number;
    fileName?: string;
    imageUri?: string;
};

const MESSAGE_SIZE = 1024 * 1024;

export default class _AssetService implements IAssetService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'ManageAssets';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    async uploadImage(
        file: File,
        publisherId: string,
        publisher: string,
        publicationId: string,
        publication: string,
        onUploadProgress?:
            | ((event: ProgressEvent<EventTarget>) => void)
            | undefined,
        onFinish?: (fileName: string, imageUri: string) => Promise<void>,
        kind?: string
    ): Promise<string> {
        let totalDataReceived = 0;
        const token = await this._api.auth.getToken();
        return await new Promise((resolve, reject) => {
            const wss = location.protocol === 'https:' ? 'wss:' : 'ws:';
            // const socket = new WebSocket(`${wss}//${window.location.host}/api/${this.endpoint}/SendData`);
            const socket = new WebSocket(
                wss + window.location.host + '/api/ManageAssets/SendBlobData'
            );

            if (file.size === 0) {
                reject(new Error('Invalid file! File must not be empty'));
                return;
            }

            let aborted = true;
            let data: SendDataResponseMessage;

            socket.onopen = () => {
                totalDataReceived = 0;
                socket.send(
                    JSON.stringify({
                        FileNameWithExtension:
                            kind === 'MobileMedia' ? 'icon.png' : file.name,
                        Token: token,
                        PublisherId: publisherId,
                        Publisher: publisher,
                        PublicationId: publicationId,
                        Publication: publication,
                        Path: kind,
                    })
                );
            };

            socket.onmessage = (e) => {
                data = JSON.parse(e.data as string) as SendDataResponseMessage;
                totalDataReceived += data.received ?? 0;

                if (data.accepted) {
                    if (onUploadProgress) {
                        onUploadProgress(
                            new ProgressEvent('loadstart', {
                                lengthComputable: true,
                                loaded: 0,
                                total: file.size,
                            })
                        );
                    }
                    socket.send(file);
                    return;
                }
                if (totalDataReceived == file.size && !data.imageUri) {
                    if (onUploadProgress) {
                        onUploadProgress(
                            new ProgressEvent('progress', {
                                lengthComputable: true,
                                loaded: totalDataReceived,
                                total: file.size,
                            })
                        );
                    }
                    socket.send('completed');
                    return;
                }

                if (data.imageUri) {
                    if (onUploadProgress) {
                        onUploadProgress(
                            new ProgressEvent('loadend', {
                                lengthComputable: true,
                                loaded: file.size,
                                total: file.size,
                            })
                        );
                    }
                    aborted = false;
                    socket.close();
                    resolve(data.fileName as string);
                    return;
                }

                if (data.received) {
                    if (onUploadProgress) {
                        onUploadProgress(
                            new ProgressEvent('progress', {
                                lengthComputable: true,
                                loaded: totalDataReceived,
                                total: file.size,
                            })
                        );
                    }

                    return;
                }

                // We did not received valid response from the server. Close the socket.
                socket.close();
            };

            socket.onclose = (e) => {                
                if (
                    totalDataReceived == file.size &&
                    data.fileName &&
                    data.imageUri
                ) {
                    if (onFinish) {
                         void onFinish(data.fileName, data.imageUri);
                    }
                }

                if (aborted) {
                    if (onUploadProgress) {
                        onUploadProgress(new ProgressEvent('abort'));
                    }
                    reject(
                        new Error('Upload failed. Server closed to connection.')
                    );
                } else if (e.code !== 1000) {
                    if (onUploadProgress) {
                        onUploadProgress(new ProgressEvent('error'));
                    }
                    reject(
                        new Error(
                            `Upload failed. Server return ${e.code} exit code.`
                        )
                    );
                }
            };

            socket.onerror = (e) => {
                reject(
                    new Error(
                        `Upload failed. Server return ${e.type} exit code.`
                    )
                );
            };
        });
    }

    async uploadGraphic(
        file: File,
        relatedEntity: string,
        onUploadProgress?:
            | ((event: ProgressEvent<EventTarget>) => void)
            | undefined
    ): Promise<{ imageUrl: string }> {
        const data = new FormData();
        data.append('file', file);

        return this._api.httpProtected.post(
            `/${this.endpoint}/PostGraphic/${relatedEntity}`,
            data,
            { onUploadProgress }
        );
    }
}
