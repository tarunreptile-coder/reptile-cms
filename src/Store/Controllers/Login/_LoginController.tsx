import { makeAutoObservable } from "mobx";

type ILoginController = Reptile.Controllers.ILoginController;

export default class _LoginController implements ILoginController {
  private readonly _domain: Reptile.Models.IDomain;

  private readonly _uiState: Reptile.Controllers.IUiState;

  private _username: string;

  private _password: string;

  private _passwordVisibility: boolean;

  constructor(
    uiState: Reptile.Controllers.IUiState,
    domain: Reptile.Models.IDomain
  ) {
    makeAutoObservable<_LoginController, "_domain" | "_uiState">(this, {
      _domain: false,
      _uiState: false,
      dispose: false,
    });

    this._uiState = uiState;
    this._domain = domain;
    this._username = "";
    this._password = "";
    this._passwordVisibility = false;
  }

  get username(): string {
    return this._username;
  }

  set username(v: string) {
    this._username = v;
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

  get error(): boolean {
    return this._domain.auth.authState.status == "error";
  }

  // async login(): Promise<void> {
  //   await this._domain.auth.signIn(this._username, this._password);
  //   await this._domain.content.fetch(undefined, 1);

  //   this._uiState.navigation.navigate("/content");
  // }

  async login(): Promise<void> {
    // Attempt to sign in
    await this._domain.auth.signIn(this._username, this._password);

    // Check if authentication was successful before navigating
    if (this._domain.auth.authState.status === "done") {
      await this._domain.content.fetch(undefined, 1);
      this._uiState.navigation.navigate("/content");
    }
  }

  navigateToRegisterPage(): void {
    this._uiState.navigation.navigate("/register");
  }

  navigateToForgetPasswordPage(): void {
    this._uiState.navigation.navigate("/forget-password");
  }

  navigateToTermsAndConditions(): void {
    window.open("https://www.reptile.app/terms-and-conditions");
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
