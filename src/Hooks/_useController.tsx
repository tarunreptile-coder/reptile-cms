import React, { useEffect, useRef } from 'react';
import { Factory } from '@Reptile/Framework';
import { useDomain, useUiState } from '@Reptile/Contexts';

type ControllerConstructor<T, Args extends readonly unknown[]> = {
    new(
        uiState: Reptile.Controllers.IUiState,
        domain: Reptile.Models.IDomain,
        ...args: Args
    ): T,
};

const _useController = <T extends Reptile.IDisposable, Args extends readonly unknown[]>(
    Controller: ControllerConstructor<T, Args>,
    ...args: Args
): T => {
    const domain = useDomain();
    const uiState = useUiState();

    const initialized = useRef(false);
    const controller = useRef<T | null>(null);

    if (!initialized.current) {
        controller.current = new Factory(Controller).create(uiState, domain, ...args);
        initialized.current = true;
    }

    useEffect(() => {
        return () => {
            controller.current?.dispose();
            controller.current = null;
        }
    }, []);

    return controller.current as T;
};

export default _useController;
