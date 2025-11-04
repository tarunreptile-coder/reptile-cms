type GlobalError = Error;

declare namespace Reptile.Service {
    export interface Error extends GlobalError {
        data: string,
    }
}
