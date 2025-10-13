import {
  Button,
  Checkbox,
  EyeIcon,
  EyeSlashIcon,
  Input,
  Text,
} from "@Reptile/Components/Atoms";
import { useInitController } from "@Reptile/Hooks";
import { controlled } from "@Reptile/Framework";
import React, { useCallback, useState } from "react";

import "./_RegisterCard.scss";
import { RegisterSuccessMessage } from "@Reptile/Components/Molecules";

const _RegisterCard = controlled<
  Reptile.Props.RegisterProps,
  Reptile.Controllers.IRegistrationController
>(({ controller }) => {
  useInitController(controller);

  const [showError, setShowError] = useState(false);

  const icon = controller.passwordVisibility ? <EyeSlashIcon /> : <EyeIcon />;

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.firstname = e.target.value;
    },
    [controller]
  );

  const handleLastnameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.lastname = e.target.value;
    },
    [controller]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.email = e.target.value;
    },
    [controller]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.password = e.target.value;
    },
    [controller]
  );

  const handleInputChange = useCallback(() => {
    if (
      controller.firstname === "" ||
      controller.lastname === "" ||
      controller.email === "" ||
      controller.password === "" ||
      !controller.termsAndPrivacy
    ) {
      return true;
    } else if (
      controller.password === "" ||
      controller.password.length < 6 || // Check for minimum length
      !/[A-Z]/.test(controller.password) || // Check for at least one capital letter
      !/[^a-zA-Z0-9]/.test(controller.password) //check for atleast one special character
    ) {
      setShowError(true); // Show error message
      return true; // Invalid form
    }
    setShowError(false); // Hide error message if previously shown

    return false;
  }, [controller]);

  const handleLogin = useCallback(() => {
    void controller.signUp();
  }, [controller]);

  const handleVisibilty = useCallback(() => {
    controller.passwordVisibility = !controller.passwordVisibility;
  }, [controller]);

  return (
    <div className="rt-register-card">
      <div className="form-wrapper">
        {controller.successRegistration ? (
          <RegisterSuccessMessage />
        ) : (
          <>
            <div className="form-name">
              <div>First name</div>
              <Input
                name="firstName"
                placeholder="Jane"
                onChange={handleNameChange}
              />
            </div>
            <div className="form-surname">
              <div>Last name</div>
              <Input
                name="lastName"
                placeholder="Doe"
                onChange={handleLastnameChange}
              />
            </div>
            <div className="form-info">
              <div>Work email</div>
              <Input
                name="email"
                placeholder="your@work_email.com"
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-info">
              <div>Password</div>
              <div className="password-input">
                <div className="password-preview" onClick={handleVisibilty}>
                  {icon}
                </div>
                <Input
                  type={controller.passwordVisibility ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="form-checkbox">
              <Checkbox
                onClick={() => {
                  controller.termsAndPrivacy = !controller.termsAndPrivacy;
                }}
                active={controller.termsAndPrivacy}
              />
              <div>
                I agree to Reptile&apos;s{" "}
                <span>
                  <a
                    href="https://www.onreptile.com/terms-and-conditions"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>
                </span>{" "}
                and{" "}
                <span>
                  <a
                    href="https://www.onreptile.com/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Notice
                  </a>
                </span>
              </div>
            </div>
            {/* Show error message if password requirements are not met */}
            <div className="password-error-container">
              {showError && (
                <Text
                  className="warning-char-reg"
                  size="extra-small"
                  weight="semibold"
                >
                  Please choose a stronger password with at least 6 characters,
                  including one non-letter or digit character and one digit
                  (0-9).
                </Text>
              )}
            </div>
            <div className="button-container">
              <Button
                color="primary"
                variant="contained"
                size="xl"
                className="sign-up"
                onClick={handleLogin}
                disabled={handleInputChange}
              >
                Sign me up!
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default _RegisterCard;
