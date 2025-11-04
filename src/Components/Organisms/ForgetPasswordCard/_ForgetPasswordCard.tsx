import React, { useCallback } from "react";
import { Button, Card, Input, Text } from "@Reptile/Components/Atoms";

import "./_ForgetPasswordCard.scss";
import { useInitController } from "@Reptile/Hooks";
import { controlled } from "@Reptile/Framework";
import clsx from "clsx";
import { ForgetPasswordSuccess } from "@Reptile/Components/Molecules";

const _ForgetPasswordCard = controlled<
  Reptile.Props.BaseProps,
  Reptile.Controllers.IForgetPasswordController
>(({ controller }) => {
  useInitController(controller);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.email = e.target.value;
    },
    [controller]
  );

  const handleReset = useCallback(
    () => void controller.forgetPassword(),
    [controller]
  );

  return (
    <div className="rt-forget-password-form-container">
      <Card className="forget-password-outer">
        {!controller.done ? (
          <>
            <Text color="black" size="h1" weight="medium" className="title">
              Reset your Password
            </Text>
            <div className="forget-password-form">
              <div className="forget-password-input-group">
                <Text color="black" className="label">
                  Email:
                </Text>
                <Input
                  name="email"
                  value={() => controller.email}
                  placeholder="Username"
                  onChange={handleNameChange}
                  className="input"
                />
              </div>

              <div className="forget-password-input-group">
                <div
                  className={clsx(
                    "input-error",
                    controller.error ? "visible" : "invisible"
                  )}
                >
                  Incorrect Email.
                </div>
              </div>
              <div className="buttons-container">
                <Button
                  variant="contained"
                  onClick={handleReset}
                  color="primary"
                  className="button"
                >
                  Request Reset Link
                </Button>
              </div>
            </div>
          </>
        ) : (
          <ForgetPasswordSuccess
            navigateToLogin={() => controller.navigateToLoginPage()}
          />
        )}
      </Card>
    </div>
  );
});

export default _ForgetPasswordCard;
