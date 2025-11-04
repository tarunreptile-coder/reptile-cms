import React, { useEffect } from 'react';
import { PlanContent } from '@Reptile/Components/Organisms';
import { controlled } from '@Reptile/Framework';

const _Plan = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IPlanController
>(({ controller }) => {
    const handlePayment = (planId: string) => {
        controller.setSelectedPlan(planId);
    };
    
    const handleBasicPayment = () => {
        controller.handleBasic();
    };

    const handleProPayment = () => {
        controller.handleProfessional();
    };

    const handleToggle = () => {
        controller.toggle = !controller.toggle;
    };

    const handleGBP = () => {
        controller.currency = 'gbp';
    };

    const handleEUR = () => {
        controller.currency = 'eur';
    };

    const handleUSD = () => {
        controller.currency = 'usd';
    };

    useEffect(() => {
        void controller.getPrices();
    }, [controller]);

    useEffect(() => {
        controller.setPrice();
        controller.getPlansList();
    }, [controller, controller.toggle, controller.currency]);

    return (
        <div className='rt-payment'>
            <PlanContent
                plansList={controller.plansList}
                toggle={controller.toggle}
                currency={controller.currency}
                basicPrice={controller.basicPrice}
                professionalPrice={controller.professionalPrice}
                handlePayment={handlePayment}
                handleBasicPayment={handleBasicPayment}
                handleProPayment={handleProPayment}
                handleEUR={handleEUR}
                handleGBP={handleGBP}
                handleUSD={handleUSD}
                handleToggle={handleToggle}
            />
        </div>
    );
});

export default _Plan;
