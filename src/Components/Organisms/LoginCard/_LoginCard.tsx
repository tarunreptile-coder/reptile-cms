import React, { useCallback, useState, useEffect } from "react";
import {
  Button,
  Card,
  Input,
  ShowHidePassword,
  Text,
} from "@Reptile/Components/Atoms";
import "./_LoginCard.scss";
import { useInitController } from "@Reptile/Hooks";
import { controlled } from "@Reptile/Framework";
import clsx from "clsx";

const _LoginCard = controlled<
  Reptile.Props.LoginProps,
  Reptile.Controllers.ILoginController
>(({ controller }) => {
  useInitController(controller);

  const handleClick = useCallback(() => {
    controller.passwordVisibility = !controller.passwordVisibility;
  }, [controller]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.username = e.target.value;
    },
    [controller]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      controller.password = e.target.value;
    },
    [controller]
  );

  const handleLogin = useCallback(() => {
    void controller.login();
  }, [controller]);

  const handleForgetPassword = useCallback(
    () => controller.navigateToForgetPasswordPage(),
    [controller]
  );

  const handleRegister = useCallback(
    () => controller.navigateToRegisterPage(),
    [controller]
  );

  const handleTermsAndConditions = useCallback(
    () => controller.navigateToTermsAndConditions(),
    [controller]
  );

  return (
    <div className="rt-login-form-container">
      <Card className="login-outer">
        <Text color="black" size="h1" weight="medium" className="title">
          Welcome Back
        </Text>
        <div className="login-form">
          <div className="login-input-group">
            <Text color="black" className="label">
              Username:
            </Text>
            <Input
              name="username"
              value={() => controller.username}
              placeholder="Username"
              onChange={handleNameChange}
              className="input"
            />
          </div>
          <div className="login-input-group">
            <Text color="black" className="label">
              Password:
            </Text>
            <ShowHidePassword
              visibility={() => controller.passwordVisibility}
              handleClick={handleClick}
            />
            <Input
              value={() => controller.password}
              placeholder="Password"
              onChange={handlePasswordChange}
              className="input"
              type={() => (controller.passwordVisibility ? "text" : "password")}
              name="password"
            />
          </div>
          <div className="login-input-group">
            <div
              className={clsx(
                "input-error",
                controller.error ? "visible" : "invisible"
              )}
            >
              Incorrect Username or Password.
            </div>
          </div>
          <div className="buttons-container">
            <Button
              variant="contained"
              onClick={handleLogin}
              color="primary"
              className="button"
            >
              Sign In
            </Button>
            <div
              color="black"
              className="forgot-password"
              onClick={handleForgetPassword}
            >
              Forgot password?
            </div>
          </div>
        </div>
      </Card>
      <div className="register-link">
        Don&apos;t have an account?{" "}
        <span onClick={handleRegister}>Register</span>
      </div>
      <div className="terms-and-conditions">
        By clicking &quot;Register&quot; you agree to Reptile&apos;s{" "}
        <span onClick={handleTermsAndConditions}>Terms and Conditions</span>
      </div>
    </div>
  );
});

export default _LoginCard;
