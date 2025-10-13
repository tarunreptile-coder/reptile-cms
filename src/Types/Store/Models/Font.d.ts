declare namespace Reptile.Models {
    type FontName = {
        name: string,
        displayName: string,
    }

    type Font = {
        id: string,
        name: FontName,
        css: string,
    }
}
