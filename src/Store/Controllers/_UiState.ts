type IUiState = Reptile.Controllers.IUiState;

export default class _UiState implements IUiState {
    readonly navigation: Reptile.Controllers.INavigationController;
    readonly treeView: Reptile.Controllers.ITreeViewController;

    constructor(
        domain: Reptile.Models.IDomain,
        navigationFactory: Reptile.Controllers.IControllerFactory<Reptile.Controllers.INavigationController>,
        treeViewFactory: Reptile.Controllers.IControllerFactory<Reptile.Controllers.ITreeViewController>,
    ) {
        this.navigation = navigationFactory.create(this, domain);
        this.treeView = treeViewFactory.create(this, domain);
    }

    dispose(): void {
        this.navigation.dispose();
        this.treeView.dispose();
    }
}
