type IAuthenticationService = Reptile.Service.IAuthenticationService;

export default class _AuthenticationService implements IAuthenticationService {
    private readonly _api: Reptile.Service.IReptileRestApi;

    private readonly _eventSource = new EventTarget();

    private _requestInProcess = false;

    private validateToken(token: string | null): string | null {
        if (!token) {
            return null;
        }

        const parsedToken = JSON.parse(token) as Partial<
            Reptile.Service.AuthToken & { createdAt: number }
        >;

        if (
            !parsedToken.access_token ||
            !parsedToken.expires_in ||
            !parsedToken.createdAt
        ) {
            return null;
        }

        if (
            parsedToken.createdAt + parsedToken.expires_in * 1000 /* ms */ <=
            Date.now()
        ) {
            return null;
        }

        return parsedToken.access_token;
    }

    constructor(api: Reptile.Service.IReptileApi) {
        this._api = api as Reptile.Service.IReptileRestApi;
    }

    getToken(): Promise<string> {
        const token = this.validateToken(localStorage.getItem('auth'));

        if (token) {
            return Promise.resolve(token);
        }

        return new Promise((resolve) => {
            const onSignIn = (event: Event) => {
                this._requestInProcess = false;
                this._eventSource.removeEventListener('sign-in', onSignIn);
                resolve(
                    ((event as CustomEvent).detail as Reptile.Service.AuthToken)
                        .access_token
                );
            };
            this._eventSource.addEventListener('sign-in', onSignIn);
            if (!this._requestInProcess) {
                this._requestInProcess = true;
                this._eventSource.dispatchEvent(new Event('auth-required'));
            }
        });
    }

    async signIn(
        username: string,
        password: string
    ): Promise<Reptile.Service.AuthToken> {
        const data = `${encodeURIComponent('username')}=${encodeURIComponent(
            username
        )}&${encodeURIComponent('password')}=${encodeURIComponent(
            password
        )}&${encodeURIComponent('grant_type')}=${encodeURIComponent(
            'password'
        )}`;
        // Take the date before call to server
        const currentDate = Date.now();
        // Call server
        const token: Reptile.Service.AuthToken =
            await this._api.httpPublic.post('/token', data);
        // Set the token together with the date in local storage
        localStorage.setItem(
            'auth',
            JSON.stringify({
                ...token,
                createdAt: currentDate,
            })
        );
        // Dispatch the event for api calls waiting on the auth to finish
        this._eventSource.dispatchEvent(
            new CustomEvent('sign-in', { detail: token })
        );
        return token;
    }

    signOut(): Promise<void> {
        localStorage.removeItem('auth');
        localStorage.removeItem('role');
        return Promise.resolve();
    }

    onAuthenticationRequired(listener: () => void): () => void {
        this._eventSource.addEventListener('auth-required', listener);
        return () =>
            this._eventSource.removeEventListener('auth-required', listener);
    }
}
