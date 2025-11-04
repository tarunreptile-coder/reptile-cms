import React, { useCallback, useState } from "react";
import {
  Button,
  Card,
  ErrorIcon,
  EyeIcon,
  EyeSlashIcon,
  FeaturedIcon,
  Input,
  Separator,
  Text,
} from "@Reptile/Components/Atoms";

import "./_ResetPasswordCard.scss";
import { useInitController } from "@Reptile/Hooks";
import { controlled } from "@Reptile/Framework";
import { ResetPasswordSucces } from "@Reptile/Components/Molecules";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const _ResetPasswordCard = controlled<
  Reptile.Props.BaseProps,
  Reptile.Controllers.IResetPasswordController
>(({ controller }) => {
  useInitController(controller);

  const location = useLocation();

  const { username, code, isNewUser } = queryString.parse(location.search);

  const [showError, setShowError] = useState(false);

  const handlePasswordVisibilty = useCallback(() => {
    controller.passwordVisibility = !controller.passwordVisibility;
  }, [controller]);

  const handleConfirmVisibilty = useCallback(() => {
    controller.confirmVisibility = !controller.confirmVisibility;
  }, [controller]);

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.password = e.target.value;
    },
    [controller]
  );

  const handleConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.confirm = e.target.value;
    },
    [controller]
  );

  const handleSubmit = useCallback(() => {
    void controller.resetPassword(username, code, isNewUser);
  }, [controller, username, code, isNewUser]);

  return (
    <div className="rt-reset-password-form-container">
      <Card className="reset-password-outer">
        {!controller.done ? (
          <>
            <Text color="black" size="h1" weight="medium" className="title">
              Reset your Password
            </Text>

            <Separator bottom={20} />

            <div className="reset-password-form">
              <Text color="black" size="medium" weight="semibold">
                Password
              </Text>
              <div className="password-input">
                <div
                  className="password-preview"
                  onClick={handlePasswordVisibilty}
                >
                  {controller.passwordVisibility ? (
                    <EyeSlashIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </div>
                <Input
                  type={controller.passwordVisibility ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </div>

              <Separator bottom={15} />

              <Text color="black" size="medium" weight="semibold">
                Confirm Password
              </Text>
              <div className="password-input">
                <div
                  className="password-preview"
                  onClick={handleConfirmVisibilty}
                >
                  {controller.confirmVisibility ? (
                    <EyeSlashIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </div>
                <Input
                  type={controller.confirmVisibility ? "text" : "password"}
                  name="confirm password"
                  placeholder="Confirm Password"
                  onChange={handleConfirmChange}
                />
              </div>

              <Separator bottom={20} />
              <div className="password-error-container">
                {showError && (
                  <>
                    {!controller.missingChar && (
                      <Text
                        className="warning-char"
                        size="extra-small"
                        weight="semibold"
                      >
                        Please choose a stronger password with at least 6
                        characters, including one non-letter or digit character
                        and one digit (0-9).
                      </Text>
                    )}

                    {controller.password !== controller.confirm &&
                      controller.missingChar && (
                        <Text
                          className="warning-match"
                          size="extra-small"
                          weight="semibold"
                        >
                          Make sure passwords match!
                        </Text>
                      )}
                  </>
                )}

                {!controller.missingChar && !!controller.password && (
                  <div
                    onMouseEnter={() => setShowError(true)}
                    onMouseLeave={() => setShowError(false)}
                    className="password-error"
                  >
                    <FeaturedIcon
                      size="lg"
                      type="light-circle-outline"
                      color="primary"
                      icon={<ErrorIcon />}
                    />
                  </div>
                )}

                {controller.password !== controller.confirm &&
                  controller.missingChar && (
                    <div
                      onMouseEnter={() => setShowError(true)}
                      onMouseLeave={() => setShowError(false)}
                      className="password-error"
                    >
                      <FeaturedIcon
                        size="lg"
                        type="light-circle-outline"
                        color="primary"
                        icon={<ErrorIcon />}
                      />
                    </div>
                  )}
              </div>

              <Separator bottom={20} />
              <div className="buttons-container">
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  color="primary"
                  className="button"
                  disabled={!controller.validatePassword}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        ) : (
          <ResetPasswordSucces
            navigateToLogin={() => controller.navigateToLoginPage()}
          />
        )}
      </Card>
    </div>
  );
});

export default _ResetPasswordCard;
