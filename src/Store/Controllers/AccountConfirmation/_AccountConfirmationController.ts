import { makeAutoObservable } from 'mobx';

type IAccountConfirmationController =
    Reptile.Controllers.IAccountConfirmationController;

export default class _IAccountConfirmationController
    implements IAccountConfirmationController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _emailVerified: boolean;

    private _partner: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<
            _IAccountConfirmationController,
            '_domain' | '_uiState'
        >(this, {
            _domain: false,
            _uiState: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._emailVerified = false;
        this._partner = false;
    }

    get status() {
        return this._domain.accounts.status.confirm;
    }

    get emailVerified(): boolean {
        return this._emailVerified;
    }

    get verified(): boolean {
        return this._domain.accounts.verified;
    }

    get partner(): boolean {
        return this._partner;
    }

    navigateToLogin(): void {
        this._uiState.navigation.navigate('/login');
    }

    navigateTobookAMeeting(): void {
        // not sure what the url is?
        window.open('');
    }

    get deps(): readonly unknown[] {
        return [];
    }

    async confirmAccount(
        userId: string,
        code: string,
        isPartner: string,
        isEmailVerified: string
    ): Promise<void> {
        if (userId && code) {
            await this._domain.accounts.confirmAccount(
                userId,
                code,
                isPartner
            );
        }

        if (isPartner) {
            this._partner = isPartner.toLocaleLowerCase() === 'true';
        }

        if (isEmailVerified) {
            this._emailVerified =
                isEmailVerified.toLocaleLowerCase() === 'true';
        }
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
