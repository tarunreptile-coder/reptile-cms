import React from "react";
import { reactive } from "@Reptile/Framework";

import "./_PaymentInfo.scss";
import { Text } from "@Reptile/Components/Atoms";
import { CURRENCY_SYMBOLS, PLANS } from "@Reptile/Constants/Constants";

const _PaymentInfo = reactive<Reptile.Props.PaymentInfoProps>(
  ({ selectedPlan }, {}) => {
    return selectedPlan ? (
      <div className="rt-payment-info">
        <div className="payment-info-container">
          <Text
            className={"payment-title"}
            color={"black"}
            size={"large"}
            weight={"bold"}
          >
            {`Your Plan: ${selectedPlan.planName}`}
          </Text>

          {selectedPlan.featuresList &&
            Object.values(selectedPlan.featuresList).length > 0 && (
              <div className="payment-features">
                <Text color={"light-gray"} size={"small"} weight={"regular"}>
                  Plan features:
                </Text>
                <ul>
                  {Object.values(selectedPlan.featuresList).map(
                    (feature, i) => (
                      <li key={i}>
                        <Text
                          color={"light-gray"}
                          size={"small"}
                          weight={"regular"}
                        >
                          {feature}
                        </Text>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          <div className="payment-billing">
            <Text color={"black"} size={"medium"} weight={"bold"}>
              Billing:
            </Text>

            <Text color={"black"} size={"medium"} weight={"bold"}>
              {`${CURRENCY_SYMBOLS[selectedPlan.currency]}${
                selectedPlan.price
              }`}
            </Text>
          </div>
        </div>
      </div>
    ) : null;
  }
);

export default _PaymentInfo;
