import { makeAutoObservable } from 'mobx';

type IThemesFontFamilyController =
    Reptile.Controllers.IThemesFontFamilyController;

export default class ThemesFontFamilyController
    implements IThemesFontFamilyController
{
    private readonly _domain: Reptile.Models.IDomain;

    private readonly _uiState: Reptile.Controllers.IUiState;

    private _selectedRule: Reptile.Models.Rule;

    private _property: string;

    private _value: string;

    private _fonts: Reptile.Models.FontName[];

    constructor(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        selectedRule: Reptile.Models.Rule
    ) {
        makeAutoObservable<
            ThemesFontFamilyController,
            '_domain' | '_uiState' | '_selectedRule'
        >(this, {
            _domain: false,
            _uiState: false,
            _selectedRule: false,
            label: false,
            dispose: false,
        });

        this._uiState = uiState;
        this._domain = domain;
        this._selectedRule = selectedRule;
        this._fonts = [
            {
                name: 'Arial, Helvetica, sans-serif',
                displayName: 'Arial, Helvetica',
            },
            { name: "'Andada Pro', serif", displayName: 'Andada Pro' },
            { name: "'Archivo', sans-serif", displayName: 'Archivo' },
            { name: "'EB Garamond', serif", displayName: 'EB Garamond' },
            { name: "'Epilogue', sans-serif", displayName: 'Epilogue' },
            { name: "'Inter', sans-serif", displayName: 'Inter' },
            {
                name: "'JetBrains Mono', monospace",
                displayName: 'JetBrains Mono',
            },
            { name: "'Lato', sans-serif", displayName: 'Lato' },
            { name: "'Lora', serif", displayName: 'Lora' },
            { name: "'Merriweather', serif", displayName: 'Merriweather' },
            { name: "'Montserrat', sans-serif", displayName: 'Montserrat' },
            { name: "'Nunito', sans-serif", displayName: 'Nunito' },
            { name: "'Open Sans', sans-serif", displayName: 'Open Sans' },
            { name: "'Oswald', sans-serif", displayName: 'Oswald' },
            {
                name: "'Playfair Display', serif",
                displayName: 'Playfair Display',
            },
            { name: "'Poppins', sans-serif", displayName: 'Poppins' },
            { name: "'Raleway', sans-serif", displayName: 'Raleway' },
            { name: "'Roboto', sans-serif", displayName: 'Roboto' },
            { name: "'Sora', sans-serif", displayName: 'Sora' },
            {
                name: "'Source Serif Pro', serif",
                displayName: 'Source Serif Pro',
            },
            { name: "'Work Sans', sans-serif", displayName: 'Work Sans' },
        ];
        this._property = 'font-family';
        this._value =
            this._selectedRule.declarations.find(
                (e) => e.property === this._property
            )?.value ?? '';
    }

    private get theme() {
        return this._domain.theme.theme;
    }

    get fonts() {
        return this._fonts;
    }

    get label(): string {
        return 'Font Family';
    }

    get fontIndex(): number {
        return this.fonts.findIndex((e) => e.name === this._value);
    }

    set fontIndex(v: number) {
        if (v < this.fonts.length) {
            this.theme?.update(
                this._selectedRule,
                this._property,
                this.fonts[v].name
            );
        }
    }

    get font(): string {
        return this.fontIndex !== -1
            ? this.fonts[this.fontIndex].displayName
            : '';
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
