import { makeAutoObservable } from "mobx";

type ICheckboxPropertyController =
  Reptile.Controllers.ICheckboxPropertyController;

export default class GeneralShowCoverController
  implements ICheckboxPropertyController
{
  private readonly _domain: Reptile.Models.IDomain;

  private readonly _uiState: Reptile.Controllers.IUiState;

  private _generalProperties: Reptile.Models.IWidgetGeneralProperties;

  constructor(
    uiState: Reptile.Controllers.IUiState,
    domain: Reptile.Models.IDomain,
    generalProperties: Reptile.Models.IWidgetGeneralProperties
  ) {
    makeAutoObservable<
      GeneralShowCoverController,
      "_domain" | "_uiState" | "_generalProperties"
    >(this, {
      _domain: false,
      _uiState: false,
      _generalProperties: false,
      label: false,
      dispose: false,
    });

    this._uiState = uiState;
    this._domain = domain;
    this._generalProperties = generalProperties;
  }

  get label(): string {
    return "Show cover";
  }

  get active(): boolean {
    return this._generalProperties.showCover as boolean;
  }

  set active(v: boolean) {
    this._generalProperties.showCover = v;
  }

  async initialize(): Promise<void> {
    await Promise.resolve();
  }

  get deps(): readonly unknown[] {
    return [];
  }

  dispose(): void {
    /* Do nothing */
  }
}
