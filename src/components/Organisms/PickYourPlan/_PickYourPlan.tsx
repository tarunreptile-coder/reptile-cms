import React from 'react';
import { Separator, Text } from '@Reptile/Components/Atoms';
import { reactive } from '@Reptile/Framework';

import './_PickYourPlan.scss';
import { PaymentOptions, PaymentPlanCard } from '@Reptile/Components/Molecules';
import { CURRENCY_SYMBOLS, PLANS } from '@Reptile/Constants/Constants';
import { SUBSCRIPTION_PLANS } from '@Reptile/Constants/subscriptionPlansConfig';

const _PickYourPlan = reactive<Reptile.Props.PickYourPlanPlanProps>(
    (
        { toggle, basicPrice, professionalPrice, currency, plansList },
        {
            handlePayment,
            handleProPayment,
            handleToggle,
            handleGBP,
            handleEUR,
            handleUSD,
        }
    ) => {
        const billingCycle = !toggle ? "monthly" : "annual";
        const plansByCurrency = plansList[currency] || {};
        const plansByBilling = plansByCurrency ? plansByCurrency[billingCycle] || [] : [];
        return (
            <div>
                <div className='rt-payment-plan-modal'>
                    <Text
                        className={'title'}
                        color={'black'}
                        size={'extra-large'}
                        weight={'bold'}
                    >
                        Choose Your Subscription
                    </Text>

                    <PaymentOptions
                        toggle={toggle}
                        handleToggle={handleToggle}
                        handleGBP={handleGBP}
                        handleEUR={handleEUR}
                        handleUSD={handleUSD}
                    />

                    <div className='rt-payment-cards'>
                        {plansByBilling?.map((plan, index) => {
                            return (
                                <PaymentPlanCard
                                    key={plan.priceId}
                                    planType={plan.planName}
                                    price={`${CURRENCY_SYMBOLS[currency]}${plan.price}` ?? 'Loading...'}
                                    toggle={toggle}
                                    planInfo={plan.planInfo}
                                    listInfo={Object.values(plan.featuresList)}
                                    handlePayment={() => handlePayment(plan.priceId)}
                                />
                            )
                        })}
                        
                        {/* <PaymentPlanCard
                            planType={'Basic'}
                            price={basicPrice ?? 'Loading...'}
                            toggle={toggle}
                            planInfo={`A great way to start to design and build your
                                first apps. Upgrade to add more projects and
                                team members later`}
                            listInfo={PLANS.basic}
                            handlePayment={handleBasicPayment}
                        />

                        <PaymentPlanCard
                            planType={'Professional'}
                            price={professionalPrice ?? '£30'}
                            toggle={toggle}
                            planInfo={`A good plan for a medium-sized team. You can
                        flexibly add more projects and team members`}
                            listInfo={PLANS.professional}
                            handlePayment={handleProPayment}
                        /> */}
                    </div>
                </div>
            </div>
        );
    }
);

export default _PickYourPlan;
