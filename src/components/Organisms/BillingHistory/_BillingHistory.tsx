import React, { useCallback, useEffect } from "react";
import { controlled } from "@Reptile/Framework";
import { ArrowLeftIcon, Button, Card, Text } from "@Reptile/Components/Atoms";

import "./_BillingHistory.scss";
import { BillingHistoryContent } from "@Reptile/Components/Molecules";

const _BillingHistory = controlled<
  Reptile.Props.BaseProps,
  Reptile.Controllers.IBillingHistoryController
>(({ controller }) => {
  const handleGoBack = useCallback(() => {
    controller.navigateToSettings();
  }, [controller]);

  useEffect(() => {
    // void controller.getAllOrganizationSubscription();
    void controller.getAllOrganizationSubscriptionForUser();
  }, [controller]);

  // 🔹 helper function to check if expiring soon
  const getRemainingDays = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days left
  };

  const ExpiryTag = ({ endDate }: { endDate: string }) => {
    const remainingDays = getRemainingDays(endDate);
    if (remainingDays <= 7 && remainingDays >= 0) {
      return (
        <div className="expiry-tag">
          Expiring in {remainingDays} day{remainingDays > 1 ? "s" : ""}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rt-billing-history">
      <Button
        onClick={handleGoBack}
        className={"back-btn"}
        icon={<ArrowLeftIcon />}
        color={"primary"}
        variant={"contained"}
      />
      {controller.subscriptionsByUser &&
      controller.subscriptionsByUser?.length > 0 ? (
        <>
          {controller.subscriptionsByUser?.map((org) => {
            const subscription = org.subscription;
            if (org.isPaid && subscription) {
              return (
                <Card className="rt-billing-history-card">
                  <ExpiryTag
                    endDate={subscription?.subscriptionPeriod.endDate}
                  />
                  <BillingHistoryContent
                    organizationName={org.name}
                    amount={subscription?.price.amount}
                    startDate={subscription?.subscriptionPeriod.startDate}
                    endDate={subscription?.subscriptionPeriod.endDate}
                    boltOnCount={subscription?.subscriptionQuotas.boltOnCount}
                    clientsPerBoltOn={
                      subscription?.subscriptionQuotas.clientsPerBoltOn
                    }
                    usersPerBoltOn={
                      subscription?.subscriptionQuotas.usersPerBoltOn
                    }
                  />
                </Card>
              );
            }
            return null;
          })}
        </>
      ) : (
        <Card className="rt-billing-history-card">
          {controller.subscription ? (
            <>
              <ExpiryTag
                endDate={controller.subscription.subscriptionPeriod.endDate}
              />
              <BillingHistoryContent
                organizationName={"Current Plan"}
                amount={controller.subscription.price.amount}
                startDate={controller.subscription.subscriptionPeriod.startDate}
                endDate={controller.subscription.subscriptionPeriod.endDate}
                boltOnCount={
                  controller.subscription.subscriptionQuotas.boltOnCount
                }
                clientsPerBoltOn={
                  controller.subscription.subscriptionQuotas.clientsPerBoltOn
                }
                usersPerBoltOn={
                  controller.subscription.subscriptionQuotas.usersPerBoltOn
                }
              />
            </>
          ) : (
            <div className="no-current-plan">
              <Text color={"primary"} weight={"bold"} size={"h1"}>
                Current Plan
              </Text>
              <Text color={"black"} weight={"bold"} size={"medium"}>
                You don&apos;t have an ongoing plan, please upgrade to get
                further information
              </Text>
            </div>
          )}
        </Card>
      )}
    </div>
  );
});

export default _BillingHistory;
