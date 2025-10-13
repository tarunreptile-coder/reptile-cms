import { makeAutoObservable } from 'mobx';
import GeneralActiveController from './_GeneralActiveController';
import GeneralClientIdController from './_GeneralClientIdController';
import GeneralIgnoreSectionsController from './_GeneralIgnoreSectionsController';
import GeneralShowCoverController from './_GeneralShowCoverController';
import GeneralLabelController from './_GeneralLabelController';
import GeneralRadiusController from './_GeneralRadiusController';
import GeneralSkipArticlesController from './_GeneralSkipArticlesController';
import GeneralSkipIssuesController from './_GeneralSkipIssuesController';
import GeneralSkipSectionsController from './_GeneralSkipSectionsController';
import GeneralSrcController from './_GeneralSrcController';
import GeneralTextController from './_GeneralTextController';
import GeneralUnitIdController from './_GeneralUnitIdController';
import GeneralVideoController from './_GeneralVideoController';
import GeneralVisibleItemsController from './_GeneralVisibleItemsController';
import StyleBackgroundColorController from './_StyleBackgroundColorController';
import StyleBackgroundImageController from './_StyleBackgroundImageController';
import StyleBorderColorController from './_StyleBorderColorController';
import StyleBorderRadiusController from './_StyleBorderRadiusController';
import StyleBorderWidthController from './_StyleBorderWidthController';
import StyleColorController from './_StyleColorController';
import StyleFontFamilyController from './_StyleFontFamilyController';
import StyleFontSizeController from './_StyleFontSizeController';
import StyleFontStyleController from './_StyleFontStyleController';
import StyleHeightController from './_StyleHeightController';
import StyleMarginController from './_StyleMarginController';
import StyleMinHeightController from './_StyleMinHeightController';
import StylePaddingController from './_StylePaddingController';
import StyleShadowBlurController from './_StyleShadowBlurController';
import StyleShadowColorController from './_StyleShadowColorController';
import StyleShadowHorizontalController from './_StyleShadowHorizontalController';
import StyleShadowSpreadController from './_StyleShadowSpreadController';
import StyleShadowVerticalController from './_StyleShadowVerticalController';
import StyleTextAlignController from './_StyleTextAlignController';
import StyleWidthController from './_StyleWidthController';
import ContentResetController from './_ContentResetController';
import GeneralImagePositionController from './_GeneralImagePositionController';
import StyleMenuAlignController from './_StyleMenuAlignController';
import StyleDisplayController from './_StyleDisplayController';
import GeneralLinkController from './_GeneralLinkController';
import StyleAppPaddingController from './_StyleAppPaddingController';
import StyleAppMarginController from './_StyleAppMarginController';
import GeneralActionController from './_GeneralActionController';
import GeneralScreenController from './_GeneralScreenController';
import GlobalStylesController from './_GlobalStylesController';
import { WidgetEditorController } from '..';
import { GlobalWidgetStyles } from '@Reptile/Components/Organisms';
import { DEFAULT_MASTER_STYLES } from '@Reptile/Constants/Constants';
import StyleFontSizeColorController from './_StyleFontSizeColorController';
import StyleFontSizeBackgroundColorController from './_StyleFontSizeBackgroundColorController';

type IWidgetSettingsController = Reptile.Controllers.IWidgetSettingsController;

type WidgetSettingControllerPrivateFields = '_domain' | '_uiState' | '_inheritedComponent' | '_activeWidgetTracker' | '_widgetRegistry';

export default class _WidgetSettingController implements IWidgetSettingsController {
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private readonly _activeWidgetTracker: Reptile.Controllers.IActiveWidgetTracker;

    private readonly _widgetRegistry: Reptile.Controllers.IWidgetRegistry;
    
    private _globalWidgetStyles: Reptile.Controllers.IGlobalStylesController | undefined;

    private readonly _inheritedComponent?: Reptile.Models.IWidget | Reptile.Models.IWidgetComponent;

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        activeWidgetTracker: Reptile.Controllers.IActiveWidgetTracker,
        widgetRegistry: Reptile.Controllers.IWidgetRegistry,
        component?: Reptile.Models.IWidget | Reptile.Models.IWidgetComponent,
    ) {
        makeAutoObservable<_WidgetSettingController, WidgetSettingControllerPrivateFields>(this, {
            _domain: false,
            _uiState: false,
            _inheritedComponent: false,
            _activeWidgetTracker: false,
            _widgetRegistry: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._activeWidgetTracker = activeWidgetTracker;
        this._widgetRegistry = widgetRegistry;
        this._inheritedComponent = component;
        this._globalWidgetStyles = undefined;
    }

    private get component(): Reptile.Models.IWidget | Reptile.Models.IWidgetComponent | undefined {
        return this._inheritedComponent ?? this._activeWidgetTracker.activeWidget;
    }

    get widgetId(): string | undefined {                
        return this._activeWidgetTracker.activeWidget?.id;
    }

    get layout(): Reptile.Controllers.WidgetSettingsLayout | undefined {
        return this._activeWidgetTracker.activeWidget
            ? this._widgetRegistry.registry.get(this._activeWidgetTracker.activeWidget.type)?.settings
            : undefined;
    }

    get isLocked(): boolean | undefined {
        if (!this._activeWidgetTracker.activeWidget) {
          return undefined;
        }
        return this._activeWidgetTracker.activeWidget.isLocked;
    }

    set isLocked(v: boolean) {
        if (!this._activeWidgetTracker.activeWidget) {
            return;
        }
        this._activeWidgetTracker.activeWidget.isLocked = v;
    }

    get globalStylesLayout(): Reptile.Controllers.WidgetSettingsLayout | undefined {
        return GlobalWidgetStyles;
    }

    get globalWidgetStyles(): Reptile.Controllers.IGlobalStylesController {
        const templateId = this._uiState.navigation.templateId;
        let initialStyles = this._activeWidgetTracker.masterStyle
        if(templateId) {
            const template = this._domain.content.entities.get(templateId)
           initialStyles = template?.masterStyle
        } else {
            // Initialize with a nested structure
            initialStyles = DEFAULT_MASTER_STYLES;
        }
        this._globalWidgetStyles = new GlobalStylesController(
            this._uiState,
            this._domain,
            initialStyles
        );
        return this._globalWidgetStyles;
    }

    get contents(): Reptile.Controllers.IWidgetSettingsController[] {
        return (this.component as Reptile.Models.IWidget | undefined)?.contents?.map(
            (c) => new _WidgetSettingController(this._uiState, this._domain, this._activeWidgetTracker, this._widgetRegistry, c),
        ) ?? [];
    }

    get contentReset(): Reptile.Controllers.IResetPropertyController | undefined {
        return this.component ? new ContentResetController(this._uiState, this._domain, (this.component as Reptile.Models.IWidget | undefined)?.contents) : undefined;
    }
    
    get editor(): Reptile.Controllers.ITextEditorController | undefined {
        return this.component ? new WidgetEditorController(this._uiState, this._domain, (this.component as Reptile.Models.IWidget | undefined)) : undefined;
    }

    get generalAction(): Reptile.Controllers.IDropdownPropertyController | undefined {
        return this.component ? new GeneralActionController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalIsActive(): Reptile.Controllers.ICheckboxPropertyController | undefined {
        return this.component ? new GeneralActiveController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalClientId(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralClientIdController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalIgnoreSections(): Reptile.Controllers.ICheckboxPropertyController | undefined {
        return this.component ? new GeneralIgnoreSectionsController(this._uiState, this._domain, this.component.properties) : undefined;
    }
    
    get generalShowCover(): Reptile.Controllers.ICheckboxPropertyController | undefined {
        return this.component ? new GeneralShowCoverController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalImagePosition(): Reptile.Controllers.IImagePositionPropertyController | undefined {
        return this.component ? new GeneralImagePositionController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalLabel(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralLabelController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalLink(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralLinkController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalScreen(): Reptile.Controllers.IDropdownPropertyController | undefined {
        return this.component ? new GeneralScreenController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalRadius(): Reptile.Controllers.ISliderPropertyController | undefined {
        return this.component ? new GeneralRadiusController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalSkipArticles(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralSkipArticlesController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalSkipIssues(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralSkipIssuesController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalSkipSections(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralSkipSectionsController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalSrc(): Reptile.Controllers.IFileDropPropertyController | undefined {
        return this.component ? new GeneralSrcController(this._uiState, this._domain, this.component.properties, this.widgetId ?? '') : undefined;
    }

    get generalText(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralTextController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalUnitId(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralUnitIdController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalIsVideo(): Reptile.Controllers.ICheckboxPropertyController | undefined {
        return this.component ? new GeneralVideoController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get generalVisibleItems(): Reptile.Controllers.IInputPropertyController | undefined {
        return this.component ? new GeneralVisibleItemsController(this._uiState, this._domain, this.component.properties) : undefined;
    }

    get stylesBackgroundColor(): Reptile.Controllers.IColorPropertyController | undefined {
        return this.component ? new StyleBackgroundColorController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesBackgroundImage(): Reptile.Controllers.IFileDropPropertyController | undefined {        
        return this.component ? new StyleBackgroundImageController(this._uiState, this._domain, this.component.styles, this.widgetId ?? '', this.component.type) : undefined;
    }

    get stylesBorderColor(): Reptile.Controllers.IColorPropertyController | undefined {
        return this.component ? new StyleBorderColorController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesBorderRadius(): Reptile.Controllers.ISliderPropertyController | undefined {
        return this.component ? new StyleBorderRadiusController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesBorderWidth(): Reptile.Controllers.ISliderPropertyController | undefined {
        return this.component ? new StyleBorderWidthController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesColor(): Reptile.Controllers.IColorPropertyController | undefined {
        return this.component ? new StyleColorController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesDisplay() {
        return this.component ? new StyleDisplayController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesFontFamily(): Reptile.Controllers.IFontFamilyPropertyController | undefined {
        return this.component ? new StyleFontFamilyController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesFontSize(): Reptile.Controllers.ISizePropertyController | undefined {
        return this.component ? new StyleFontSizeController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesFontStyle(): Reptile.Controllers.IFontStylePropertyController | undefined {
        return this.component ? new StyleFontStyleController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesHeight(): Reptile.Controllers.ISizePropertyController | undefined {
        return this.component ? new StyleHeightController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesMargin(): Reptile.Controllers.ISpacingPropertyController | undefined {
        return this.component ? new StyleMarginController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesAppMargin(): Reptile.Controllers.ISpacingPropertyController | undefined {
        return this.component ? new StyleAppMarginController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesMinHeight(): Reptile.Controllers.ISizePropertyController | undefined {
        return this.component ? new StyleMinHeightController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesPadding(): Reptile.Controllers.ISpacingPropertyController | undefined {
        return this.component ? new StylePaddingController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesAppPadding(): Reptile.Controllers.ISpacingPropertyController | undefined {
        return this.component ? new StyleAppPaddingController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesBoxShadowBlur(): Reptile.Controllers.ISliderPropertyController | undefined {
        return this.component ? new StyleShadowBlurController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesBoxShadowColor(): Reptile.Controllers.IColorPropertyController | undefined {
        return this.component ? new StyleShadowColorController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesBoxShadowHorizontal(): Reptile.Controllers.ISliderPropertyController | undefined {
        return this.component ? new StyleShadowHorizontalController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesBoxShadowSpread(): Reptile.Controllers.ISliderPropertyController | undefined {
        return this.component ? new StyleShadowSpreadController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesBoxShadowVertical(): Reptile.Controllers.ISliderPropertyController | undefined {
        return this.component ? new StyleShadowVerticalController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesMenuAlign(): Reptile.Controllers.IAlignmentPropertyController | undefined {
        return this.component ? new StyleMenuAlignController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesTextAlign(): Reptile.Controllers.IAlignmentPropertyController | undefined {
        return this.component ? new StyleTextAlignController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesWidth(): Reptile.Controllers.ISizePropertyController | undefined {
        return this.component ? new StyleWidthController(this._uiState, this._domain, this.component.styles) : undefined;
    }

    get stylesFontSizeColor(): Reptile.Controllers.IColorPropertyController | undefined {
        return this.component ? new StyleFontSizeColorController(this._uiState, this._domain, this.component.styles, this._activeWidgetTracker) : undefined;
    }
    
    get stylesFontSizeBackgroundColor(): Reptile.Controllers.IColorPropertyController | undefined {
        return this.component ? new StyleFontSizeBackgroundColorController(this._uiState, this._domain, this.component.styles, this._activeWidgetTracker) : undefined;
    }

    get deps(): readonly unknown[] {
        return [this._activeWidgetTracker.activeWidget, this._globalWidgetStyles];
    }

    async initialize(): Promise<void> {
        await Promise.resolve();
    }

    dispose(): void {
        /* Do nothing */
    }
}
