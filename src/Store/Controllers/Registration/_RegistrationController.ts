import { makeAutoObservable } from 'mobx';

type IRegistrationController = Reptile.Controllers.IRegistrationController;

export default class _IRegistrationController
    implements IRegistrationController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _firstname: string;

    private _lastname: string;

    private _email: string;

    private _password: string;

    private _passwordVisibility: boolean;

    private _termsAndPrivacy: boolean;

    private _requiredAccountConfirmation: boolean;

    private _successRegistration: boolean;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain
    ) {
        makeAutoObservable<_IRegistrationController, '_domain' | '_uiState'>(
            this,
            {
                _domain: false,
                _uiState: false,
                dispose: false,
            }
        );

        this._uiState = uiState;
        this._domain = domain;
        this._firstname = '';
        this._lastname = '';
        this._email = '';
        this._password = '';
        this._passwordVisibility = false;
        this._termsAndPrivacy = false;
        this._requiredAccountConfirmation = false;
        this._successRegistration = false;
    }
    get firstname(): string {
        return this._firstname;
    }

    set firstname(v: string) {
        this._firstname = v;
    }

    get lastname(): string {
        return this._lastname;
    }

    set lastname(v: string) {
        this._lastname = v;
    }

    get email(): string {
        return this._email;
    }

    set email(v: string) {
        this._email = v;
    }

    get password(): string {
        return this._password;
    }

    set password(v: string) {
        this._password = v;
    }

    get passwordVisibility(): boolean {
        return this._passwordVisibility;
    }

    set passwordVisibility(v: boolean) {
        this._passwordVisibility = v;
    }

    get termsAndPrivacy(): boolean {
        return this._termsAndPrivacy;
    }

    set termsAndPrivacy(v: boolean) {
        this._termsAndPrivacy = v;
    }

    get requiredAccountConfirmation(): boolean {
        return this._requiredAccountConfirmation;
    }

    set requiredAccountConfirmation(v: boolean) {
        this._requiredAccountConfirmation = v;
    }

    get successRegistration(): boolean {
        return this._successRegistration;
    }

    set successRegistration(v: boolean) {
        this._successRegistration = v;
    }

    get deps(): readonly unknown[] {
        return [];
    }

    async signUp(): Promise<void> {
        await this._domain.register.signUp(
            this._firstname,
            this._lastname,
            this._email,
            this._password,
            this._termsAndPrivacy,
            this._requiredAccountConfirmation
        );

        if (this._domain.register.status.status === 'done') {
            this._successRegistration = true;
        }
        if (this._domain.register.status.status === 'error') {
            this._successRegistration = false;
        }
    }

    async initialize(): Promise<void> {
        return await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
