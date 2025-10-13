import { makeAutoObservable } from 'mobx';
import { NavigateFunction } from 'react-router-dom';

type INavigationController = Reptile.Controllers.INavigationController;

export default class _NavigationController implements INavigationController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    navigate: NavigateFunction = () => { /* Default empty function */ };

    entityId?: string;

    articleId?: string;

    templateId?: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
    ) {
        makeAutoObservable<_NavigationController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            navigate: false,
            dispose: false,
        });
        this._uiState = uiState;
        this._domain = domain;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    async initialize(params: Reptile.Controllers.NavigationParams, navigate: NavigateFunction): Promise<void> {
        this.entityId = params.entityId;
        this.articleId = params.articleId;
        this.templateId = params.templateId;
        this.navigate = navigate;

        return await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
