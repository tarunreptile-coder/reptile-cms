import { observer } from 'mobx-react-lite';
import React from 'react';

/**
 * Helper function to resolve the reactive value ->
 * if prop is a function, call the function and return the value else propagate the prop
 * @param v prop to call or propagate
 * @returns reactive value
 */
export const reactiveValue = <T>(v: T | (() => T)): T => typeof v === 'function' ? (v as () => T)() : v;

/**
 * Proxy to get the reactive value only from the props that are being used in the component.
 * This way the props that are not being used can be propagated to child components.
 * That avoids reacting on values that are not used in component and reduces the rerenders.
 * @param props Component props
 * @returns Reactive props
 */
const ReactiveProxy = <Props>(props: Reptile.Framework.ReactiveProps<Props>) => new Proxy({}, {
    get(_: Record<string, unknown>, name: string) {
        return reactiveValue((props as Record<string, unknown>)[name]);
    }
}) as unknown as Reptile.Framework.PropsNoFunction<Props>;

/**
 * Wrapper for the component.
 * Wraps the component in observer and allows the component to dereference reactive props and propagate other props.
 * Props that are to be propagated - callback functions and reactive values that are not used in this but in a child component.
 * This is used to optimize performance and rerenders according to mobx documentation https://mobx.js.org/react-optimizations.html#dereference-values-late.
 * @param component Component to wrap
 * @returns Observed component
 */
export const reactive = <Props = Record<string, unknown>>(component: Reptile.Framework.ReactiveFunctionComponent<Props>) => observer(
    (props: Reptile.Framework.ReactiveProps<Props>) => component(ReactiveProxy(props), props),
);

/**
 * Same as `reactive` but just with forward ref.
 * @param component Component to wrap
 * @returns Observed component
 */
export const reactiveForwardRef = <T = unknown, Props = Record<string, unknown>>(component: Reptile.Framework.ReactiveForwardRefRenderFunction<T, Props>) => observer(
    // eslint-disable-next-line react/display-name
    React.forwardRef<T, Reptile.Framework.ReactiveProps<Props>>((props: Reptile.Framework.ReactiveProps<Props>, ref: React.ForwardedRef<T>) => component(ReactiveProxy(props), props, ref)),
);
