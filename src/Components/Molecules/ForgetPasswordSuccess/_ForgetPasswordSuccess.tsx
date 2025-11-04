import {
  Button,
  CheckIcon,
  FeaturedIcon,
  Text,
} from "@Reptile/Components/Atoms";
import { reactive } from "@Reptile/Framework";
import React from "react";

import "./_ForgetPasswordSuccess.scss";

const _ForgetPasswordSuccess =
  reactive<Reptile.Props.ForgetPasswordSuccessProps>(
    ({}, { navigateToLogin }) => {
      return (
        <div className="rt-forget-password-success-container">
          <FeaturedIcon
            size="lg"
            type="light-circle-outline"
            color="primary"
            icon={<CheckIcon />}
          />
          <Text color={"black"} weight={"bold"} size={"extra-large"}>
            Thank you!
          </Text>
          <Text color={"black"} size={"large"}>
            An email was sent with instructions on how to reset your password.
          </Text>
          <Button
            onClick={() => navigateToLogin()}
            variant={"contained"}
            color={"primary"}
          >
            Log In
          </Button>
        </div>
      );
    }
  );

export default _ForgetPasswordSuccess;
