declare namespace Reptile.Framework {
    /**
     * Type for defining a value that can be raw value or getter.
     * Used for mobx optimizations as stated in https://mobx.js.org/react-optimizations.html#dereference-values-late
     */
    export type Reactive<T> = T | (() => T);

    /**
     * Used to wrap whole props (except functions) into Reactive prop.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    export type ReactiveProps<Props> = { [Prop in keyof Props]: Props[Prop] extends (Function | undefined) ? Props[Prop] : Reactive<Props[Prop]> };

    /**
     * Used for compiler errors when using passed callbacks as reactive prop.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    export type PropsNoFunction<Props> = { [Prop in keyof Props]: Props[Prop] extends (Function | undefined) ? never : Props[Prop] };

    /**
     * Type of wrapper for dereferencing the reactive prop more easily.
     * @param reactiveProps Props that dereferenced and reactive
     * @param props Props that are propagated
     */
    export type ReactiveFunctionComponent<Props> = (reactiveProps: PropsNoFunction<Props>, props: ReactiveProps<Props>) => React.ReactElement | null;

    /**
     * Type of wrapper for dereferencing the reactive prop more easily wit forwarded ref.
     * @param reactiveProps Props that dereferenced and reactive
     * @param props Props that are propagated
     * @param ref Passed ref
     */
    export type ReactiveForwardRefRenderFunction<T, Props> = (reactiveProps: PropsNoFunction<Props>, props: ReactiveProps<Props>, ref: React.ForwardedRef<T>) => React.ReactElement | null;
}
