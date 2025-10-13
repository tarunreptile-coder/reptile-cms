import { makeAutoObservable } from 'mobx';
import { AsyncEventObject } from '@Reptile/Framework';
import { Notification } from '@Reptile/Components/Atoms';
import { MESSAGES } from '@Reptile/Constants/Constants';

type IRegistrationModel = Reptile.Models.IRegistrationModel;

export default class _RegistrationModel implements IRegistrationModel {
    private readonly _api: Reptile.Service.IReptileApi;

    private readonly _domain: Reptile.Models.IDomain;

    private readonly _synchronization = new AsyncEventObject<'auth'>();

    status: Reptile.Models.State;

    constructor(
        domain: Reptile.Models.IDomain,
        api: Reptile.Service.IReptileApi
    ) {
        makeAutoObservable<
            _RegistrationModel,
            '_api' | '_domain' | '_synchronization'
        >(this, {
            _api: false,
            _domain: false,
            _synchronization: false,
            dispose: false,
        });

        this._api = api;
        this._domain = domain;
        this.status = { status: 'initial' };
    }

    async signUp(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        termsAndPrivacy: boolean,
        requiredAccountConfirmation: boolean
    ): Promise<void> {
        if (this.status.status === 'pending') {
            await this._synchronization.wait('auth');
            return;
        }
        this.status.status = 'pending';

        try {
            await this._api.account.signUp(
                firstname,
                lastname,
                email,
                password,
                termsAndPrivacy,
                requiredAccountConfirmation
            );
            this.status.status = 'done';
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_REGISTERING.mesage,
            });
        } finally {
            this._synchronization.signal('auth');
        }
    }

    async forgetPassword(email: string): Promise<void> {
        if (this.status.status === 'pending') {
            await this._synchronization.wait('auth');
            return;
        }
        this.status.status = 'pending';

        try {
            await this._api.account.forgetPassword(email);
            this.status.status = 'done';
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_PASSWORD_RESET.message,
            });
        } finally {
            this._synchronization.signal('auth');
        }
    }

    async resetPassword(
        username: string,
        password: string,
        confirm: string,
        code: string,
        isNewUser: string
    ): Promise<void> {
        if (this.status.status === 'pending') {
            await this._synchronization.wait('auth');
            return;
        }
        this.status.status = 'pending';

        try {
            await this._api.account.resetPassword(
                username,
                password,
                confirm,
                code,
                isNewUser
            );
            this.status.status = 'done';
        } catch (error) {
            this.status = {
                status: 'error',
                error: (error as Reptile.Service.Error).data,
            };
            Notification.error({
                description: MESSAGES.ERROR_RESET_PASSWORD.message,
            });
        } finally {
            this._synchronization.signal('auth');
        }
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }
}
