import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Modal,
  PlusIcon,
  SmartphoneIcon,
  TabPanel,
  TabPanels,
} from '@Reptile/Components/Atoms';
import {
  ListItem,
  NewContentButton,
  ProjectBoilerplateSelect,
  ProjectCreateProgress,
  ProjectNameEditor,
  WizardActions,
} from '@Reptile/Components/Molecules';
import { controlled } from '@Reptile/Framework';
import { useInitController } from '@Reptile/Hooks';

import './_ProjectWizard.scss';
import { useParams } from 'react-router-dom';
import { UpgradeAccountModal } from '@Reptile/Components/Organisms';
import { ENTITY_TYPES } from '@Reptile/Constants/Constants';

const _ProjectWizard = controlled<
  Reptile.Props.ProjectWizardProps,
  Reptile.Controllers.IProjectWizardController
>(({ className, style, controller }) => {
  useInitController(controller);

  const [content, setContent] = useState<Reptile.Models.IContentEntity[]>([]);
  
  const handleNameChange = useCallback(
    (newName: string) => {
      controller.name = newName;
    },
    [controller]
  );

  const handleGoBack = useCallback(() => {
    controller.step -= 1;
  }, [controller]);

  const handleGoNext = useCallback(() => {
    controller.step += 1;
  }, [controller]);

  const handleBoilerplateSelect = useCallback(
    (boilerplate: Reptile.Models.IBoilerplate | null) => {
      controller.boilerplate = boilerplate;
    },
    [controller]
  );

  const handleSubmit = useCallback(() => {
    void controller.create();
  }, [controller]);

  const handleHide = useCallback(() => {
    controller.step = 0;
  }, [controller]);

  const { entityId } = useParams();

  useEffect(() => {
    void controller.getSubscriptionInfo(entityId);
    void controller.getFreeTrialStatus();
  }, [controller, entityId]);

  useEffect(() => {
    const filteredPublications = controller.entities.filter((x) => 
      x.contentEntityType.entityTypeId === ENTITY_TYPES.Publication
    );
    setContent(filteredPublications);
  }, [controller.entities]);
  

  return (
    <>
      {!controller.subscriptionStatus ? (
        <NewContentButton
          className={className}
          style={style}
          title="New project"
        >
          {/* <ListItem
                    text='Web Project'
                    leftElement={<GlobeIcon />}
                    onClick={controller.startWebWizard.bind(controller)}
                /> */}
          <ListItem
            text="App Project"
            leftElement={<SmartphoneIcon />}
            onClick={controller.startAppWizard.bind(controller)}
          />
        </NewContentButton>
      ) : (
        <Button
          style={{ marginRight: '53px' }}
          iconPosition={'left'}
          icon={<PlusIcon />}
          color="primary"
          onClick={() => controller.handleUpgradeModal()}
        >
          New project
        </Button>
      )}

      <Modal visible={() => !!controller.step}>
        <TabPanels
          className={clsx('rt-project-wizard')}
          activeIndex={() => controller.step - 1}
        >
          <TabPanel className="wizard-step-container">
            <ProjectNameEditor
              name={() => controller.name}
              onNameChange={handleNameChange}
            />
            <WizardActions
              stepKind="first"
              canGoNext={() =>
                controller.name.length > 0 && controller.name.length < 128
              }
              onBack={handleGoBack}
              onNext={handleGoNext}
            />
          </TabPanel>
          <TabPanel>
            <ProjectBoilerplateSelect
              selectedBoilerplate={() => controller.boilerplate}
              onBoilerplateSelect={handleBoilerplateSelect}
              boilerplates={() => controller.boilerplates}
              currentTemplates={() => content ?? []}
              projectType={() => controller.kind as 'web' | 'app'}
            />
            <WizardActions
              stepKind="last"
              canGoNext={() => controller.boilerplate !== undefined}
              onBack={handleGoBack}
              onNext={handleSubmit}
            />
          </TabPanel>
          <TabPanel>
            <ProjectCreateProgress
              onHide={handleHide}
              loading={() => controller.loading}
              error={controller.status}
            />
          </TabPanel>
        </TabPanels>
      </Modal>

      <Modal visible={() => controller.upgradeModal}>
        <UpgradeAccountModal
          line1Text={'You’ve reached the project limit for your current plan.'}
          line2Text={'Upgrade your subscription to unlock additional projects.'}
          navigateToPlan={() => controller.navigateToPlan()}
          onUpgradeModal={() => controller.handleUpgradeModal()}
        />
      </Modal>
    </>
  );
});

export default _ProjectWizard;
