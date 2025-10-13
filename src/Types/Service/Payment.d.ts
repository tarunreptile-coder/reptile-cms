declare namespace Reptile.Service {
    export type Products = {
        object: string;
        data: Product[];
        has_more: boolean;
        url: string;
    };

    export interface Product {
        id: string;
        object: string;
        active: boolean;
        attributes: any[];
        caption: any;
        created: number;
        deactivate_on: any;
        description: string;
        images: string[];
        livemode: boolean;
        metadata: Record<string, unknown>;
        name: string;
        package_dimensions: any;
        shippable: any;
        statement_descriptor: any;
        type: string;
        unit_label: any;
        updated: number;
        url: string;
    }

    export type Prices = {
        object: string;
        data: Price[];
        has_more: boolean;
        url: string;
    };

    export type Price = {
        id: string;
        object: string;
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: 'gbp' | 'eur' | 'usd';
        livemode: boolean;
        lookup_key: any;
        metadata: Record<string, unknown>;
        nickname: any;
        product: string;
        recurring?: Recurring;
        tiers: 'basic' | 'professional';
        tiers_mode: any;
        transform_quantity: any;
        type: string;
        unit_amount: number;
        unit_amount_decimal: number;
    };

    export type Recurring = {
        aggregate_usage: any;
        interval: string;
        interval_count: number;
        trial_period_days: any;
        usage_type: string;
    };
}
