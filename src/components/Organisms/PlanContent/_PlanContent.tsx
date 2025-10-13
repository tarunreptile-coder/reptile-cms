import React, { useCallback, useRef } from 'react';
import { PickYourPlan } from '@Reptile/Components/Organisms';
import { reactive } from '@Reptile/Framework';
import { PlanDetails, PlanHeader } from '@Reptile/Components/Molecules';

import './_PlanContent.scss';

const _PlanContent = reactive<Reptile.Props.PlanContentProps>(
    (
        { toggle, basicPrice, professionalPrice, currency, plansList },
        {
            handlePayment,
            handleBasicPayment,
            handleEUR,
            handleGBP,
            handleProPayment,
            handleToggle,
            handleUSD,
        }
    ) => {
        const targetElementRef = useRef<HTMLDivElement | null>(null);

        const scrollToTargetElement = useCallback(() => {
            targetElementRef.current?.scrollIntoView();
        }, [targetElementRef]);

        return (
            <div className='rt-plan-content'>
                <PlanHeader
                    handlePayment={handleBasicPayment}
                    handlePlans={scrollToTargetElement}
                />
                <PlanDetails />
                <div ref={targetElementRef}>
                    <PickYourPlan
                        plansList={plansList}
                        toggle={toggle}
                        currency={currency}
                        basicPrice={basicPrice}
                        professionalPrice={professionalPrice}
                        handlePayment={handlePayment}
                        handleProPayment={handleProPayment}
                        handleToggle={handleToggle}
                        handleEUR={handleEUR}
                        handleGBP={handleGBP}
                        handleUSD={handleUSD}
                    />
                </div>
            </div>
        );
    }
);

export default _PlanContent;
