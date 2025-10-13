import { action, computed, makeObservable, override } from 'mobx';
import _ from 'lodash';
import { Semaphore } from '@Reptile/Framework';
import ContentEntity from './_ContentEntity';

type IIssue = Reptile.Models.IIssue;

type IssueEntityType = {
    entityTypeId: 3,
    entityTypeName: 'Issue',
};

type AutoSaveProperties = {
    theme: string | null,
};

export default class Issue extends ContentEntity<AutoSaveProperties> implements IIssue {
    private readonly _articlesSemaphore = new Semaphore();

    private _minArticleCachedIdx: number;

    private _maxArticleCachedIdx: number;

    private _cachedArticles: string[];

    constructor(
        api: Reptile.Service.IReptileApi,
        domain: Reptile.Models.IDomain,
        data: Reptile.Service.ContentEntity
    ) {
        super(
            api,
            domain,
            data,
            undefined,
            /** Auto save callbacks */
            () => ({
                theme: this._data.attributes.themeId as string | null,
            }),
            (lhs, rhs) => lhs.theme === rhs.theme,
        );

        makeObservable(this, {
            contentEntityType: override,
            state: override,
            appIsPublished: computed,
            webIsPublished: computed,
            appPublicationDate: computed,
            webPublicationDate: computed,
            appEmbargoDate: computed,
            webEmbargoDate: computed,
            summary: computed,
            issueType: computed,
            primaryContentType: computed,
            theme: computed,
            fetchTheme: action.bound,
        });

        this._minArticleCachedIdx = Number.MAX_VALUE;
        this._maxArticleCachedIdx = Number.MIN_VALUE;
        this._cachedArticles = [];
    }

    get contentEntityType(): IssueEntityType {
        return this._data.contentEntityType as IssueEntityType;
    }

    get state(): Reptile.Models.IssueState {
        let themeStatus: Reptile.Models.State = {
            status: 'initial',
        };
        const themeId = this._data.attributes.themeId as string | null;
        if (!themeId) {
            themeStatus.status = 'done';
        } else {
            themeStatus = this._domain.theme.status.themes.get(themeId) ?? {
                status: 'initial',
            };
        }
        return {
            ...super.state,
            theme: themeStatus,
            publication: super.state.parent,
        };
    }

    get appIsPublished(): boolean | null {
        const appIsPublished = this._data.attributes.appIsPublished as string | null;
        if (appIsPublished) {
            return appIsPublished === 'True';
        }
        return null;
    }

    get webIsPublished(): boolean | null {
        const webIsPublished = this._data.attributes.webIsPublished as string | null;
        if (webIsPublished) {
            return webIsPublished === 'True';
        }
        return null;
    }

    get appPublicationDate(): Date | null {
        const appPublicationDate = this._data.attributes.appPublicationDate as string | null;
        return appPublicationDate ? new Date(appPublicationDate) : null;
    }

    get webPublicationDate(): Date | null {
        const webPublicationDate = this._data.attributes.webPublicationDate as string | null;
        return webPublicationDate ? new Date(webPublicationDate) : null;
    }

    get appEmbargoDate(): Date | null {
        const appEmbargoDate = this._data.attributes.appEmbargoDate as string | null;
        return appEmbargoDate ? new Date(appEmbargoDate) : null;
    }

    get webEmbargoDate(): Date | null {
        const webEmbargoDate = this._data.attributes.webEmbargoDate as string | null;
        return webEmbargoDate ? new Date(webEmbargoDate) : null;
    }

    get summary(): string | null {
        return this._data.attributes.summary as string | null;
    }

    get issueType(): number {
        return Number.parseInt(this._data.attributes.issueType as string);
    }

    get primaryContentType(): number {
        return Number.parseInt(this._data.attributes.primaryContentType as string);
    }

    get theme(): Reptile.Models.ITheme | undefined {
        if (this._domain.theme.theme) {
            return this._domain.theme.theme
        }
        return undefined;
    }

    set theme(v: Reptile.Models.ITheme | undefined) {
        if (v) {
            this._data.attributes.themeId = v.id;
        }
    }

    get publication(): Reptile.Models.IPublication | undefined {
        return this.parent as Reptile.Models.IPublication | undefined;
    }

    async fetchPublication(): Promise<void> {
        await this.fetchParent();
    }

    async fetchTheme(): Promise<void> {
        const themeId = this._data.attributes.themeId as string | null;
        if (themeId !== this.theme?.id && themeId) {
            await this._domain.theme.fetch(themeId);
        }
    }

    async fetchArticles(skip: number, take: number): Promise<string[]> {
        await this._articlesSemaphore.acquire();

        try {
            // If requested articles are within cached range return cached results
            if (this._minArticleCachedIdx <= skip && this._maxArticleCachedIdx >= (skip + take - 1)) {
                const startIdx = skip - this._minArticleCachedIdx;
                return this._cachedArticles.slice(startIdx, startIdx + take);
            }

            // If requested articles are not within cached range refetch all including the requested range
            this._minArticleCachedIdx = Math.min(this._minArticleCachedIdx, skip);
            this._maxArticleCachedIdx = Math.max(this._maxArticleCachedIdx, skip + take - 1);
            const articles = await this._api.contentEntity.getAllArticles(
                this.id,
                this._minArticleCachedIdx,
                this._maxArticleCachedIdx - this._minArticleCachedIdx + 1,
            );
            articles.forEach((article) => this._domain.content.set(article));
            this._cachedArticles = _.map(articles, 'id');
            const startIdx = skip - this._minArticleCachedIdx;
            return this._cachedArticles.slice(startIdx, startIdx + take);
        } catch (error) {
            throw error;
        } finally {
            this._articlesSemaphore.release();
        }
    }
}
