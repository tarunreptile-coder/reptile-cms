import { makeAutoObservable } from "mobx";
import { AsyncEventObject } from "@Reptile/Framework";

type IAuthenticationModel = Reptile.Models.IAuthenticationModel;

export default class _AuthenticationModel implements IAuthenticationModel {
  private readonly _api: Reptile.Service.IReptileApi;

  private readonly _domain: Reptile.Models.IDomain;

  private readonly _synchronization = new AsyncEventObject<"auth">();

  private _unsubscribe?: () => void;

  shouldAuthenticate: boolean;

  authState: Reptile.Models.State;

  constructor(
    domain: Reptile.Models.IDomain,
    api: Reptile.Service.IReptileApi
  ) {
    makeAutoObservable<
      _AuthenticationModel,
      "_api" | "_domain" | "_synchronization"
    >(this, {
      _api: false,
      _domain: false,
      _synchronization: false,
      dispose: false,
    });

    this._api = api;
    this._domain = domain;
    this.shouldAuthenticate = false;
    this.authState = {
      status: "initial",
    };
    this._unsubscribe = this._api.auth.onAuthenticationRequired(
      this.handleAuthenticationRequired.bind(this)
    );
  }
  validateLogin(arg0: { username: string; password: string }): unknown {
    throw new Error("Method not implemented.");
  }

  private handleAuthenticationRequired(): void {
    this.shouldAuthenticate = true;
  }

  async signIn(username: string, password: string): Promise<void> {
    if (this.authState.status === "pending") {
      await this._synchronization.wait("auth");
      return;
    }
    this.authState.status = "pending";

    try {
      await this._api.auth.signIn(username, password);
      await this._domain.user.fetch();
      this.shouldAuthenticate = false;
      this.authState.status = "done";
    } catch (error) {
      this.authState = {
        status: "error",
        error: (error as Reptile.Service.Error).data,
      };
    } finally {
      this._synchronization.signal("auth");
    }
  }

  async signOut(): Promise<void> {
    if (this.authState.status === "pending") {
      await this._synchronization.wait("auth");
      return;
    }
    this.authState.status = "pending";

    try {
      await this._api.auth.signOut();
      this.shouldAuthenticate = true;
      this.authState.status = "done";
    } catch (error) {
      this.authState = {
        status: "error",
        error: (error as Reptile.Service.Error).data,
      };
    } finally {
      this._synchronization.signal("auth");
    }
  }

  dispose(): void {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = undefined;
    }
  }
}
