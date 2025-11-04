type IAccountService = Reptile.Service.IAccountService;

export default class _AccountService implements IAccountService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    readonly endpoint = 'Account';

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    async signUp(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        termsAndPrivacy: boolean,
        requiredAccountConfirmation: boolean
    ): Promise<Reptile.Service.Register> {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            termsAndPrivacy: termsAndPrivacy,
            requiredAccountConfirmation: requiredAccountConfirmation,
        };
        // Call server
        return await this._api.httpPublic.post(
            `${this.endpoint}/Register`,
            data
        );
    }

    async forgetPassword(email: string): Promise<void> {
        return await this._api.httpPublic.post(
            `${this.endpoint}/RequestPasswordReset?username=${email}&language=en-gb`,
            undefined
        );
    }

    async sendPasswordReset(id: string) {
        return await this._api.httpPublic.post(
            `${this.endpoint}/SendUserPasswordReset?userId=${id}`,
            undefined
        );
    }

    async resetPassword(
        username: string,
        password: string,
        confirmPassword: string,
        code: string,
        isNewUser: string
    ): Promise<void> {
        const data = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            code: code,
            isNewUser: isNewUser === 'True' ? true : undefined,
        };

        return await this._api.httpPublic.post(
            `${this.endpoint}/ResetPassword`,
            data
        );
    }

    async confirmAccount(
        userId: string,
        code: string,
        partner: string
    ): Promise<boolean> {
        return await this._api.httpPublic.post(
            `${
                this.endpoint
            }/AccountConfirmation?userId=${userId}&code=${encodeURIComponent(
                code
            )}&isPartner=${partner}`,
            undefined
        );
    }
}
