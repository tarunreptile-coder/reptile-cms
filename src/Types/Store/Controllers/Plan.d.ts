declare namespace Reptile.Controllers {
    export interface IPlanController extends IController {
        toggle: boolean;

        currency: 'gbp' | 'eur' | 'usd';

        basicPrice?: string;

        professionalPrice?: string;

        plansList: Reptile.Models.PlansByCurrency;

        getPrices(): Promise<void>;

        setSelectedPlan(planId: string): void;

        handleBasic(): void;

        handleProfessional(): void;

        setPrice(): void;

        getPlansList(): void;
    }
}
