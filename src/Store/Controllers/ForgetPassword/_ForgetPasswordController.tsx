import { makeAutoObservable } from 'mobx';

type IForgetPasswordController = Reptile.Controllers.IForgetPasswordController;

export default class _ForgetPasswordController implements IForgetPasswordController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _email: string;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_ForgetPasswordController, '_domain' | '_uiState'>(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._email = '';
    }

    get email(): string {
        return this._email;
    }

    set email(v: string) {
        this._email = v;
    }

    get error(): boolean {
        return this._domain.register.status.status == 'error';
    }

    get done(): boolean {
        return this._domain.register.status.status == 'done';
    }

    async forgetPassword(): Promise<void> {
        await this._domain.register.forgetPassword(this._email);
    }

    navigateToLoginPage(): void {
        this._uiState.navigation.navigate('/login');
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    get deps(): readonly unknown[] {
        return [];
    }

    dispose(): void {
        /* Do nothing */
    }
}
