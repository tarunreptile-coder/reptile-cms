import { reactive, reactiveForwardRef } from '../ReactiveMobX';

export const controlled = <Props extends Record<string, unknown>, Controller>(
    component: Reptile.Framework.ReactiveFunctionComponent<Props & { controller: Controller }>,
) => {
    return reactive<Props & { controller: Controller }>(component);
};

export const controlledWithRef = <T, Props extends Record<string, unknown>, Controller>(
    component: Reptile.Framework.ReactiveForwardRefRenderFunction<T, Props & { controller: Controller }>
) => {
    return reactiveForwardRef<T, Props & { controller: Controller }>(component);
};
