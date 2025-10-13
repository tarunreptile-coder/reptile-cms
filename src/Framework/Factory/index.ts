

export default class _Factory<T, Args extends readonly unknown[]> {
    private readonly _Product: { new (...args: Args): T };

    constructor(Product: { new (...args: Args): T }) {
        this._Product = Product;
    }

    create(...args: Args): T {
        return new this._Product(...args);
    }
}
