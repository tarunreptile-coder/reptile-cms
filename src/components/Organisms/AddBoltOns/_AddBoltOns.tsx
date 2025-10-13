import { Elements } from '@stripe/react-stripe-js';
import React, { useCallback, useEffect, useMemo } from 'react';
import { AddBoltOnsContent } from '@Reptile/Components/Organisms';
import { controlled } from '@Reptile/Framework';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeftIcon, Button } from '@Reptile/Components/Atoms';

const _AddBoltOns = controlled<
    Reptile.Props.BaseProps,
    Reptile.Controllers.IPaymentController
>(({ controller }) => {
    const handleChange = useCallback(
        (
            _: React.MouseEvent<HTMLLIElement, MouseEvent>,
            selectedIndex: number
        ) => {
            controller.orgIndex = selectedIndex;
        },
        [controller]
    );

    const handleGoBack = useCallback(() => {
        controller.navigateToSettings();
    }, [controller]);

    useEffect(() => {
        void controller.getPublicKey();
        void controller.getOrgs();
    }, [controller]);

    // payments

    const stripePromise = useMemo(
        () => controller.key && loadStripe(controller.key),
        [controller.key]
    );

    const handleBoltOns = (boltOns: number) => {
        controller.boltOns = boltOns;
    };

    const handlePaymentId = (id?: string) => {
        if (id) {
            controller.paymentId = id;
            void controller.handleSubscribe();
        }
    };

    return (
        <div className='rt-payment'>
            <Button
                onClick={handleGoBack}
                className={'back-btn'}
                icon={<ArrowLeftIcon />}
                color={'primary'}
                variant={'contained'}
            />

            {stripePromise && (
                <Elements stripe={stripePromise}>
                    <AddBoltOnsContent
                        boltOns={controller.boltOns}
                        selectedOrg={controller.selectedOrg}
                        orgs={controller.orgs}
                        orgIndex={controller.orgIndex}
                        handleChange={handleChange}
                        handleBoltOns={handleBoltOns}
                        handlePaymentId={handlePaymentId}
                    />
                </Elements>
            )}
        </div>
    );
});

export default _AddBoltOns;
