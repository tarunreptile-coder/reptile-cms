import { makeAutoObservable } from 'mobx';

type IResetPasswordController = Reptile.Controllers.IResetPasswordController;

export default class _ResetPasswordController
    implements IResetPasswordController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _password: string;

    private _confirm: string;

    private _passwordVisibility: boolean;

    private _confirmVisibility: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_ResetPasswordController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._password = '';
        this._confirm = '';
        this._passwordVisibility = false;
        this._confirmVisibility = false;
    }

    get password() {
        return this._password;
    }

    set password(v) {
        this._password = v;
    }

    get confirm() {
        return this._confirm;
    }

    set confirm(v) {
        this._confirm = v;
    }

    get passwordVisibility() {
        return this._passwordVisibility;
    }

    set passwordVisibility(v) {
        this._passwordVisibility = v;
    }

    get confirmVisibility() {
        return this._confirmVisibility;
    }

    set confirmVisibility(v) {
        this._confirmVisibility = v;
    }

    get validatePassword() {
        const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        if (
            !!this._password &&
            !!this._confirm &&
            this._password === this._confirm
        ) {
            return regex.test(this._confirm);
        }
        return false;
    }

    get missingChar() {
        const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

        return regex.test(this._password);
    }

    get error(): boolean {
        return this._domain.register.status.status == 'error';
    }

    get done(): boolean {
        return this._domain.register.status.status == 'done';
    }

    async resetPassword(username: string, code: string, isNewUser?: string): Promise<void> {
        if (!!this._password && !!this._confirm)
            await this._domain.register.resetPassword(
                username,
                this._password,
                this._confirm,
                code,
                isNewUser
            );
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
