import React, { useCallback, useEffect, useState } from "react";
import { ModalActions, ModalContent } from "@Reptile/Components/Organisms";
import { reactive } from "@Reptile/Framework";
import {
  Button,
  ProgressCircle,
  Separator,
  Text,
} from "@Reptile/Components/Atoms";
import { ModalTitle } from "@Reptile/Components/Molecules";
import "./_SubscriptionDetailsModal.scss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { parseISO, addWeeks } from "date-fns";
import _ from "lodash";
import { CURRENCY_SYMBOLS } from "@Reptile/Constants/Constants";

const _SubscriptionDetailsModal =
  reactive<Reptile.Props.SubscriptionDetailsModalProps>(
    (
      {
        userId,
        superUser,
        subscriptionsList,
        subscriptionAPIstatus,
        planPriceList,
      },
      { onCancelClick, onSaveSubscriptionDetails }
    ) => {
      const [loading, setLoading] = useState(false);
      const [expandedId, setExpandedId] = useState(null);
      const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
      const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
      const [initialValues, setInitialValues] = useState<{
        [key: string]: any;
      }>({});
      const [errors, setErrors] = useState<{ [key: string]: any }>({});

      useEffect(() => {
        if (Object.keys(editMode).length < 1) {
          setLoading(subscriptionAPIstatus.status === "pending");
        }
      }, [subscriptionAPIstatus.status]);

      const getPlanDetailsById = useCallback((priceId: string) => {
        return _(planPriceList)
          .flatMap((cycles) => _.flatMap(cycles))
          .flatten()
          .find({ priceId });
      }, []);

      // Initialize default values for form
      useEffect(() => {
        if (superUser && subscriptionsList && subscriptionsList?.length > 0) {
          const defaults: any = {};
          subscriptionsList.forEach((org) => {
            if (org.subscription) {
              defaults[org.id] = {
                totalProjectCount:
                  org.subscription.subscriptionQuotas.draftBoltOnCount,
                gracePeriodInWeek:
                  org.subscription.gracePeriod.gracePeriodInWeeks,
              };
            }
          });
          setFormValues(defaults);
          setInitialValues(defaults);
        }
      }, [subscriptionsList]);

      const handleAccordionChange = (id: string) => (_e, isExpanded) => {
        if (isExpanded) {
          setExpandedId((prevExpandedId: string) => {
            // If switching from one accordion to another
            if (isExpanded && prevExpandedId && prevExpandedId !== id) {
              setEditMode((prev) => ({ ...prev, [prevExpandedId]: false }));
              setErrors((prev) => ({ ...prev, [prevExpandedId]: {} }));
            }
            return id;
          });
        } else {
          setExpandedId(null);
          // Reset edit mode when collapsing the same accordion
          setEditMode((prev) => ({ ...prev, [id]: false }));
          setErrors((prev) => ({ ...prev, [id]: {} }));
        }
      };

      const handleInputChange = (orgId: string, field: string, value: any) => {
        setFormValues((prev) => ({
          ...prev,
          [orgId]: { ...prev[orgId], [field]: value },
        }));
        // Clear error when user types
        setErrors((prev) => ({
          ...prev,
          [orgId]: { ...prev[orgId], [field]: "" },
        }));
      };

      const handleToggleEdit = (
        orgId: string,
        subscription: Reptile.Models.SubscriptionInfo
      ) => {
        if (!editMode[orgId]) {
          setFormValues((prev) => ({
            ...prev,
            [orgId]: {
              totalProjectCount:
                subscription.subscriptionQuotas.draftBoltOnCount,
              gracePeriodInWeek: subscription.gracePeriod.gracePeriodInWeeks,
            },
          }));
        }
        setEditMode((prev) => ({ ...prev, [orgId]: !prev[orgId] }));
        setErrors((prev) => ({ ...prev, [orgId]: {} }));
      };

      const handleSave = async (
        orgId: string,
        subscription: Reptile.Models.SubscriptionInfo
      ) => {
        const current = formValues[orgId];
        let hasError = false;
        const newErrors: any = {};
        if (!current?.gracePeriodInWeek) {
          newErrors.gracePeriodInWeek = "Grace period is required";
          hasError = true;
        }
        if (!current?.totalProjectCount) {
          newErrors.totalProjectCount = "Project count is required";
          hasError = true;
        }
        if (hasError) {
          setErrors((prev) => ({ ...prev, [orgId]: newErrors }));
          return;
        }
        const initial = initialValues[orgId];
        let boltOnData: Reptile.Models.UpdateBoltOns | null = null;
        let gracePeriodData: Reptile.Models.UpdateGracePeriod | null = null;
        // Save grace period if endDate changed
        if (
          current.gracePeriodInWeek >= 0 &&
          current.gracePeriodInWeek !== initial.gracePeriodInWeek
        ) {
          gracePeriodData = {
            subscriptionId: subscription.id,
            gracePeriod: current.gracePeriodInWeek,
          };
        }
        // Save project count if changed
        if (
          current.totalProjectCount !== null &&
          current.totalProjectCount !== initial.totalProjectCount
        ) {
          boltOnData = {
            subscriptionId: subscription.id,
            newBoltOnCount: current.totalProjectCount,
          };
        }
        await onSaveSubscriptionDetails(boltOnData, gracePeriodData);
        setEditMode((prev) => ({ ...prev, [orgId]: false }));
      };

      const getExtendedEndDate = (
        subscription: Reptile.Models.SubscriptionInfo,
        extendedWeek?: number
      ) => {
        const currentEndDate = subscription.subscriptionPeriod.endDate;
        const gracePeriodWeek = extendedWeek
          ? extendedWeek
          : subscription.gracePeriod.gracePeriodInWeeks;
        // Parse currentEndDate safely
        const initialDate = currentEndDate
          ? parseISO(currentEndDate)
          : new Date();
        const finalEndDate = addWeeks(initialDate, gracePeriodWeek);
        return finalEndDate;
      };

      return (
        <>
          <ModalTitle
            inline={true}
            icon={<SubscriptionsIcon />}
            title="Subscription Details"
          />
          <Separator bottom={30} />
          <ModalContent>
            {loading ? (
              <div className="loading-text">
                <ProgressCircle variant="indeterminate" size="xs" />
              </div>
            ) : (
              <>
                {subscriptionsList && subscriptionsList?.length > 0 ? (
                  subscriptionsList?.map((org) => {
                    const priceId = org.subscription?.paymentPriceId;
                    const currentPlanDetails = getPlanDetailsById(priceId);
                    const currentPlanName = currentPlanDetails?.planName;
                    const currency = currentPlanDetails?.currency;
                    const currencySymbol = currency
                      ? CURRENCY_SYMBOLS[currency]
                      : "$";
                    const subscription = org.subscription;
                    const finalEndDate = getExtendedEndDate(subscription);
                    // Using draftBoltOnCount: It will show updated boltOnCount.
                    const totalProjectCount =
                      subscription.subscriptionQuotas.draftBoltOnCount;
                    const isSavingData =
                      editMode[org.id] &&
                      subscriptionAPIstatus.status === "pending";
                    return (
                      <Accordion
                        key={org.id}
                        expanded={expandedId === org.id}
                        onChange={handleAccordionChange(org.id)}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Text
                            size={"primary"}
                            color={"black"}
                            weight={"bold"}
                          >
                            {org.name}
                          </Text>
                        </AccordionSummary>
                        <AccordionDetails className="subscription-modal-content">
                          {org.subscription ? (
                            <>
                              <div className="detail-row">
                                <Text
                                  size={"primary"}
                                  color={"black"}
                                  weight={"bold"}
                                >
                                  Plan Name:
                                </Text>{" "}
                                <Text size={"primary"} color={"dark-gray"}>
                                  {`${currentPlanName || ""}`}
                                </Text>
                              </div>
                              <div className="detail-row">
                                <Text
                                  size={"primary"}
                                  color={"black"}
                                  weight={"bold"}
                                >
                                  Price:
                                </Text>{" "}
                                <Text size={"primary"} color={"dark-gray"}>
                                  {`${currencySymbol}${org.subscription.price.amount}`}
                                </Text>
                              </div>
                              <div className="detail-row">
                                <Text
                                  size={"primary"}
                                  color={"black"}
                                  weight={"bold"}
                                >
                                  Start Date:
                                </Text>{" "}
                                <Text size={"primary"} color={"dark-gray"}>
                                  {new Date(
                                    org.subscription.subscriptionPeriod.startDate
                                  ).toLocaleDateString()}
                                </Text>
                              </div>
                              <div className="detail-row">
                                <Text
                                  size={"primary"}
                                  color={"black"}
                                  weight={"bold"}
                                >
                                  End Date:
                                </Text>{" "}
                                <Text size="primary" color="dark-gray">
                                  {editMode[org.id]
                                    ? new Date(
                                        getExtendedEndDate(
                                          subscription,
                                          formValues[org.id]?.gracePeriodInWeek
                                        )
                                      ).toLocaleDateString()
                                    : new Date(
                                        finalEndDate
                                      ).toLocaleDateString()}
                                </Text>
                                {editMode[org.id] && (
                                  <>
                                    <Text
                                      size={"primary"}
                                      color={"black"}
                                      weight={"bold"}
                                      className={"grace-period-label"}
                                    >
                                      Extend Period (In Weeks):
                                    </Text>
                                    <TextField
                                      className="input-text-field"
                                      type="number"
                                      value={
                                        formValues[org.id]?.gracePeriodInWeek ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          org.id,
                                          "gracePeriodInWeek",
                                          e.target.value.replace(/\D/g, "")
                                        )
                                      }
                                      size="small"
                                      error={
                                        !!errors[org.id]?.gracePeriodInWeek
                                      }
                                    />
                                  </>
                                )}
                              </div>
                              <div className="detail-row">
                                <Text
                                  size={"primary"}
                                  color={"black"}
                                  weight={"bold"}
                                >
                                  Purchased Date:
                                </Text>{" "}
                                <Text size={"primary"} color={"dark-gray"}>
                                  {new Date(
                                    org.subscription.subscriptionPeriod.paymentDate
                                  ).toLocaleDateString()}
                                </Text>
                              </div>
                              <div className="detail-row">
                                <Text
                                  size={"primary"}
                                  color={"black"}
                                  weight={"bold"}
                                >
                                  Total Projects Count:
                                </Text>{" "}
                                {editMode[org.id] ? (
                                  <TextField
                                    className="input-text-field"
                                    type="number"
                                    value={
                                      formValues[org.id]?.totalProjectCount ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        org.id,
                                        "totalProjectCount",
                                        e.target.value.replace(/\D/g, "")
                                      )
                                    }
                                    size="small"
                                    error={!!errors[org.id]?.totalProjectCount}
                                  />
                                ) : (
                                  <Text size="primary" color="dark-gray">
                                    {`${totalProjectCount}`}
                                  </Text>
                                )}
                              </div>
                              <div className="detail-row">
                                <Text
                                  size={"primary"}
                                  color={"black"}
                                  weight={"bold"}
                                >
                                  Remaining Projects Count:
                                </Text>{" "}
                                <Text size={"primary"} color={"dark-gray"}>
                                  {`${org.subscription.remainingClinetQouta}`}
                                </Text>
                              </div>
                              {superUser && (
                                <div className="action-button-row">
                                  <Button
                                    variant={
                                      editMode[org.id]
                                        ? "contained"
                                        : "outlined"
                                    }
                                    iconPosition={"left"}
                                    icon={
                                      isSavingData ? (
                                        <ProgressCircle
                                          variant="indeterminate"
                                          size="xxs"
                                        />
                                      ) : null
                                    }
                                    color="primary"
                                    className="accordion-action-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      editMode[org.id]
                                        ? handleSave(org.id, subscription)
                                        : handleToggleEdit(
                                            org.id,
                                            subscription
                                          );
                                    }}
                                    disabled={isSavingData}
                                  >
                                    {isSavingData
                                      ? "Saving..."
                                      : editMode[org.id]
                                      ? "Save"
                                      : "Edit"}
                                  </Button>
                                </div>
                              )}
                            </>
                          ) : (
                            <Text
                              size={"primary"}
                              color={"black"}
                              weight={"bold"}
                            >
                              No subscription details available.
                            </Text>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    );
                  })
                ) : (
                  <Text
                    size={"medium"}
                    color={"black"}
                    weight={"bold"}
                    className="no-data-text"
                  >
                    No subscriptions found.
                  </Text>
                )}
              </>
            )}
          </ModalContent>
          <Separator bottom={50} />

          <ModalActions onCancelClick={onCancelClick} />
        </>
      );
    }
  );

export default _SubscriptionDetailsModal;
