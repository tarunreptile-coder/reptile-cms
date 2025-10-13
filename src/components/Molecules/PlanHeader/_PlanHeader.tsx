import React from 'react';
import { Button, Separator, Text } from '@Reptile/Components/Atoms';

import './_PlanHeader.scss';
import { reactive } from '@Reptile/Framework';

const _PlanHeader = reactive<Reptile.Props.PlanHeaderProps>(
  ({}, { handlePayment, handlePlans }) => {
    return (
      <div className="rt-plan-header">
        <Text className="plan-header" size="extra-extra-large" color="black" weight="bold">
          Changing the way apps are built
        </Text>
        <Text size="medium" color="black" weight="bold">
          Drive your audience engagement through apps!
        </Text>

        <Separator bottom={20} />
        <div className="buttons">
          <Button color="gray" variant="contained" onClick={handlePayment}>
            <Text size="small" color="black" weight="regular">
              Get Started
            </Text>
          </Button>
          <Button color="gray" variant="contained" onClick={handlePlans}>
            <Text size="small" color="black" weight="regular">
              View Plans
            </Text>
          </Button>
        </div>

        <Separator bottom={20} />
        <div className="terms">
          <a
            href="https://www.reptile.app/terms-and-conditions"
            target="_blank"
            rel="noreferrer"
          >
            <Text size="small" color="black" weight="semibold">
              *Terms and conditions apply.
            </Text>
          </a>
        </div>

        <Separator bottom={20} />
      </div>
    );
  }
);

export default _PlanHeader;
