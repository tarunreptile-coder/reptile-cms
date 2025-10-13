import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import {
  DropdownInput,
  InputField,
  ListItem,
} from "@Reptile/Components/Molecules";
import {
  Button,
  Modal,
  ProgressCircle,
  Separator,
  Text,
  Toggle,
} from "@Reptile/Components/Atoms";
import { reactive, reactiveValue } from "@Reptile/Framework";

import "./_PaymentForm.scss";
import { useState } from "react";
import { MESSAGES } from "@Reptile/Constants/Constants";
import { ModalContent } from "..";

const stripeStyle = {
  base: {
    fontSize: "14px",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    "::placeholder": {
      color: "#a0a0a0",
    },
  },
  invalid: {
    color: "#d32f2f",
    iconColor: "#d32f2f",
  },
};

const _PaymentForm = reactive<Reptile.Props.PaymentFormProps>(
  (
    { boltOns, orgs, orgIndex, selectedOrg, subscriptionStatus },
    { handleBoltOns, handlePaymentId, handleChange }
  ) => {
    const stripe = useStripe();
    const elements = useElements();

    const [active, setActive] = useState(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [cardholderName, setCardholderName] = useState<string>("");
    const [formErrors, setFormErrors] = useState<Record<string, string>>({
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    });

    useEffect(() => {
      setIsProcessing(subscriptionStatus.status === "pending");
    }, [subscriptionStatus.status]);

    const handleSubmit = async () => {
      if (!stripe || !elements) {
        return;
      }

      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: cardholderName,
        },
      });

      if (error) {
        return;
      }

      handlePaymentId(paymentMethod?.id);
    };

    const updateFieldError = (
      field: keyof typeof formErrors,
      message: string
    ) => {
      setFormErrors((prev) => ({ ...prev, [field]: message }));
    };

    const handleCardNumberChange = (event: any) => {
      if (event.error) {
        // You can map Stripe error codes to your own messages
        switch (event.error.code) {
          case "incomplete_number":
            updateFieldError(
              "cardNumber",
              MESSAGES.ERROR_INCOMPLETE_CARD_NUMBER.message
            );
            break;
          case "invalid_number":
            updateFieldError(
              "cardNumber",
              MESSAGES.ERROR_INVALID_CARD_NUMBER.message
            );
            break;
          default:
            updateFieldError(
              "cardNumber",
              event.error.message ?? MESSAGES.ERROR_INVALID_CARD_NUMBER.message
            );
        }
      } else {
        updateFieldError("cardNumber", "");
      }
    };

    const handleExpiryChange = (event: any) => {
      if (event.error) {
        switch (event.error.code) {
          case "incomplete_expiry":
            updateFieldError(
              "expiryDate",
              MESSAGES.ERROR_INCOMPLETE_EXPIRY.message
            );
            break;
          case "invalid_expiry_year":
            updateFieldError(
              "expiryDate",
              MESSAGES.ERROR_INVALID_EXPIRY_YEAR.message
            );
            break;
          case "invalid_expiry_month":
            updateFieldError(
              "expiryDate",
              MESSAGES.ERROR_INVALID_EXPIRY_MONTH.message
            );
            break;
          default:
            updateFieldError(
              "expiryDate",
              event.error.message ?? MESSAGES.ERROR_INVALID_EXPIRY.message
            );
        }
      } else {
        updateFieldError("expiryDate", "");
      }
    };

    const handleCvcChange = (event: any) => {
      if (event.error) {
        switch (event.error.code) {
          case "incomplete_cvc":
            updateFieldError("cvc", MESSAGES.ERROR_INCOMPLETE_CVC.message);
            break;
          case "invalid_cvc":
            updateFieldError("cvc", MESSAGES.ERROR_INVALID_CVC.message);
            break;
          default:
            updateFieldError(
              "cvc",
              event.error.message ?? MESSAGES.ERROR_INVALID_CVC.message
            );
        }
      } else {
        updateFieldError("cvc", "");
      }
    };

    return (
      <>
        <div className="rt-payment-form">
          <div className="payment-form-container">
            <div>
              <Text size="small" color="light-gray" weight="regular">
                Card number
              </Text>
              <CardNumberElement
                className="number"
                options={{ style: stripeStyle }}
                onChange={handleCardNumberChange}
              />
              {formErrors.cardNumber && (
                <div className="error-message">{formErrors.cardNumber}</div>
              )}
            </div>

            <div className="expiration-cvc">
              <div className="expiry-container">
                <Text size="small" color="light-gray" weight="regular">
                  Expiry date
                </Text>
                <CardExpiryElement
                  className="expiry"
                  options={{ style: stripeStyle }}
                  onChange={handleExpiryChange}
                />
                {formErrors.expiryDate && (
                  <div className="error-message">{formErrors.expiryDate}</div>
                )}
              </div>
              <div className="cvc-container">
                <Text size="small" color="light-gray" weight="regular">
                  CVC/CVV
                </Text>
                <CardCvcElement
                  className="cvc"
                  options={{ style: stripeStyle, placeholder: "3 digits" }}
                  onChange={handleCvcChange}
                />
                {formErrors.cvc && (
                  <div className="error-message">{formErrors.cvc}</div>
                )}
              </div>
            </div>
            <div>
              <Text size="small" color="light-gray" weight="regular">
                Cardholder Name
              </Text>
              <InputField
                name="cardholderName"
                value={() => cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="Name on Card (optional)"
                className="cardholder-input"
              />
            </div>
            {orgs && (
              <div className="select-org">
                <Text>Select Org</Text>

                <DropdownInput
                  name="org-dropdown"
                  label={"Select Organisation"}
                  value={() => selectedOrg ?? ""}
                  selectedIndex={() => orgIndex}
                  onChange={handleChange}
                >
                  {() =>
                    orgs &&
                    orgs.map((org) => (
                      <ListItem key={org.value} text={org.label} />
                    ))
                  }
                </DropdownInput>
              </div>
            )}

            {/* <div className='bolt-ons'>
                        <div className='add'>
                            <Text
                                size='small'
                                color='light-gray'
                                weight='regular'
                            >
                                Add bolt on&apos;s
                            </Text>
                            <Toggle
                                active={active}
                                onClick={() => {
                                    setActive(!active);
                                }}
                            />
                        </div>
                        {active && (
                            <InputField
                                value={() =>
                                    reactiveValue(boltOns ?? 0).toString()
                                }
                                onChange={(e) =>
                                    handleBoltOns(
                                        Number.parseInt(e.target.value)
                                    )
                                }
                                type='number'
                            />
                        )}
                    </div> */}

            <Button
              className={"submit"}
              color={"primary"}
              variant={"contained"}
              onClick={() => void handleSubmit()}
              disabled={subscriptionStatus.status === "pending"}
            >
              Start Plan
            </Button>
          </div>
        </div>
        <Modal visible={isProcessing} className="rt-modal-payment-process">
          <Separator bottom={30} />
          <ModalContent>
            <div className="loader-wrapper">
              <ProgressCircle variant="indeterminate" size={"xs"} />
            </div>
            <Separator bottom={30} />
            <Text color={"black"} weight={"bold"} size={"large"}>
              {"Processing your payment securely..."}
            </Text>
            <Separator bottom={20} />
            <Text color={"dark-gray"} weight={"regular"} size={"primary"}>
              {
                "This may take a few seconds. Please don’t close or refresh this page."
              }
            </Text>
          </ModalContent>
          <Separator bottom={30} />
        </Modal>
      </>
    );
  }
);

export default _PaymentForm;
