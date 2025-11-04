import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type IHeaderController = Reptile.Controllers.IHeaderController;

export default class _CmsHeaderController implements IHeaderController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _loading: boolean;

    private _isFinishDisabled: boolean;

    private _error?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_CmsHeaderController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._loading = false;
        this._isFinishDisabled = true;
    }

    get loading(): boolean {
        return (
            !['done', 'error'].includes(
                this._domain.user.status.current.status
            ) || this._loading
        );
    }

    get error(): string | undefined {
        return this._domain.user.status.current.error || this._error;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    get avatarUrl(): string | undefined {
        if (this._domain.accounts.user?.imageUrl) {
            return this._domain.accounts.user?.imageUrl;
        }
        return this._domain.user.current?.imageUrl ?? undefined;
    }

    get mode(): 'content' | 'design' | 'app-build' | 'prototype' | 'finish' | 'none' {
        const splitUrl = location.pathname.split('/');
        const modeType = splitUrl[1];
        if (modeType === 'publication') return 'content';
        if (modeType === 'template') return 'design';
        if (modeType === 'app-build') return 'app-build';
        if (modeType === 'prototype') return 'prototype';
        if (modeType === 'finish') return 'finish';
        return 'none';
    }

    get superUser() {
        return this._domain.user.superUser;
    }
    
    get isFinishDisabled() {
        const anyStatesCompleted = _.some(this._domain.buildSetting?.appList, (app) =>
            _.every(app.states, (state) => state === 'Completed')
        );
        this._isFinishDisabled = !anyStatesCompleted;
        return this._isFinishDisabled;
    }
    
    set isFinishDisabled(v) {
        this._isFinishDisabled = v;
    }

    navigateToSettings() {
        this._uiState.navigation.navigate('/account-settings');
    }

    async navigateToAppBuild(): Promise<void> {
        if (this._loading) {
            return;
        }

        this._loading = true;

        if (this._uiState.navigation.templateId) {
            if (
                !this._domain.content.entities.has(
                    this._uiState.navigation.templateId
                )
            ) {
                await this._domain.content.fetch(
                    this._uiState.navigation.templateId
                );
            }

            const template = this._domain.content.entities.get(
                this._uiState.navigation.templateId
            ) as Reptile.Models.ITemplate;

            if (template) {
                if (!template.publication) {
                    await template.fetchPublication();
                }

                if (template.publication) {
                    this._uiState.navigation.navigate(
                        `/app-build/${template.publication.id}/${template.id}`
                    );
                } else {
                    this._error = template.state.publication.error;
                }
            } else {
                this._error = this._domain.content.status.entities.get(
                    this._uiState.navigation.templateId
                )?.error;
            }
        }

        this._loading = false;
    }

    async navigateToPrototype(): Promise<void> {
        if (this._loading) {
            return;
        }

        this._loading = true;

        if (this._uiState.navigation.templateId) {
            if (
                !this._domain.content.entities.has(
                    this._uiState.navigation.templateId
                )
            ) {
                await this._domain.content.fetch(
                    this._uiState.navigation.templateId
                );
            }

            const template = this._domain.content.entities.get(
                this._uiState.navigation.templateId
            ) as Reptile.Models.ITemplate;

            if (template) {
                if (!template.publication) {
                    await template.fetchPublication();
                }

                if (template.publication) {
                    this._uiState.navigation.navigate(
                        `/prototype/${template.publication.id}/${template.id}`
                    );
                } else {
                    this._error = template.state.publication.error;
                }
            } else {
                this._error = this._domain.content.status.entities.get(
                    this._uiState.navigation.templateId
                )?.error;
            }
        }

        this._loading = false;
    }

    async navigateToFinish(): Promise<void> {
        if (this._loading) {
            return;
        }

        this._loading = true;

        if (this._uiState.navigation.templateId) {
            if (
                !this._domain.content.entities.has(
                    this._uiState.navigation.templateId
                )
            ) {
                await this._domain.content.fetch(
                    this._uiState.navigation.templateId
                );
            }

            const template = this._domain.content.entities.get(
                this._uiState.navigation.templateId
            ) as Reptile.Models.ITemplate;

            if (template) {
                if (!template.publication) {
                    await template.fetchPublication();
                }

                if (template.publication) {
                    this._uiState.navigation.navigate(
                        `/finish/${template.publication.id}/${template.id}`
                    );
                } else {
                    this._error = template.state.publication.error;
                }
            } else {
                this._error = this._domain.content.status.entities.get(
                    this._uiState.navigation.templateId
                )?.error;
            }
        }

        this._loading = false;
    }

    async initialize(): Promise<void> {
        if (this._domain.user.status.current.status !== 'done') {
            await this._domain.user.fetch();
        }
    }

    async navigateToContent(): Promise<void> {
        if (this._loading) {
            return;
        }
        this._loading = true;

        if (this._uiState.navigation.templateId) {
            if (
                !this._domain.content.entities.has(
                    this._uiState.navigation.templateId
                )
            ) {
                await this._domain.content.fetch(
                    this._uiState.navigation.templateId
                );
            }
            const template = this._domain.content.entities.get(
                this._uiState.navigation.templateId
            ) as Reptile.Models.ITemplate;
            if (template) {
                if (!template.publication) {
                    await template.fetchPublication();
                }

                if (template.publication) {
                    this._uiState.navigation.navigate(
                        `/publication/${template.publication.id}`
                    );
                } else {
                    this._error = template.state.publication.error;
                }
            } else {
                this._error = this._domain.content.status.entities.get(
                    this._uiState.navigation.templateId
                )?.error;
            }
        }
        this._loading = false;
    }

    async navigateToDesign(): Promise<void> {
        if (this._loading) {
            return;
        }
        this._loading = true;

        if (this._uiState.navigation.templateId) {
            if (
                !this._domain.content.entities.has(
                    this._uiState.navigation.templateId
                )
            ) {
                await this._domain.content.fetch(
                    this._uiState.navigation.templateId
                );
            }
            const template = this._domain.content.entities.get(
                this._uiState.navigation.templateId
            ) as Reptile.Models.ITemplate;
            if (template) {
                if (!template.publication) {
                    await template.fetchPublication();
                }

                if (template.publication) {
                    this._uiState.navigation.navigate(
                        `/template/${template.id}`
                    );
                } else {
                    this._error = template.state.publication.error;
                }
            } else {
                this._error = this._domain.content.status.entities.get(
                    this._uiState.navigation.templateId
                )?.error;
            }
        }

        if (
            this._domain.content.entities &&
            this._uiState.navigation.entityId
        ) {
            const template = this._domain.content.entities
                .get(this._uiState.navigation.entityId)
                ?.children.filter((e) => {
                    return e.contentEntityType.entityTypeName === 'Template';
                });
            if (template) {
                this._uiState.navigation.navigate(
                    `/template/${template[0].id}`
                );
            }
        }
        this._loading = false;
    }

    async navigateToHome(): Promise<void> {
        this._uiState.navigation.navigate('/content');
        await Promise.resolve();
    }

    async navigateToPlan(): Promise<void> {
        this._uiState.navigation.navigate('/plan');
        await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
